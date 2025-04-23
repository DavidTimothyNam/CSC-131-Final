import React from 'react';
import Calendar from '../components/Calendar'; // ✅ Adjust path as needed
import '../components/Calendar.css'; // ✅ Don't forget the CSS for styling

const CalendarView = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <Calendar />
    </div>
  );
};

export default CalendarView;
