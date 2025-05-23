"use client";
import CalendarApp from "@/src/components/calendar";
import EventSidebars from "@/src/components/event-sidebars";
import Header from "@/src/components/layouts/Header";
import React, { useRef } from "react";

function Events() {
  const calendarRef = useRef<any>();

  const handleEventCreate = (eventData: {
    title: string;
    start: string;
    end: string;
    location?: string;
    description?: string;
  }) => {
    if (calendarRef.current?.handleCreateEvent) {
      calendarRef.current.handleCreateEvent(eventData);
    }
  };

  return (
    <div className="min-h-screen w-100vw bg-hero-pattern bg-cover bg-center ">
      <Header />
      <div className="calendar-content w-full h-full  flex  justify-center">
        <div className="sidebar basis-1/6 bg-white min-h-[100vh]">
          <EventSidebars onEventCreate={handleEventCreate} />
        </div>
        <div className="calendar basis-5/6">
          <CalendarApp ref={calendarRef} />
        </div>
      </div>
    </div>
  );
}

export default Events;
