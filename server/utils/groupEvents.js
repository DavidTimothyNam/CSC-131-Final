// utils/groupEvents.js

function groupEventsByDate(events) {
  return events.reduce((acc, event) => {
    const date = new Date(event.start).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});
}

module.exports = groupEventsByDate;
