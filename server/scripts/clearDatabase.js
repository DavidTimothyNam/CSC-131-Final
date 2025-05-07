const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

async function clearTables() {
  try {
    await pool.query("BEGIN");

    // Delete child tables first to respect foreign key constraints
    await pool.query("DELETE FROM blog_post_badges");
    await pool.query("DELETE FROM blog_post_content");
    await pool.query("DELETE FROM blog_posts");
    await pool.query("DELETE FROM marketplace_articles");
    await pool.query("DELETE FROM calendar_events");

    await pool.query("COMMIT");
    console.log("🧹 All tables cleared.");
    process.exit(0);
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("❌ Failed to clear tables:", err.message);
    process.exit(1);
  }
}

clearTables();
