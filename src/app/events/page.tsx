import CalendarApp from "@/src/components/calendar";
import Header from "@/src/components/layouts/Header";
import React from "react";

function Events() {
  return (
    <div className="min-h-screen w-100vw bg-hero-pattern bg-cover bg-center ">
      <Header />
      <div className="calendar-content w-full h-full  flex  justify-center">
        <div className="sidebar basis-1/6 bg-white min-h-[100vh]"> </div>
        <div className="calendar basis-5/6">
          <CalendarApp />
        </div>
      </div>
    </div>
  );
}

export default Events;
