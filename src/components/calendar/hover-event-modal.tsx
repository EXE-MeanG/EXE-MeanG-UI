"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { format, addHours, parseISO } from "date-fns";
import { eventCategories } from "./event-category";
import { Calendar } from "antd";

interface HoverEventModalProps {
  position: { x: number; y: number };
  date: string;
  onCreateEvent: (eventData: {
    title: string;
    start: string;
    end: string;
    categoryId: string;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  }) => void;
  onClose: () => void;
}

export function HoverEventModal({
  position,
  date,
  onCreateEvent,
  onClose,
}: HoverEventModalProps) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryId, setCategoryId] = useState("work"); // Default to "Work" category
  const [selectedDate, setSelectedDate] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Set default times and date when date prop changes
  useEffect(() => {
    if (date) {
      try {
        const dateObj = parseISO(date);
        // Format the date for the date input
        setSelectedDate(format(dateObj, "yyyy-MM-dd"));

        // Round to nearest half hour
        const minutes = Math.round(dateObj.getMinutes() / 30) * 30;
        const roundedDate = new Date(dateObj);
        roundedDate.setMinutes(minutes);

        setStartTime(format(roundedDate, "HH:mm"));
        setEndTime(format(addHours(roundedDate, 1), "HH:mm"));
      } catch (e) {
        // Fallback if date parsing fails
        setStartTime("09:00");
        setEndTime("10:00");

        // Set today's date as fallback
        const today = new Date();
        setSelectedDate(format(today, "yyyy-MM-dd"));
      }
    }
  }, [date]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !startTime || !endTime || !selectedDate) return;

    const selectedCategory =
      eventCategories.find((cat) => cat.id === categoryId) ||
      eventCategories[0];

    onCreateEvent({
      title,
      start: `${selectedDate} ${startTime}`,
      end: `${selectedDate} ${endTime}`,
      categoryId,
      color: selectedCategory.color,
      backgroundColor: selectedCategory.bgColor,
      borderColor: selectedCategory.borderColor,
    });

    // Reset form
    setTitle("");
  };

  // Calculate position to avoid going off-screen
  const getModalStyle = () => {
    const offset = 10; // Offset from cursor
    let x = position.x + offset;
    let y = position.y + offset;

    // Adjust if we have access to window
    if (typeof window !== "undefined") {
      const modalWidth = 300; // Approximate modal width
      const modalHeight = 350; // Approximate modal height

      if (x + modalWidth > window.innerWidth) {
        x = position.x - modalWidth - offset;
      }

      if (y + modalHeight > window.innerHeight) {
        y = position.y - modalHeight - offset;
      }
    }

    return {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 1000,
    } as React.CSSProperties;
  };

  return (
    <div ref={modalRef} className="hover-event-modal" style={getModalStyle()}>
      <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-[300px]">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          New Event
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Event title"
              className="w-full px-3 py-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Start</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-md"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">End</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-md"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <div className="grid grid-cols-5 gap-1">
              {eventCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`p-1 rounded-md border ${
                    categoryId === category.id
                      ? "ring-2 ring-offset-1 ring-gray-400"
                      : ""
                  }`}
                  style={{
                    backgroundColor: category.bgColor,
                    borderColor: category.borderColor,
                  }}
                  onClick={() => setCategoryId(category.id)}
                  title={category.name}
                >
                  <span
                    className="block h-5 text-xs font-medium truncate"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 text-sm border rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
