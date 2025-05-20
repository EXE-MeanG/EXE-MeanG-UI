"use client";

import { useEffect, useRef, useState } from "react";
import { ScheduleXCalendar } from "@schedule-x/react";
import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import "@schedule-x/theme-default/dist/index.css";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "./style.css";
import { useDateStore } from "@/src/stores/dateStore";
import { Modal } from "antd";

function generateCustomContent(event: any) {
  const content = `
    <div style="padding: 2px">
      <div style="font-weight: bold; font-size: 12px">${event.title}</div>
      <div style="font-size: 10px; color: gray">
        ${dayjs(event.start).format("HH:mm")} - ${dayjs(event.end).format(
    "HH:mm"
  )}
      </div>
      <img src="${
        event.image
      }" style="width: 100%; height: 100px; border-radius: 4px; object-fit: cover; margin-top: 4px" />
    </div>
  `;
  return {
    timeGrid: content,
  };
}

function CalendarApp() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { selectedDate } = useDateStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Event 1",
      start: "2025-05-09 21:05",
      end: "2025-05-09 22:35",
      image: "https://azpet.com.vn/wp-content/uploads/2019/01/pomeranian.jpg",
    },
  ]);

  const enhancedEvents = events.map((e) => ({
    ...e,
    _customContent: generateCustomContent(e),
  }));

  const eventsService = createEventsServicePlugin();
  const calendarControls = createCalendarControlsPlugin();

  const calendar = createCalendar({
    locale: "vi-VN",
    views: [createViewWeek()],
    events: enhancedEvents,
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createCurrentTimePlugin(),
      calendarControls,
    ],
    callbacks: {
      onRender: () => {
        eventsService.getAll();
      },
      onEventClick: (event) => {
        setSelectedEvent(event);
        setModalVisible(true);
      },
      onEventUpdate: (updatedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedEvent.id
              ? {
                  ...event,
                  start: updatedEvent.start,
                  end: updatedEvent.end,
                }
              : event
          )
        );
      },
    },
  });

  useEffect(() => {
    if (selectedDate) {
      calendarControls.setDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="calendar-container" ref={calendarRef}>
        <div className="w-full h-full">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered={false}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div>
            <p>
              <strong>Thời gian:</strong>{" "}
              {dayjs(selectedEvent.start).format("HH:mm")} -{" "}
              {dayjs(selectedEvent.end).format("HH:mm")}
              {dayjs(selectedEvent.end).format("DD/MM/YYYY")}
            </p>
            <img
              src={selectedEvent.image}
              alt="Event"
              style={{ width: "100%", borderRadius: 6, objectFit: "cover" }}
            />
          </div>
        )}
      </Modal>
    </>
  );
}

export default CalendarApp;
