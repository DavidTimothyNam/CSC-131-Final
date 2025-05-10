import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const AdminCalendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    time: new Date(),
    endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    title: "",
    description: "",
    location: "",
  });
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    fetch("${process.env.VITE_API_BASE}/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const saveEvents = (dateKey, eventsForDate) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to save events.");
      return;
    }

    setEvents((prev) => ({ ...prev, [dateKey]: eventsForDate }));

    fetch("${process.env.VITE_API_BASE}/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [dateKey]: eventsForDate }),
    }).catch((err) => console.error("Failed to save events:", err));
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatTimeToAMPM = (dateOrStr) => {
    const date =
      typeof dateOrStr === "string"
        ? new Date(`1970-01-01T${dateOrStr}`)
        : dateOrStr;
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title.trim()) return;

    if (newEvent.endTime && newEvent.time >= newEvent.endTime) {
      setTimeError("Start time must be before end time");
      return;
    }
    setTimeError("");

    const key = formatDateKey(selectedDate);
    const updatedEventsForDate = events[key] ? [...events[key]] : [];

    updatedEventsForDate.push({
      ...newEvent,
      time: formatTime(newEvent.time),
      endTime: formatTime(newEvent.endTime),
    });

    updatedEventsForDate.sort(
      (a, b) =>
        new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
    );

    saveEvents(key, updatedEventsForDate);

    setNewEvent({
      time: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      title: "",
      description: "",
      location: "",
    });
  };

  const handleDeleteEvent = (index) => {
    const key = formatDateKey(selectedDate);
    const updated = { ...events };
    updated[key].splice(index, 1);
    if (updated[key].length === 0) delete updated[key];
    saveEvents(updated);
  };

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : null;
  const selectedEvents = selectedKey ? events[selectedKey] || [] : [];

  return (
    <div className="wrapper">
      <header className="mb-3">
        <h4>Select a Date</h4>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="form-control"
          placeholderText="Click to select a date"
        />
      </header>

      {selectedDate && (
        <div className="event-panel mt-4">
          <h4>Events for {selectedDate.toLocaleDateString()}</h4>
          <ul className="list-group mb-3">
            {selectedEvents.length === 0 ? (
              <li
                className="list-group-item text-muted"
                style={{ cursor: "default", backgroundColor: "#f9f9f9" }}
              >
                No events scheduled.
              </li>
            ) : (
              selectedEvents.map((event, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{formatTimeToAMPM(event.time)}</strong>
                    {event.endTime
                      ? ` – ${formatTimeToAMPM(event.endTime)}`
                      : ""}{" "}
                    — <b>{event.title}</b>
                    <br />
                    <small>{event.description}</small>
                    <br />
                    <small>
                      <i>{event.location}</i>
                    </small>
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
            <DatePicker
              selected={newEvent.time}
              onChange={(date) =>
                setNewEvent({
                  ...newEvent,
                  time: date,
                  endTime: new Date(date.getTime() + 60 * 60 * 1000),
                })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Start Time"
              dateFormat="h:mm aa"
              className="form-control"
              placeholderText="Start Time"
            />
            <DatePicker
              selected={newEvent.endTime}
              onChange={(date) => setNewEvent({ ...newEvent, endTime: date })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="End Time"
              dateFormat="h:mm aa"
              className="form-control"
              placeholderText="End Time"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
          {timeError && <p className="text-danger mt-2">{timeError}</p>}
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
