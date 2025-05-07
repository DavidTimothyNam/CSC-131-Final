const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 9000;
const pool = new Pool();

// Test DB connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB connection failed:", err);
  else console.log("Connected to PostgreSQL at:", res.rows[0].now);
});

// Middleware
app.use("/images", express.static(path.join(__dirname, "server-data/blog-images")));
app.use(cors());
app.use(bodyParser.json());

// Image upload
const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, "server-data/blog-images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: imageStorage });

app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ path: `/images/${req.file.filename}` });
});

// Contact form
app.post("/contact", (req, res) => {
  const { name, email, topic, comment } = req.body;
  console.log(`Contact Form:\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\nComment: ${comment}`);
  res.status(200).json({ success: true, message: "Message received!" });
});

// === BLOG POSTS ===

// Get all blog posts
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blog_posts ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// ✅ Get a full blog post by slug (with content + badges)
app.get("/api/posts/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const postResult = await pool.query("SELECT * FROM blog_posts WHERE link = $1", [slug]);
    if (postResult.rows.length === 0) return res.status(404).json({ error: "Post not found" });

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


// Create a new blog post (basic - doesn't handle badges/content yet)
app.post("/api/posts", async (req, res) => {
  const { image, date, title, excerpt, link, author } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO blog_posts (image, date, title, excerpt, link, author)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [image, date, title, excerpt, link, author]
    );
    res.status(201).json({ success: true, post: result.rows[0] });
  } catch (err) {
    console.error("Error creating blog post:", err);
    res.status(500).json({ error: "Could not create blog post" });
  }
});

// Update a blog post
app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { image, date, title, excerpt, link, author } = req.body;
  try {
    const result = await pool.query(
      `UPDATE blog_posts
       SET image=$1, date=$2, title=$3, excerpt=$4, link=$5, author=$6
       WHERE id=$7 RETURNING *`,
      [image, date, title, excerpt, link, author, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true, post: result.rows[0] });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Could not update post" });
  }
});

// Delete a blog post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM blog_posts WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Could not delete post" });
  }
});

// Search posts
app.get("/api/search", async (req, res) => {
  const query = req.query.search?.toLowerCase();
  try {
    const result = await pool.query(
      `SELECT * FROM blog_posts WHERE LOWER(title) LIKE $1`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// === MARKETPLACE ARTICLES ===
app.get("/api/marketplace-articles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM marketplace_articles ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading marketplace articles:", err);
    res.status(500).json({ error: "Could not load articles" });
  }
});

// === CALENDAR EVENTS ===
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM calendar_events ORDER BY start ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/api/events", async (req, res) => {
  const events = req.body;
  try {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM calendar_events");
    for (const event of events) {
      await pool.query(
        `INSERT INTO calendar_events (title, start, "end", location, description)
         VALUES ($1, $2, $3, $4, $5)`,
        [event.title, event.start, event.end, event.location, event.description]
      );
    }
    await pool.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error saving events:", err);
    res.status(500).json({ error: "Failed to save events" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
