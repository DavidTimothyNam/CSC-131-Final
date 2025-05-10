import React, { useEffect, useState } from "react";
import "./UserCalendar.css";

const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const formatDateKey = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const formatDateLabel = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const formatTimeToAMPM = (timeStr) => {
  if (!timeStr) return "";
  const [hourStr, minute] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

const getWeekDates = (weekStart) =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

const UserCalendar = () => {
  const [events, setEvents] = useState({});
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const handleWeekChange = (direction) => {
    setActiveEvent(null);
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + direction * 7);
    setWeekStart(newStart);
  };

  const handleEventClick = (event) => {
    setActiveEvent(event);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("event-backdrop")) {
      setActiveEvent(null);
    }
  };

  const weekDates = getWeekDates(weekStart);

  return (
    <div
      className="user-calendar container mt-4"
      style={{ marginBottom: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => handleWeekChange(-1)}
        >
          ‹ Prev
        </button>
        <h4 className="mb-0">
          Week of {weekDates[0].toLocaleDateString()} –{" "}
          {weekDates[6].toLocaleDateString()}
        </h4>
        <button
          className="btn btn-outline-primary"
          onClick={() => handleWeekChange(1)}
        >
          Next ›
        </button>
      </div>

      <div className="scroll-week">
        {weekDates.map((date, index) => {
          const key = formatDateKey(date);
          const dayEvents = events[key] || [];
          const sortedEvents = [...dayEvents].sort((a, b) =>
            a.time.localeCompare(b.time)
          );

          return (
            <div key={index} className="day-column">
              <div className="day-header">{formatDateLabel(date)}</div>
              <div className="day-body">
                {sortedEvents.length === 0 ? (
                  <p className="text-muted">No events</p>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {sortedEvents.map((event, idx) => (
                      <li
                        key={idx}
                        className="event hoverable"
                        onClick={() => handleEventClick(event)}
                      >
                        <strong>{formatTimeToAMPM(event.time)}</strong> —{" "}
                        <b>{event.title}</b>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeEvent && (
        <div className="event-backdrop" onClick={handleBackdropClick}>
          <div className="event-modal">
            <h5 className="mb-2">{activeEvent.title}</h5>
            <p className="mb-1">
              <strong>{formatTimeToAMPM(activeEvent.time)}</strong>
            </p>
            <p>{activeEvent.description || <em>No description provided</em>}</p>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setActiveEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCalendar;
