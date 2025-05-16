import React from "react";
import AdminCalendar from "../components/AdminCalendar.jsx";

const CalendarView = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <AdminCalendar />
    </div>
  );
};

export default CalendarView;
