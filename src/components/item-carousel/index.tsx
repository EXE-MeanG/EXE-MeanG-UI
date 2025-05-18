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
import U1 from "@/src/assets/upper/u1.png";
import Plus from "@/src/assets/icons/plus.png";
function ItemCarousel() {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const carouselRef = useRef<any>(null);

  const data = [
    {
      imageSrc: "@/src/assets/upper/u1.png",
      imageAlt: "u1",
    },
    {
      imageSrc: "@/src/assets/upper/u2.png",
      imageAlt: "u2",
    },
    {
      imageSrc: "@/src/assets/upper/u3.png",
      imageAlt: "u3",
    },
    {
      imageSrc: "@/src/assets/upper/u4.png",
      imageAlt: "u4",
    },
    {
      imageSrc: "@/src/assets/upper/u5.png",
      imageAlt: "u5",
    },
  ];

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
        <Image
          src={Plus}
          alt="plus"
          width={60}
          height={60}
          className="!text-6xl"
        />
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
  return (
    <div className="item-carousel flex flex-1 gap-14">
      <LeftOutlined className="!text-4xl" onClick={prev} />
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader "
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        // onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Carousel
        infinite
        dots={false}
        dotPosition="bottom"
        slidesToShow={4}
        className="!w-[900px] !h-[179px]"
        ref={carouselRef}
      >
        {data.map((item, index) => {
          return (
            <CardCustom
              cardSrc={U1}
              className="w-[179px] h-[179px] "
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
