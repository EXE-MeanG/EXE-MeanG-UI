import { Carousel, GetProp, message, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import CardCustom2 from "../shared/Card2/cardCustom2";
import {
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./style.css";
import Image from "next/image";
import CardCustom from "../shared/Card/cardCustom";
import Plus from "@/src/assets/icons/plus.png";

interface ItemCarouselProps {
  type: "upper" | "downer" | "accessories";
  items: Array<{
    imageSrc: string;
    imageAlt: string;
  }>;
  onUpload?: (type: string, file: File) => Promise<void>;
}

function ItemCarousel({ type, items, onUpload }: ItemCarouselProps) {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current.next();
  };
  const prev = () => {
    carouselRef.current.prev();
  };

  const uploadButton = (
    <CardCustom2 className="w-full h-full">
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={Plus}
            alt="plus"
            width={60}
            height={60}
            className="!text-6xl"
          />
          <span className="mt-2">{`Add ${type}`}</span>
        </div>
      )}
    </CardCustom2>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      if (onUpload && info.file.originFileObj) {
        await onUpload(type, info.file.originFileObj);
      }
    }
  };

  return (
    <div className="item-carousel flex flex-1 gap-14">
      <LeftOutlined className="!text-4xl" onClick={prev} />
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Carousel
        infinite
        dots={false}
        dotPosition="bottom"
        slidesToShow={4}
        className="!w-[900px] !h-[179px]"
        ref={carouselRef}
      >
        {items.map((item, index) => {
          return (
            <CardCustom
              key={`${item.imageAlt}-${index}`}
              cardSrc={item.imageSrc}
              cardAlt={item.imageAlt}
              className="w-[179px] h-[179px]"
              cardWidth={100}
              cardHeight={100}
            />
          );
        })}
      </Carousel>
      <RightOutlined className="!text-4xl" onClick={next} />
    </div>
  );
}

export default ItemCarousel;
