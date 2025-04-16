import React, { useEffect, useState } from "react";
import PageNavbar from "../../components/Navbar";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [currMonth, setCurrMonth] = useState(currentDate.getMonth());
  const [currYear, setCurrYear] = useState(currentDate.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    renderCalendar();
  }, [currMonth, currYear]);

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
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
      <PageNavbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body {
          display: flex;
          align-items: center;
          padding: 0 10px;
          justify-content: center;
          min-width: 110vh;
        }
        .wrapper {
          min-width: 750px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          margin: 50px auto;
        }
        .wrapper header {
          display: flex;
          align-items: center;
          padding: 25px 30px 10px;
          justify-content: space-between;
        }
        header .icons {
          display: flex;
        }
        header .icons span {
          height: 38px;
          width: 38px;
          margin: 0 1px;
          cursor: pointer;
          color: #878787;
          text-align: center;
          line-height: 38px;
          font-size: 1.9rem;
          user-select: none;
          border-radius: 50%;
        }
        .icons span:last-child {
          margin-right: -10px;
        }
        header .icons span:hover {
          background: #f2f2f2;
        }
        header .current-date {
          font-size: 1.45rem;
          font-weight: 500;
        }
        .calendar {
          padding: 20px;
        }
        .calendar ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          text-align: center;
        }
        .calendar .days {
          margin-bottom: 20px;
        }
        .calendar li {
          color: #333;
          width: calc(100% / 7);
          font-size: 1.07rem;
        }
        .calendar .weeks li {
          font-weight: 500;
          cursor: default;
        }
        .calendar .days li {
          z-index: 1;
          cursor: pointer;
          position: relative;
          margin-top: 30px;
        }
        .days li.inactive {
          color: #aaa;
        }
        .days li.active {
          color: #fff;
        }
        .days li::before {
          position: absolute;
          content: "";
          left: 50%;
          top: 50%;
          height: 40px;
          width: 40px;
          z-index: -1;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .days li.active::before {
          background: #9B59B6;
        }
        .days li:not(.active):hover::before {
          background: #f2f2f2;
        }
      `}</style>

      <div className="wrapper">
        <header>
          <p className="current-date">{months[currMonth]} {currYear}</p>
          <div className="icons">
            <span className="material-symbols-rounded" onClick={handlePrev}>chevron_left</span>
            <span className="material-symbols-rounded" onClick={handleNext}>chevron_right</span>
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
                className={`${d.inactive ? "inactive" : ""} ${d.active ? "active" : ""}`}
              >
                {d.day}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Calendar;
