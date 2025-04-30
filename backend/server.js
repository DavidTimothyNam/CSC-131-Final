const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 9000;

// ✅ Correct path to blogData.json
const blogDataPath = path.join(__dirname, "../src/data/blogData.json");
console.log("Resolved blogDataPath:", blogDataPath);

app.use(cors());
app.use(bodyParser.json());

// Contact form route
app.post("/contact", (req, res) => {
  const { name, email, topic, comment } = req.body;

  console.log(`Contact Form Submission:
    Name: ${name}
    Email: ${email}
    Topic: ${topic}
    Comment: ${comment}`);

  res.status(200).json({ success: true, message: "Message received!" });
});

// GET blog posts
app.get("/api/posts", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    const posts = JSON.parse(data);
    console.log("Loaded blog posts:", posts.length);
    res.json(posts);
  } catch (error) {
    console.error("Error reading blog data:", error);
    res.status(500).json({ error: "Could not load blog posts" });
  }
});

// PUT update blog post
app.put("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPost = req.body;

  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    let posts = JSON.parse(data);

    const index = posts.findIndex((post) => post.id === postId);
    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    posts[index] = { ...posts[index], ...updatedPost };

    fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2));
    res.json({ success: true, post: posts[index] });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Could not update blog post" });
  }
});

// POST create new blog post
app.post("/api/posts", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    const posts = JSON.parse(data);

    const newPost = {
      id: Date.now(), // Unique ID based on timestamp
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

// DELETE remove blog post
app.delete("/api/posts/:id", (req, res) => {
  try {
    const data = fs.readFileSync(blogDataPath, "utf-8");
    let posts = JSON.parse(data);
    const postId = parseInt(req.params.id);

    posts = posts.filter(post => post.id !== postId);
    fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Could not delete blog post" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
