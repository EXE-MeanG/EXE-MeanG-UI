"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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
      ${
        event.location
          ? `<div style="font-size: 10px">${event.location}</div>`
          : ""
      }
      ${
        event.description
          ? `<div style="font-size: 10px">${event.description}</div>`
          : ""
      }
    </div>
  `;
  return {
    timeGrid: content,
  };
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  _customContent?: any;
}

const CalendarApp = forwardRef((props, ref) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { selectedDate } = useDateStore();
  const [calendar, setCalendar] = useState<any>(null);
  const [eventsPlugin, setEventsPlugin] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handleCreateEvent = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      _customContent: generateCustomContent({
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
      }),
    };

    if (eventsPlugin) {
      eventsPlugin.add(newEvent);
    }
  };

  useImperativeHandle(ref, () => ({
    handleCreateEvent,
  }));

  useEffect(() => {
    const eventsService = createEventsServicePlugin();
    const calendarControls = createCalendarControlsPlugin();

    const calendarInstance = createCalendar({
      locale: "vi-VN",
      views: [createViewWeek()],
      plugins: [
        eventsService,
        createDragAndDropPlugin(),
        createCurrentTimePlugin(),
        calendarControls,
      ],
      callbacks: {
        onEventClick: (event: any) => {
          setSelectedEvent({
            id: event.id.toString(),
            title: event.title,
            start: event.start,
            end: event.end,
            location: event.location,
            description: event.description,
          });
          setModalVisible(true);
        },
        onEventUpdate: (updatedEvent: any) => {
          if (eventsPlugin) {
            eventsPlugin.update(updatedEvent);
          }
        },
      },
    });

    setCalendar(calendarInstance);
    setEventsPlugin(eventsService);

    if (selectedDate) {
      calendarControls.setDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <div className="calendar-container" ref={calendarRef}>
        <div className="w-full h-full">
          {calendar && <ScheduleXCalendar calendarApp={calendar} />}
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
              {dayjs(selectedEvent.end).format("HH:mm")}{" "}
              {dayjs(selectedEvent.end).format("DD/MM/YYYY")}
            </p>
            {selectedEvent.location && (
              <p>
                <strong>Địa điểm:</strong> {selectedEvent.location}
              </p>
            )}
            {selectedEvent.description && (
              <p>
                <strong>Mô tả:</strong> {selectedEvent.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
});

CalendarApp.displayName = "CalendarApp";

export default CalendarApp;
