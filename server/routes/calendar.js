// routes/calendar.js
const express = require("express");
const pool = require("../db");
const groupEventsByDate = require("../utils/groupEvents");
const { authenticateToken } = require("./auth");

const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM calendar_events ORDER BY start ASC",
    );
    res.json(groupEventsByDate(result.rows));
  } catch (err) {
    console.error("Error fetching calendar events:", err);
    res.status(500).json({ error: "Could not load events" });
  }
});

router.post("/events", authenticateToken, async (req, res) => {
  const eventsByDate = req.body;

  try {
    await pool.query("BEGIN");

    for (const [dateStr, events] of Object.entries(eventsByDate)) {
      const date = new Date(dateStr);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      await pool.query(
        "DELETE FROM calendar_events WHERE start >= $1 AND start < $2",
        [date.toISOString(), nextDay.toISOString()],
      );

      for (const ev of events) {
        if (!ev.time || !ev.title) continue;

        const start = new Date(`${dateStr}T${ev.time}`);
        const end = ev.endTime ? new Date(`${dateStr}T${ev.endTime}`) : null;

        if (isNaN(start.getTime())) continue;

        await pool.query(
          `INSERT INTO calendar_events (title, start, "end", location, description)
           VALUES ($1, $2, $3, $4, $5)`,
          [ev.title, start, end, ev.location || "", ev.description || ""],
        );
      }
    }

    await pool.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error saving calendar events:", err);
    res.status(500).json({ error: "Could not save events" });
  }
});

module.exports = router;
