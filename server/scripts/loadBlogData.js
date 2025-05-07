const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

async function loadBlogData() {
  const filePath = path.join(__dirname, "../server-data/blogData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const blogPosts = JSON.parse(rawData);

  for (const post of blogPosts) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert blog post
      const res = await client.query(
        `INSERT INTO blog_posts (image, date, title, excerpt, link, author)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          post.image,
          formatDate(post.date),
          post.title,
          post.excerpt,
          post.link,
          post.author,
        ]
      );
      const postId = res.rows[0].id;

      // Insert badges
      for (const badge of post.badges) {
        await client.query(
          `INSERT INTO blog_post_badges (post_id, badge) VALUES ($1, $2)`,
          [postId, badge]
        );
      }

      // Insert content
      post.content.forEach(async (paragraph, index) => {
        await client.query(
          `INSERT INTO blog_post_content (post_id, paragraph_index, paragraph)
           VALUES ($1, $2, $3)`,
          [postId, index, paragraph]
        );
      });

      await client.query("COMMIT");
      console.log(`Inserted post: ${post.title}`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error inserting post:", err.message);
    } finally {
      client.release();
    }
  }

  console.log("Blog data loaded.");
}

function formatDate(dateStr) {
  const parts = dateStr.split("/");

  if (parts.length !== 3) {
    throw new Error(`Unrecognized date format: ${dateStr}`);
  }

  let [a, b, c] = parts;

  // Assume DD/MM/YYYY if day > 12
  let day, month, year;
  if (parseInt(a) > 12) {
    day = a;
    month = b;
    year = c;
  } else {
    // Otherwise treat as MM/DD/YYYY
    month = a;
    day = b;
    year = c;
  }

  const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateStr} → ${isoString}`);
  }

  return isoString;
}

loadBlogData().catch((err) => {
  console.error("Fatal error loading blog data:", err);
});
