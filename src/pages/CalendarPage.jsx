import React from "react";
import Layout from "../components/Layout";
import Calendar from "../components/UserCalendar.jsx";

const CalendarPage = () => (
  <Layout>
    <h1 className="bold text-center mb-4">Calendar</h1>
    <Calendar />
  </Layout>
);

export default CalendarPage;
