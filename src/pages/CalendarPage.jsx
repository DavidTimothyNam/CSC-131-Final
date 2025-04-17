import React, { Suspense, lazy } from "react";

const ResourceCalendar = lazy(() =>
  import("../components/Calendar/ResourceCalendar")
);

// import ResourceCalendar from "../components/Calendar/ResourceCalendar";
function CalendarPage() {
  return (
    <Suspense fallback={<div>Loading calendar...</div>}>
      <ResourceCalendar />
    </Suspense>
  );
}

export default CalendarPage;
