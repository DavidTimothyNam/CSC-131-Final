// server.js — now includes /api/marketplace-articles route

const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const AWS = require("aws-sdk");

const {
  router: authRouter,
  setupAuthMiddleware,
  authenticateToken,
} = require("./auth");

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const useS3 = process.env.USE_S3 === "true";

let s3 = null;
if (process.env.USE_S3 === "true") {
  s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}
const app = express();
const PORT = process.env.PORT || 9000;

setupAuthMiddleware(app);
app.use("/auth", authRouter);

app.use(
  "/images",
  express.static(path.join(__dirname, "server-data/blog-images"))
);
app.use(cors());
app.use(bodyParser.json());

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, "server-data/blog-images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const memoryStorage = multer.memoryStorage();

const upload = useS3
  ? multer({ storage: diskStorage })
  : multer({ storage: memoryStorage });

app.post(
  "/api/upload-image",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (useS3 && s3) {
      // Upload to S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: Date.now() + "-" + req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
      };

      try {
        const result = await s3.upload(params).promise();
        return res.json({ url: result.Location }); // full public URL
      } catch (err) {
        console.error("Upload to S3 failed:", err);
        return res.status(500).json({ error: "Upload failed" });
      }
    } else {
      // Local upload — return relative path
      return res.json({
        url: `/images/${req.file.filename}`,
      });
    }
  }
);

app.post("/contact", (req, res) => {
  const { name, email, topic, comment } = req.body;
  console.log(
    `Contact Form:\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\nComment: ${comment}`
  );
  res.status(200).json({ success: true, message: "Message received!" });
});

app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts ORDER BY date DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

app.get("/api/posts/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const postResult = await pool.query(
      "SELECT * FROM blog_posts WHERE link = $1",
      [slug]
    );
    if (postResult.rows.length === 0)
      return res.status(404).json({ error: "Post not found" });
    const post = postResult.rows[0];
    const badgeResult = await pool.query(
      "SELECT badge FROM blog_post_badges WHERE post_id = $1",
      [post.id]
    );
    const contentResult = await pool.query(
      "SELECT paragraph FROM blog_post_content WHERE post_id = $1 ORDER BY paragraph_index",
      [post.id]
    );
    const badges = badgeResult.rows.map((b) => b.badge);
    const content = contentResult.rows.map((p) => p.paragraph);
    res.json({ ...post, badges, content });
  } catch (err) {
    console.error("Error fetching full blog post:", err);
    res.status(500).json({ error: "Failed to load post" });
  }
});

app.get("/api/post-metadata", async (req, res) => {
  try {
    const authorsResult = await pool.query(
      "SELECT DISTINCT author FROM blog_posts WHERE author IS NOT NULL ORDER BY author"
    );
    const badgesResult = await pool.query(
      "SELECT DISTINCT badge FROM blog_post_badges ORDER BY badge"
    );
    const authors = authorsResult.rows.map((r) => r.author);
    const badges = badgesResult.rows.map((r) => r.badge);
    res.json({ authors, badges });
  } catch (err) {
    console.error("Error fetching post metadata:", err);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

app.get("/api/marketplace-articles", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM marketplace_articles ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading marketplace articles:", err);
    res.status(500).json({ error: "Could not load articles" });
  }
});

app.post("/api/posts", authenticateToken, async (req, res) => {
  const {
    image,
    date,
    title,
    excerpt,
    link,
    author,
    badges = [],
    content = [],
  } = req.body;
  try {
    await pool.query("BEGIN");
    const result = await pool.query(
      `INSERT INTO blog_posts (image, date, title, excerpt, link, author)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [image, date, title, excerpt, link, author]
    );
    const postId = result.rows[0].id;
    for (const badge of badges) {
      await pool.query(
        "INSERT INTO blog_post_badges (post_id, badge) VALUES ($1, $2)",
        [postId, badge]
      );
    }
    for (let i = 0; i < content.length; i++) {
      await pool.query(
        "INSERT INTO blog_post_content (post_id, paragraph_index, paragraph) VALUES ($1, $2, $3)",
        [postId, i, content[i]]
      );
    }
    await pool.query("COMMIT");
    res.status(201).json({ success: true, post: result.rows[0] });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error creating blog post:", err);
    res.status(500).json({ error: "Could not create blog post" });
  }
});

app.put("/api/posts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const {
    image,
    date,
    title,
    excerpt,
    link,
    author,
    badges = [],
    content = [],
  } = req.body;
  try {
    await pool.query("BEGIN");
    const result = await pool.query(
      `UPDATE blog_posts SET image = $1, date = $2, title = $3, excerpt = $4, link = $5, author = $6
       WHERE id = $7 RETURNING *`,
      [image, date, title, excerpt, link, author, id]
    );
    if (result.rows.length === 0) throw new Error("Post not found");
    await pool.query("DELETE FROM blog_post_badges WHERE post_id = $1", [id]);
    await pool.query("DELETE FROM blog_post_content WHERE post_id = $1", [id]);
    for (const badge of badges) {
      await pool.query(
        "INSERT INTO blog_post_badges (post_id, badge) VALUES ($1, $2)",
        [id, badge]
      );
    }
    for (let i = 0; i < content.length; i++) {
      await pool.query(
        "INSERT INTO blog_post_content (post_id, paragraph_index, paragraph) VALUES ($1, $2, $3)",
        [id, i, content[i]]
      );
    }
    await pool.query("COMMIT");
    res.json({ success: true, post: result.rows[0] });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Could not update post" });
  }
});

app.delete("/api/posts/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM blog_posts WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Could not delete post" });
  }
});

function groupEventsByDate(events) {
  return events.reduce((acc, evt) => {
    const dateKey = evt.start.toISOString().split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push({
      time: evt.start.toISOString().split("T")[1].slice(0, 5),
      title: evt.title,
      description: evt.description || "",
    });
    return acc;
  }, {});
}

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM calendar_events ORDER BY start ASC"
    );
    const grouped = groupEventsByDate(result.rows);
    res.json(grouped);
  } catch (err) {
    console.error("Error fetching calendar events:", err);
    res.status(500).json({ error: "Could not load events" });
  }
});

app.post("/api/events", authenticateToken, async (req, res) => {
  const eventsByDate = req.body;
  console.log("Received event data:", eventsByDate); // 👈

  try {
    await pool.query("BEGIN");

    for (const [dateStr, events] of Object.entries(eventsByDate)) {
      console.log(`Handling date ${dateStr}, ${events.length} events`);

      const date = new Date(dateStr);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      await pool.query(
        `DELETE FROM calendar_events WHERE start >= $1 AND start < $2`,
        [date.toISOString(), nextDay.toISOString()]
      );

      for (const ev of events) {
        console.log("Inserting event:", ev);
        if (!ev.time || !ev.title) continue;

        console.log("Creating start date with:", dateStr, ev.time);
        const start = new Date(`${dateStr}T${ev.time}`);
        const end = ev.endTime ? new Date(`${dateStr}T${ev.endTime}`) : null;

        if (isNaN(start.getTime())) {
          console.warn("Invalid start time:", ev.time);
          continue;
        }

        await pool.query(
          `INSERT INTO calendar_events (title, start, \"end\", location, description)
           VALUES ($1, $2, $3, $4, $5)`,
          [ev.title, start, end, ev.location || "", ev.description || ""]
        );
      }
    }

    await pool.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error saving calendar events:", err);
    res.status(500).json({ error: "Could not save events" });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    console.error("DB test error:", err.message);
    res.status(500).json({ connected: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
