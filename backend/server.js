const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// POST route for contact form
app.post("/contact", (req, res) => {
  const { name, email, topic, comment } = req.body;

  console.log(`Contact Form Submission:
    Name: ${name}
    Email: ${email}
    Topic: ${topic}
    Comment: ${comment}`);

  res.status(200).json({ success: true, message: "Message received!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
