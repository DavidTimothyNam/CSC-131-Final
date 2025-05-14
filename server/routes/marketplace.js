// routes/marketplace.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/marketplace-articles", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM marketplace_articles ORDER BY id ASC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading marketplace articles:", err);
    res.status(500).json({ error: "Could not load articles" });
  }
});

module.exports = router;
