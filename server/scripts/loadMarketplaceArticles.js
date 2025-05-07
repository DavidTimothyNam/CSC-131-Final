const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

async function loadMarketplaceArticles() {
  const filePath = path.join(__dirname, "../server-data/marketplaceArticles.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(raw);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM marketplace_articles");

    for (const article of articles) {
      await client.query(
        `INSERT INTO marketplace_articles (slug, title, description, content, category)
         VALUES ($1, $2, $3, $4, $5)`,
        [article.slug, article.title, article.description, article.content, article.category]
      );
    }

    await client.query("COMMIT");
    console.log(`✅ Loaded ${articles.length} marketplace articles`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Failed to load articles:", err.message);
  } finally {
    client.release();
  }
}

loadMarketplaceArticles().catch(console.error);
