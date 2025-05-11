"use client";
import {
  CaretDownOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import CalendarMini from "../shared/CalendarMini";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import "./style.css";
import Image from "next/image";
import Clock from "@/src/assets/icons/clock.png";
import Environment from "@/src/assets/icons/environment.png";
import Description from "@/src/assets/icons/description.png";
import ButtonCustom from "../shared/Button/ButtonCustom";

function EventSidebars() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Đã lưu", values);
        setIsOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Có lỗi", errorInfo);
      });
  };
  return (
    <div className="event-sidebars ">
      <div className="event-sidebars_header text-xl flex gap-4 p-4 font-semibold">
        <MenuOutlined />
        <span>Calendar</span>
      </div>
      <div className="event-sidebars_action px-14 ">
        <ButtonDiscCustom width="w-[100px]" onClick={() => setIsOpen(true)}>
          <div className=" z-10 flex items-center gap-2 font-normal">
            <PlusOutlined />
            <span>Tạo</span>
            <CaretDownOutlined />
          </div>
        </ButtonDiscCustom>
      </div>
      <div className="event-sidebars_calendar p-10">
        <CalendarMini />
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          closable
          centered
          width={400}
          className="event-sidebars_calendar__modal"
        >
          <Form
            layout="vertical"
            form={form}
            requiredMark={false}
            className="event-sidebars_calendar__modal___input py-9"
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
              className="input-hover-animate"
            >
              <Input
                placeholder="Thêm tiêu đề"
                variant="borderless"
                className="event-sidebars_calendar__modal___input____title"
              />
            </Form.Item>

            <Form.Item
              name="time"
              rules={[{ required: true, message: "Chọn thời gian" }]}
              className="input-hover-animate"
            >
              <DatePicker
                showTime
                format="dddd, DD [Tháng] MM HH:mm"
                prefix={
                  <span className="icon-gradient">
                    <Image src={Clock} alt="clockicon" />
                  </span>
                }
                variant="borderless"
                className="event-sidebars_calendar__modal___input____date w-full"
              />
            </Form.Item>

            <Form.Item name="location" className="input-hover-animate">
              <Input
                placeholder="Thêm vị trí"
                prefix={
                  <span className="icon-gradient">
                    <Image src={Environment} alt="EnvironmentIcon" />
                  </span>
                }
                variant="borderless"
                className="event-sidebars_calendar__modal___input____location"
              />
            </Form.Item>

            <Form.Item name="description" className="input-hover-animate">
              <Input
                placeholder="Thêm mô tả"
                prefix={
                  <span className="icon-gradient">
                    <Image src={Description} alt="DescriptionIcon" />
                  </span>
                }
                variant="borderless"
                className="event-sidebars_calendar__modal___input____description"
              />
            </Form.Item>
            <div className="flex justify-between mt-4">
              <Button className="btn-1" type="link">
                Tuỳ chọn khác
              </Button>
              <ButtonCustom
                className="!w-32 rounded-sm shadow-lg"
                onClick={handleSave}
              >
                Lưu
              </ButtonCustom>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default EventSidebars;
