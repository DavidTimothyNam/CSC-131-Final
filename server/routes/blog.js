// routes/blog.js
const express = require("express");
const pool = require("../db");
const { authenticateToken } = require("./auth");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts ORDER BY date DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/posts/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const postResult = await pool.query(
      "SELECT * FROM blog_posts WHERE link = $1",
      [slug],
    );
    if (postResult.rows.length === 0)
      return res.status(404).json({ error: "Post not found" });

    const post = postResult.rows[0];
    const badgeResult = await pool.query(
      "SELECT badge FROM blog_post_badges WHERE post_id = $1",
      [post.id],
    );
    const contentResult = await pool.query(
      "SELECT paragraph FROM blog_post_content WHERE post_id = $1 ORDER BY paragraph_index",
      [post.id],
    );

    const badges = badgeResult.rows.map((b) => b.badge);
    const content = contentResult.rows.map((p) => p.paragraph);

    res.json({ ...post, badges, content });
  } catch (err) {
    console.error("Error fetching full blog post:", err);
    res.status(500).json({ error: "Failed to load post" });
  }
});

router.get("/post-metadata", async (req, res) => {
  try {
    const authorsResult = await pool.query(
      "SELECT DISTINCT author FROM blog_posts WHERE author IS NOT NULL ORDER BY author",
    );
    const badgesResult = await pool.query(
      "SELECT DISTINCT badge FROM blog_post_badges ORDER BY badge",
    );

    res.json({
      authors: authorsResult.rows.map((r) => r.author),
      badges: badgesResult.rows.map((r) => r.badge),
    });
  } catch (err) {
    console.error("Error fetching post metadata:", err);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

router.post("/posts", authenticateToken, async (req, res) => {
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
      [image, date, title, excerpt, link, author],
    );
    const postId = result.rows[0].id;

    for (const badge of badges) {
      await pool.query(
        "INSERT INTO blog_post_badges (post_id, badge) VALUES ($1, $2)",
        [postId, badge],
      );
    }

    for (let i = 0; i < content.length; i++) {
      await pool.query(
        "INSERT INTO blog_post_content (post_id, paragraph_index, paragraph) VALUES ($1, $2, $3)",
        [postId, i, content[i]],
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

router.put("/posts/:id", authenticateToken, async (req, res) => {
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
      [image, date, title, excerpt, link, author, id],
    );

    if (result.rows.length === 0) throw new Error("Post not found");

    await pool.query("DELETE FROM blog_post_badges WHERE post_id = $1", [id]);
    await pool.query("DELETE FROM blog_post_content WHERE post_id = $1", [id]);

    for (const badge of badges) {
      await pool.query(
        "INSERT INTO blog_post_badges (post_id, badge) VALUES ($1, $2)",
        [id, badge],
      );
    }

    for (let i = 0; i < content.length; i++) {
      await pool.query(
        "INSERT INTO blog_post_content (post_id, paragraph_index, paragraph) VALUES ($1, $2, $3)",
        [id, i, content[i]],
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

router.delete("/posts/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM blog_posts WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Could not delete post" });
  }
});

module.exports = router;
