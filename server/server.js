// server.js
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { Resend } = require("resend");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const {
    router: authRouter,
    setupAuthMiddleware,
    authenticateToken,
} = require("./routes/auth");
const blogRouter = require("./routes/blog");
const calendarRouter = require("./routes/calendar");
const marketplaceRouter = require("./routes/marketplace");
const pool = require("./db");
const { upload, s3, useS3 } = require("./storage");
// const groupEventsByDate = require("./utils/groupEvents");

const app = express();

const PORT = process.env.PORT || 9000;

setupAuthMiddleware(app);
app.use(cors());
app.use(bodyParser.json());
app.use(
    "/images",
    express.static(path.join(__dirname, "server-data/blog-images"))
);

app.use("/auth", authRouter);
app.use("/api", blogRouter);
app.use("/api", calendarRouter);
app.use("/api", marketplaceRouter);

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
            const fileUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
            return res.json({ url: fileUrl });
        }
    }
);

const resend = new Resend(process.env.RESEND_API_KEY);
app.post("/api/contact", async (req, res) => {
    const { name, email, topic, comment } = req.body;
    if (!name || !email || !topic || !comment) {
        return res
            .status(400)
            .json({ success: false, message: "Missing required fields." });
    }

    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || "yourname@resend.dev",
            to: process.env.EMAIL_TO,
            subject: `Contact Form - ${topic}`,
            text: `From: ${name} <${email}>\n\n${comment}`,
        });
        res.status(200).json({
            success: true,
            message: "Email sent successfully!",
        });
    } catch (error) {
        console.error("Resend error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send email.",
        });
    }
});

app.get("/api/search", (req, res) => {
    try {
        const blogData = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, "server-data/blogData.json"),
                "utf-8"
            )
        );
        const marketData = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, "server-data/marketplaceArticles.json"),
                "utf-8"
            )
        );
        const query = req.query.search?.toLowerCase();

        const marketArticles = marketData.map((article) => ({
            id: `market-${article.id}`,
            title: article.title,
            description: article.description,
            badges: ["Marketplace"],
            type: "marketplace",
            slug: article.slug,
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

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ connected: true, time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ connected: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
