// storage.js
const multer = require("multer");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");

const useS3 = process.env.USE_S3 === "true";

const s3 = useS3
  ? new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  : null;

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

module.exports = { upload, s3, useS3 };
