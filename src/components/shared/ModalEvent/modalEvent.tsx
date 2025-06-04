import { Button, DatePicker, Form, Input, Modal, Spin, message } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ButtonCustom from "../Button/ButtonCustom";
import Clock from "../../../assets/icons/clock.png";
import Environment from "../../../assets/icons/environment.png";
import Description from "../../../assets/icons/description.png";
import { getAllOutfits } from "@/src/services/cloths";
import "./modalEvent.css";
import dayjs from "dayjs";
import { SkinOutlined } from "@ant-design/icons";
import { addEvent } from "@/src/services/events";

interface ModalEvent {
  isOpen: boolean;
  loading?: boolean;
  handleCancle: () => void;
  preSelectedOutfit?: Outfit;
  onEventCreate?: (eventData: {
    title: string;
    start: string;
    end: string;
    location?: string;
    description?: string;
    outfitId?: string;
    imageUrl?: string;
  }) => void;
}

interface Outfit {
  _id: string;
  imageUrl: string;
  name: string;
  isFavorite: boolean;
}

function ModalEvent({
  isOpen,
  handleCancle,
  onEventCreate,
  preSelectedOutfit,
}: ModalEvent) {
  const [form] = Form.useForm();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loadingOutfits, setLoadingOutfits] = useState(false);
  const [isOutfitModalVisible, setIsOutfitModalVisible] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  useEffect(() => {
    if (preSelectedOutfit) {
      setSelectedOutfit(preSelectedOutfit);
    }
  }, [preSelectedOutfit]);

  useEffect(() => {
    if (isOutfitModalVisible) {
      fetchOutfits();
    }
  }, [isOutfitModalVisible]);

  const fetchOutfits = async () => {
    setLoadingOutfits(true);
    try {
      const response = await getAllOutfits();
      if (response?.data) {
        setOutfits(
          response.data.map((item: any) => ({
            _id: item._id,
            imageUrl: item.imageUrl || item.imageLink,
            name: item.name || "Outfit",
            isFavorite: Boolean(item.isFavorite),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching outfits:", error);
      message.error("Failed to load outfits");
    } finally {
      setLoadingOutfits(false);
    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (onEventCreate) {
          const eventData = {
            title: values.title,
            start: dayjs(values.startTime).format("YYYY-MM-DD HH:mm"),
            end: dayjs(values.endTime).format("YYYY-MM-DD HH:mm"),
            location: values.location,
            description: values.description,
            outfitId: selectedOutfit?._id,
            imageUrl: selectedOutfit?.imageUrl,
          };
          onEventCreate(eventData);
          addEvent({
            outfit_id: {
              _id: selectedOutfit?._id || "",
              imageUrl: selectedOutfit?.imageUrl || "",
            },
            start_time: dayjs(eventData.start).toDate(),
            end_time: dayjs(eventData.end).toDate(),
            description: eventData.description || "",
            location: eventData.location || "",
          });
        }
        handleCancle();
        form.resetFields();
        setSelectedOutfit(null);
      })
      .catch((errorInfo) => {
        console.log("Có lỗi", errorInfo);
      });
  };

  const handleOutfitSelect = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setIsOutfitModalVisible(false);
    message.success("Đã chọn trang phục");
  };

  return (
    <div className="modal-event">
      <Modal
        open={isOpen}
        onCancel={() => {
          handleCancle();
          form.resetFields();
          setSelectedOutfit(null);
        }}
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
            name="startTime"
            rules={[{ required: true, message: "Chọn thời gian bắt đầu" }]}
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
              placeholder="Thời gian bắt đầu"
              className="modal-event__modal___input____date w-full"
            />
          </Form.Item>

          <Form.Item
            name="endTime"
            rules={[
              { required: true, message: "Chọn thời gian kết thúc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    !getFieldValue("startTime") ||
                    dayjs(value).isAfter(getFieldValue("startTime"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Thời gian kết thúc phải sau thời gian bắt đầu")
                  );
                },
              }),
            ]}
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
              placeholder="Thời gian kết thúc"
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

          {/* Only show outfit selection if no preSelectedOutfit */}
          {!preSelectedOutfit && (
            <div className="outfit-selection mb-4">
              <Button
                icon={<SkinOutlined />}
                onClick={() => setIsOutfitModalVisible(true)}
                className="w-full mb-2"
              >
                Chọn trang phục
              </Button>
              {selectedOutfit && (
                <div className="selected-outfit flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <img
                    src={selectedOutfit.imageUrl}
                    alt="Selected Outfit"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm">Đã chọn trang phục</span>
                </div>
              )}
            </div>
          )}

          {/* Show selected outfit preview if preSelectedOutfit exists */}
          {preSelectedOutfit && (
            <div className="outfit-selection mb-4">
              <div className="selected-outfit flex items-center gap-2 p-2 bg-gray-50 rounded">
                <img
                  src={preSelectedOutfit.imageUrl}
                  alt="Selected Outfit"
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="text-sm">Trang phục đã chọn</span>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <ButtonCustom
              className="!w-40 !rounded-none shadow-lg"
              onClick={handleSave}
            >
              Đặt Lịch Hẹn
            </ButtonCustom>
          </div>
        </Form>
      </Modal>

      {/* Outfit Selection Modal */}
      <Modal
        open={isOutfitModalVisible}
        onCancel={() => setIsOutfitModalVisible(false)}
        footer={null}
        width={800}
        title="Chọn trang phục"
        centered
      >
        {loadingOutfits ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" tip="Đang tải trang phục..." />
          </div>
        ) : outfits.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 p-4">
            {outfits.map((outfit) => (
              <div
                key={outfit._id}
                className="outfit-item relative cursor-pointer group"
                onClick={() => handleOutfitSelect(outfit)}
              >
                <img
                  src={outfit.imageUrl}
                  alt={outfit.name}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button type="primary" className="bg-blue-500">
                    Chọn
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white rounded-b-lg">
                  <h3 className="text-sm font-medium text-center">
                    {outfit.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Không có trang phục nào
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ModalEvent;
