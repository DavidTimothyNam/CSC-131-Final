import React, { useEffect, useState } from "react";
import Layout from "../Layout";
// import "./ResourceCalendar.css";

const ResourceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [currMonth, setCurrMonth] = useState(currentDate.getMonth());
  const [currYear, setCurrYear] = useState(currentDate.getFullYear());

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

  useEffect(() => {
    renderCalendar();
  }, [currMonth, currYear]);

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let days = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      days.push({ day: lastDateofLastMonth - i + 1, inactive: true });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const today = new Date();
      const isToday =
        i === today.getDate() &&
        currMonth === today.getMonth() &&
        currYear === today.getFullYear();

      days.push({ day: i, active: isToday, inactive: false });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      days.push({ day: i - lastDayofMonth + 1, inactive: true });
    }

    setCalendarDays(days);
  };

  const handlePrev = () => {
    let newMonth = currMonth - 1;
    let newYear = currYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrMonth(newMonth);
    setCurrYear(newYear);
  };

  const handleNext = () => {
    let newMonth = currMonth + 1;
    let newYear = currYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrMonth(newMonth);
    setCurrYear(newYear);
  };

  return (
    <>
      <Layout>
        <div className="wrapper">
          <header>
            <p className="current-date">
              {months[currMonth]} {currYear}
            </p>
            <div className="icons">
              <span className="material-symbols-rounded" onClick={handlePrev}>
                chevron_left
              </span>
              <span className="material-symbols-rounded" onClick={handleNext}>
                chevron_right
              </span>
            </div>
          </header>

          <div className="calendar">
            <ul className="weeks">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <li key={day}>{day}</li>
              ))}
            </ul>
            <ul className="days">
              {calendarDays.map((d, idx) => (
                <li
                  key={idx}
                  className={`${d.inactive ? "inactive" : ""} ${
                    d.active ? "active" : ""
                  }`}
                >
                  {d.day}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResourceCalendar;
