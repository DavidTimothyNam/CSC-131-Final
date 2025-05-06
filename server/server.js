const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 9000;

// set up database
const pool = new Pool();
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to PostgreSQL at:", res.rows[0].now);
  }
});

// ✅ Correct path to blogData.json
const blogDataPath = path.join(__dirname, "server-data/blogData.json");
console.log("Resolved blogDataPath:", blogDataPath);

// ✅ Serve uploaded images from server-data/blog-images
app.use(
  "/images",
  express.static(path.join(__dirname, "server-data/blog-images"))
);

app.use(cors());
app.use(bodyParser.json());

// ✅ Image upload config
const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, "server-data/blog-images"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: imageStorage });

// ✅ Upload image endpoint
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ path: `/images/${req.file.filename}` });
});

// ✅ Contact form route
app.post("/contact", (req, res) => {
  const { name, email, topic, comment } = req.body;
  console.log(
    `Contact Form Submission:\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\nComment: ${comment}`
  );
  res.status(200).json({ success: true, message: "Message received!" });
});

// ✅ GET all blog posts
app.get("/api/posts", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    console.error("Error reading blog data:", error);
    res.status(500).json({ error: "Could not load blog posts" });
  }
});

// ✅ PUT update blog post
app.put("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPost = req.body;

  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    let posts = JSON.parse(data);
    const index = posts.findIndex((post) => post.id === postId);
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts[index] = { ...posts[index], ...updatedPost };
    fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2));
    res.json({ success: true, post: posts[index] });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Could not update blog post" });
  }
});

// ✅ POST create new blog post
app.post("/api/posts", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    const posts = JSON.parse(data);

    const newPost = {
      id: Date.now(),
      ...req.body,
    };

    posts.push(newPost);
    fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2));
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Could not create blog post" });
  }
});

// ✅ DELETE remove blog post
app.delete("/api/posts/:id", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    let posts = JSON.parse(data);
    const postId = parseInt(req.params.id);
    posts = posts.filter((post) => post.id !== postId);
    fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Could not delete blog post" });
  }
});

// ✅ GET for search
app.get("/api/search", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    const posts = JSON.parse(data);
    const query = req.query.search?.toLowerCase();

    const filtered = query
      ? posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.badges.some((badge) => badge.toLowerCase().includes(query))
        )
      : [];

    res.json(filtered);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed." });
  }
});

app.get("/api/marketplace-articles", (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "server-data/marketplaceArticles.json"
    );
    console.log("Resolved marketplaceArticles path:", filePath);

    const data = fs.readFileSync(filePath, "utf-8");
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (err) {
    console.error("Error reading marketplace articles:", err);
    res.status(500).json({ error: "Could not load marketplace content" });
  }
});

// 📅 Calendar Events: Paths
const calendarDataPath = path.join(
  __dirname,
  "server-data/calendarEvents.json"
);

// 📅 GET all events
app.get("/api/events", (req, res) => {
  fs.readFile(calendarDataPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading calendar events:", err);
      return res.status(500).json({ error: "Failed to read events" });
    }
    res.json(JSON.parse(data || "{}"));
  });
});

// 📅 POST to save (overwrite) all events
app.post("/api/events", (req, res) => {
  const events = req.body;
  fs.writeFile(calendarDataPath, JSON.stringify(events, null, 2), (err) => {
    if (err) {
      console.error("Error writing calendar events:", err);
      return res.status(500).json({ error: "Failed to save events" });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
