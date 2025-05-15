"use client";
import {
  CaretDownOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import CalendarMini from "../shared/CalendarMini";
import { Form } from "antd";
import "./style.css";
import ModalEvent from "../shared/ModalEvent/modalEvent";

function EventSidebars() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <div className="event-sidebars ">
      <div className="event-sidebars_header text-xl flex gap-4 p-4 font-semibold">
        <MenuOutlined />
        <span>Calendar</span>
      </div>
      <div className="event-sidebars_action px-14 ">
        <ButtonDiscCustom width="w-[100px]" onClick={() => handleOpen()}>
          <div className=" z-10 flex items-center gap-2 font-normal">
            <PlusOutlined />
            <span>Tạo</span>
            <CaretDownOutlined />
          </div>
        </ButtonDiscCustom>
      </div>
      <div className="event-sidebars_calendar p-10">
        <CalendarMini />
        <ModalEvent isOpen={isOpen} handleCancle={handleClose} />
      </div>
    </div>
  );
}

export default EventSidebars;
