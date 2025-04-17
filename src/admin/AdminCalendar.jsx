import React, { useState } from "react";

const AdminCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  const handleBookAppointment = () => {
    // Logic to book an appointment
    setAppointments([...appointments, "New Appointment"]);
  };

  const handleCancelAppointment = (index) => {
    // Logic to cancel an appointment
    const newAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(newAppointments);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Calendar</h1> {/* Updated header to reflect admin calendar */}
      <button onClick={handleBookAppointment}>Book Appointment</button>
      <h3>Appointments</h3>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {appointment} <button onClick={() => handleCancelAppointment(index)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCalendar;

