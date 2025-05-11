"use client";

import React, { useState } from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useDateStore } from "@/src/hooks/useDateStore";

dayjs.locale("vi");

const CalendarMini: React.FC = () => {
  const today = dayjs(); // cố định ngày hôm nay
  const [panelDate, setPanelDate] = useState<Dayjs>(today); // dùng cho hiển thị tháng trong lịch
  const { setSelectedDate } = useDateStore();
  const handleMonthChange = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? panelDate.subtract(1, "month")
        : panelDate.add(1, "month");
    setPanelDate(newDate);
  };
  const handleSelect = (date: Dayjs) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };
  return (
    <div>
      <Calendar
        fullscreen={false}
        value={panelDate}
        headerRender={() => (
          <div className="calendar-header w-full flex justify-between text-xl font-semibold px-4 py-2">
            <span>
              Tháng {panelDate.month() + 1}, {panelDate.year()}
            </span>
            <div className="buttonMonth flex gap-4">
              <button onClick={() => handleMonthChange("prev")}>
                <LeftOutlined />
              </button>
              <button onClick={() => handleMonthChange("next")}>
                <RightOutlined />
              </button>
            </div>
          </div>
        )}
        onSelect={handleSelect}
        fullCellRender={(date) => {
          const isToday = date.isSame(today, "day");
          return (
            <div
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${
                isToday ? "bg-blue-500 text-white" : ""
              } hover:bg-gray-100`}
            >
              {date.date()}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarMini;
