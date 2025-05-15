import { Button, DatePicker, Form, Input, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ButtonCustom from "../Button/ButtonCustom";
import Clock from "@/src/assets/icons/clock.png";
import Environment from "@/src/assets/icons/environment.png";
import Description from "@/src/assets/icons/description.png";
import "./modalEvent.css";

interface ModalEvent {
  isOpen: boolean;
  loading?: boolean;
  handleCancle: () => void;
}
function ModalEvent({ isOpen, handleCancle }: ModalEvent) {
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Đã lưu", values);
        handleCancle();
      })
      .catch((errorInfo) => {
        console.log("Có lỗi", errorInfo);
      });
  };
  return (
    <div className="modal-event">
      <Modal
        open={isOpen}
        onCancel={() => handleCancle()}
        footer={null}
        closable
        centered
        width={400}
        className="modal-event__modal"
      >
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          className="modal-event__modal___input py-9"
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            className="input-hover-animate"
          >
            <Input
              placeholder="Thêm tiêu đề"
              variant="borderless"
              className="modal-event__modal___input____title"
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
              className="modal-event__modal___input____date w-full"
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
              className="modal-event__modal___input____location"
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
              className="modal-event__modal___input____description"
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
  );
}

export default ModalEvent;
