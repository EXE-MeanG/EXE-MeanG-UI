import React, { useRef } from "react";
import { Avatar, Carousel, List } from "antd";
import { DownOutlined } from "@ant-design/icons";

type DataType = {
  title?: string;
  description?: string;
};

const data: DataType[] = [
  {
    title: "Nâng cấp Premium ngay!",
    description:
      "Mở khóa phối đồ thông minh & lưu trữ không giới hạn! ✨Nâng cấp ngay để tận hưởng trọn vẹn trải nghiệm thời trang của bạn! 💖",
  },
  {
    title: "Phối đồ khó? Đã có AI lo!",
    description:
      "Trải nghiệm ngay tính năng mix & match thông minh – Hoàn toàn miễn phí! ✨",
  },
  {
    title: "Không có gì để mặc hết!!!",
    description: "Hệ thống lại tủ đồ của mình cùng MeanG bạn nhé! 💖",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
  {
    title: "Nâng cấp Premium ngay!",
    description:
      "Mở khóa phối đồ thông minh & lưu trữ không giới hạn! ✨Nâng cấp ngay để tận hưởng trọn vẹn trải nghiệm thời trang của bạn! 💖",
  },
  {
    title: "Phối đồ khó? Đã có AI lo!",
    description:
      "Trải nghiệm ngay tính năng mix & match thông minh – Hoàn toàn miễn phí! ✨",
  },
  {
    title: "Không có gì để mặc hết!!!",
    description: "Hệ thống lại tủ đồ của mình cùng MeanG bạn nhé! 💖",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
  {
    title: "🔔 Đừng quên nhé!",
    description:
      "Bạn có cuộc hẹn vào [Thứ X], bạn đã có outfit phù hợp chưa? Cùng MeanG lựa chọn diện mạo thật “slay” nhé! 👗✨",
  },
];

const Notification = () => {
  const carouselRef = useRef<any>(null);
  const next = () => {
    carouselRef.current.next();
  };
  return (
    <div className="profile-notification p-11 bg-white rounded-lg shadow-2xl w-full h-full flex flex-col items-center justify-center">
      <Carousel
        infinite
        dots={false}
        dotPosition="left"
        slidesToShow={6}
        ref={carouselRef}
      >
        {data.map((item, index) => {
          return (
            <div className="my-3 p-1 wrapper relative rounded-md overflow-hidden bg-primary-gradient input-glow-border ">
              <div
                className="p-4 profile-notification_item bg-white"
                key={index}
              >
                <h1 className="profile-notification_item__title">
                  {item.title}
                </h1>
                <p className="profile-notification_item__đescription">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
      <DownOutlined className="text-xl hover:opacity-60" onClick={next} />
    </div>
  );
};

export default Notification;
