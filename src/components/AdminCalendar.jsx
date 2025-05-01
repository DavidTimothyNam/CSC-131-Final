import React, { useState, useEffect } from "react";

const AdminCalendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("calendarEvents");
    return stored ? JSON.parse(stored) : {};
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({ time: "", description: "" });

  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDateKey = (day) => `${currYear}-${currMonth + 1}-${day}`;

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

  const parseTimeToDate = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return new Date(0, 0, 0, hours, minutes);
  };

  const formatTimeToAMPM = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const handleAddEvent = () => {
    if (!selectedDay || !newEvent.description.trim() || !newEvent.time.trim())
      return;

    const key = getDateKey(selectedDay);
    const updated = { ...events };
    if (!updated[key]) updated[key] = [];
    updated[key].push({ ...newEvent });
    updated[key].sort(
      (a, b) => parseTimeToDate(a.time) - parseTimeToDate(b.time)
    );
    saveEvents(updated);
    setNewEvent({ time: "", description: "" });
  };

  const handleDeleteEvent = (index) => {
    const key = getDateKey(selectedDay);
    const updated = { ...events };
    updated[key].splice(index, 1);
    saveEvents(updated);
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    const today = new Date();
    const days = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <li key={`prev-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === today.getDate() &&
        currMonth === today.getMonth() &&
        currYear === today.getFullYear();

      const key = getDateKey(i);
      const hasEvents = events[key]?.length > 0;

      days.push(
        <li
          key={`curr-${i}`}
          className={`${isToday ? "active" : ""} ${
            hasEvents ? "has-events" : ""
          }`}
          onClick={() => setSelectedDay(i)}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth + 1; i <= 6; i++) {
      days.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayOfMonth}
        </li>
      );
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    setCurrDate(new Date(currYear, currMonth + direction, 1));
    setSelectedDay(null);
  };

  const selectedKey = selectedDay ? getDateKey(selectedDay) : null;
  const selectedEvents = selectedKey ? events[selectedKey] || [] : [];

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons">
          <span
            onClick={() => handleMonthChange(-1)}
            className="material-symbols-rounded"
          >
            ‹
          </span>
          <span
            onClick={() => handleMonthChange(1)}
            className="material-symbols-rounded"
          >
            ›
          </span>
        </div>
      </header>

      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">{renderCalendar()}</ul>
      </div>

      {selectedDay && (
        <div className="event-panel mt-4">
          <h4>
            Events for {months[currMonth]} {selectedDay}, {currYear}
          </h4>
          <ul className="list-group mb-3">
            {selectedEvents.length === 0 ? (
              <li className="list-group-item">No events scheduled.</li>
            ) : (
              selectedEvents.map((event, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{formatTimeToAMPM(event.time)}</strong> —{" "}
                    {event.description}
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteEvent(idx)}
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="d-flex gap-2 flex-wrap">
            <input
              type="time"
              className="form-control"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Event description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
