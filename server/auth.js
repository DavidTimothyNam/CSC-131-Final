// auth.js — handles Google OAuth and JWT issuance
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const router = express.Router();

// Middleware to initialize sessions and passport
function setupAuthMiddleware(app) {
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const allowed = (process.env.ALLOWED_GOOGLE_EMAILS || "")
        .split(",")
        .map((e) => e.trim());
      if (allowed.includes(profile.emails[0].value)) {
        return done(null, profile);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/unauthorized" }),
  (req, res) => {
    const email = req.user.emails[0].value;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const frontend = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontend}/login?token=${token}`);
  }
);

router.get("/unauthorized", (req, res) => {
  res.status(401).json({ error: "Unauthorized Google account" });
});

router.get("/success", (req, res) => {
  res.send("Login successful. You may close this window.");
});

// JWT auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.warn("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "jwt expired" });
      }
      return res.status(401).json({ message: "invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { router, setupAuthMiddleware, authenticateToken };
