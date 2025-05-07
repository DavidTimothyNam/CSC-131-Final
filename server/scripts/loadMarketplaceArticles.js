const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

async function loadMarketplaceArticles() {
  const filePath = path.join(
    __dirname,
    "../server-data/marketplaceArticles.json"
  );
  const rawData = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(rawData);

  for (const article of articles) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        `INSERT INTO marketplace_articles (slug, title, description, content, category)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          article.slug,
          article.title,
          article.description,
          article.content,
          article.category,
        ]
      );

      await client.query("COMMIT");
      console.log(`Inserted article: ${article.title}`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(`Error inserting article "${article.title}":`, err.message);
    } finally {
      client.release();
    }
  }

  console.log("✅ Marketplace articles loaded.");
}

loadMarketplaceArticles().catch((err) => {
  console.error("Fatal error loading marketplace articles:", err);
});
