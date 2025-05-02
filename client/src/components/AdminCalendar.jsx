import React, { useState, useEffect } from "react";

const AdminCalendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({ time: "", title: "", description: "" });

  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();
  const getDateKey = (day) => `${currYear}-${currMonth + 1}-${day}`;

  useEffect(() => {
    fetch("http://localhost:9000/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    fetch("http://localhost:9000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvents),
    }).catch((err) => console.error("Failed to save events:", err));
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
    if (!selectedDay || !newEvent.time.trim() || !newEvent.title.trim()) return;

    const key = getDateKey(selectedDay);
    const updated = { ...events };
    if (!updated[key]) updated[key] = [];

    updated[key].push({ ...newEvent });
    updated[key].sort((a, b) => parseTimeToDate(a.time) - parseTimeToDate(b.time));
    saveEvents(updated);
    setNewEvent({ time: "", title: "", description: "" });
  };

  const handleDeleteEvent = (index) => {
    const key = getDateKey(selectedDay);
    const updated = { ...events };
    updated[key].splice(index, 1);
    if (updated[key].length === 0) delete updated[key];
    saveEvents(updated);
  };

  const selectedKey = selectedDay ? getDateKey(selectedDay) : null;
  const selectedEvents = selectedKey ? events[selectedKey] || [] : [];

  const renderCalendar = () => {
    const firstDay = new Date(currYear, currMonth, 1).getDay();
    const lastDate = new Date(currYear, currMonth + 1, 0).getDate();
    const today = new Date();
    const days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push(<li key={`prev-${i}`} className="inactive">{new Date(currYear, currMonth, -i + 1).getDate()}</li>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday =
        i === today.getDate() &&
        currMonth === today.getMonth() &&
        currYear === today.getFullYear();
      const key = getDateKey(i);
      const hasEvents = events[key]?.length > 0;

      days.push(
        <li
          key={`curr-${i}`}
          className={`${isToday ? "active" : ""} ${hasEvents ? "has-events" : ""}`}
          onClick={() => setSelectedDay(i)}
        >
          {i}
        </li>
      );
    }

    return days;
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{`${new Date(currYear, currMonth).toLocaleString("default", {
          month: "long",
        })} ${currYear}`}</p>
        <div className="icons">
          <span onClick={() => setCurrDate(new Date(currYear, currMonth - 1, 1))}>‹</span>
          <span onClick={() => setCurrDate(new Date(currYear, currMonth + 1, 1))}>›</span>
        </div>
      </header>

      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li>
          <li>Thu</li><li>Fri</li><li>Sat</li>
        </ul>
        <ul className="days">{renderCalendar()}</ul>
      </div>

      {selectedDay && (
        <div className="event-panel mt-4">
          <h4>Events for {currMonth + 1}/{selectedDay}/{currYear}</h4>
          <ul className="list-group mb-3">
            {selectedEvents.length === 0 ? (
              <li className="list-group-item">No events scheduled.</li>
            ) : (
              selectedEvents.map((event, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{formatTimeToAMPM(event.time)}</strong> — <b>{event.title}</b><br />
                    <small>{event.description}</small>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(idx)}>Delete</button>
                </li>
              ))
            )}
          </ul>

          <div className="d-flex gap-2 flex-wrap">
            <input
              type="time"
              className="form-control"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              placeholder="Time"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <button className="btn btn-primary" onClick={handleAddEvent}>Add Event</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
