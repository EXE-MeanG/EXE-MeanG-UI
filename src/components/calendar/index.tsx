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
import { Modal, message } from "antd";
import { getAllEvents, Schedule } from "@/src/services/events";

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
  outfitId?: string;
  imageUrl?: string;
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
          const eventData = {
            id: event.id.toString(),
            title: event.title || event.description,
            start: event.start,
            end: event.end,
            location: event.location,
            description: event.description,
            outfitId: event.outfitId,
            imageUrl: event.imageUrl,
          };
          setSelectedEvent(eventData);
          setModalVisible(true);
        },
        onEventUpdate: (updatedEvent: any) => {
          console.log("onEventUpdate", updatedEvent);
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        if (response?.data && eventsPlugin) {
          // Get all current events
          const currentEvents = eventsPlugin.getAll();

          // Remove each existing event
          currentEvents.forEach((event: any) => {
            eventsPlugin.remove(event.id);
          });

          // Format and add new events
          const formattedEvents = response.data.map((event: Schedule) => {
            console.log(event);

            let outfitImageUrl = "";
            if (event.outfit_id.imageUrl) {
              outfitImageUrl = event.outfit_id.imageUrl;
            }
            return {
              id: Math.random().toString(36).substr(2, 9),
              title: event.description || "Untitled Event",
              start: dayjs(event.start_time).format("YYYY-MM-DD HH:mm"),
              end: dayjs(event.end_time).format("YYYY-MM-DD HH:mm"),
              location: event.location,
              description: event.description,
              outfitId: event.outfit_id._id,
              imageUrl: outfitImageUrl,
              _customContent: generateCustomContent({
                title: event.description || "Untitled Event",
                start: event.start_time,
                end: event.end_time,
                location: event.location,
                description: event.description,
              }),
            };
          });
          // Add new events
          formattedEvents.forEach((event) => {
            console.log(event);

            eventsPlugin.add(event);
          });
          message.success("Loaded events successfully");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        message.error("Failed to load events");
      }
    };

    if (eventsPlugin) {
      fetchEvents();
    }
  }, [eventsPlugin]);

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
        width={600}
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
            {selectedEvent.outfitId && (
              <p>
                <strong>Trang phục:</strong>{" "}
                <img src={selectedEvent.imageUrl} alt="Outfit" />
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
