"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { useEffect, useState, useRef } from "react";

import "@schedule-x/theme-default/dist/index.css";
import "./style.css";

function CalendarApp() {
  const calendarRef = useRef<HTMLDivElement>(null);

  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = createEventModalPlugin();

  const calendar = useNextCalendarApp({
    views: [createViewWeek()],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-04-24 21:05",
        end: "2025-04-24 22:35",
      },
    ],
    plugins: [eventsService, createDragAndDropPlugin(), eventModal],
    callbacks: {
      onRender: () => {
        eventsService.getAll();
      },
    },
  });

  return (
    <div className="calendar-container" ref={calendarRef}>
      <div className="w-full h-full">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}
export default CalendarApp;
