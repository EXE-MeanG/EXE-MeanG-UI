"use client";
import { DownOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import CalendarMini from "../shared/CalendarMini";

function EventSidebars() {
  return (
    <div className="event-sidebars">
      <div className="event-sidebars_header">
        <MenuOutlined />
        <span>Calendar</span>
      </div>
      <div className="event-sidebars_action">
        <ButtonDiscCustom>
          <div className=" z-10 flex items-center gap-1">
            <PlusOutlined />
            <span>Tạo</span>
            <DownOutlined />
          </div>
        </ButtonDiscCustom>
      </div>
      <div className="event-sidebars_calendar">
        <CalendarMini />
      </div>
    </div>
  );
}

export default EventSidebars;
