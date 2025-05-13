const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { Resend } = require("resend");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Pool } = require("pg");

const {
  router: authRouter,
  setupAuthMiddleware,
  authenticateToken,
} = require("./auth");

const resend = new Resend(process.env.RESEND_API_KEY);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const app = express();
const PORT = process.env.PORT || 9000;

setupAuthMiddleware(app);
app.use("/auth", authRouter);
app.use(cors());
app.use(bodyParser.json());
app.use(
  "/images",
  express.static(path.join(__dirname, "server-data/blog-images"))
);

const useS3 = process.env.USE_S3 === "true";
let s3 = null;

if (useS3) {
  s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, "server-data/blog-images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const memoryStorage = multer.memoryStorage();

const upload = useS3
  ? multer({ storage: memoryStorage })
  : multer({ storage: diskStorage });

app.post(
  "/api/upload-image",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (useS3 && s3) {
      const fileName = Date.now() + "-" + req.file.originalname;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      try {
        await s3.send(command);
        return res.json({
          url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
        });
      } catch (err) {
        console.error("Upload to S3 failed:", err);
        return res.status(500).json({ error: "Upload failed" });
      }
    } else {
      return res.json({ url: `/images/${req.file.filename}` });
    }
  }
);

// ✅ Contact Email (Resend) — Test Setup
app.post("/contact", async (req, res) => {
  const { name, email, topic, comment } = req.body;

  if (!name || !email || !topic || !comment) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    console.log("Sending to:", process.env.EMAIL_TO); // ✅ Confirm this is set

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "yourname@resend.dev",
      to: process.env.EMAIL_TO,
      subject: `Contact Form - ${topic}`,
      text: `From: ${name} <${email}>\n\n${comment}`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});


// 🔎 Search Endpoint
const blogDataPath = path.join(__dirname, "server-data", "blogData.json");
const marketDataPath = path.join(__dirname, "server-data", "marketplaceArticles.json");

app.get("/api/search", (req, res) => {
  try {
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf-8"));
    const marketData = JSON.parse(fs.readFileSync(marketDataPath, "utf-8"));
    const query = req.query.search?.toLowerCase();

    const marketArticles = marketData.map((article) => ({
      id: `market-${article.id}`,
      title: article.title,
      description: article.description,
      badges: ["Marketplace"],
      type: "marketplace",
    }));

    const blogArticles = blogData.map((article) => ({
      id: `blog-${article.id}`,
      title: article.title,
      date: article.date,
      excerpt: article.excerpt,
      badges: article.badges,
      link: article.link,
      type: "blog",
    }));

    const allArticles = [...marketArticles, ...blogArticles];

    const filtered = query
      ? allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.badges.some((badge) =>
            badge.toLowerCase().includes(query)
          )
      )
      : [];

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Search failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
