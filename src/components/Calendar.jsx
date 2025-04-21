import React, { useEffect, useState } from "react";
import "./Calendar.css"; // ✅ Create this file using the original calendar.css

const Calendar = () => {
  const [currDate, setCurrDate] = useState(new Date());

  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    const days = [];

    // Previous month's days
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }

    // Current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear();

      days.push(
        <li key={`curr-${i}`} className={isToday ? "active" : ""}>{i}</li>
      );
    }

    // Next month's days
    for (let i = lastDayOfMonth + 1; i <= 6; i++) {
      days.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth}</li>);
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currYear, currMonth + direction, 1);
    setCurrDate(newDate);
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons">
          <span id="prev" onClick={() => handleMonthChange(-1)} className="material-symbols-rounded">
            {`‹`}
          </span>
          <span id="next" onClick={() => handleMonthChange(1)} className="material-symbols-rounded">
            {`›`}
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li>
          <li>Thu</li><li>Fri</li><li>Sat</li>
        </ul>
        <ul className="days">{renderCalendar()}</ul>
      </div>
    </div>
  );
};

export default Calendar;
