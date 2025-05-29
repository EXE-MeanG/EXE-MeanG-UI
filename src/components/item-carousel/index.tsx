import {
  Button,
  Carousel,
  GetProp,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from "antd";
import React, { useRef, useState } from "react";
import CardCustom2 from "../shared/Card2/cardCustom2";
import {
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import "./style.css";
import Image from "next/image";
import CardCustom from "../shared/Card/cardCustom";
import Plus from "../../assets/icons/plus.png";
import InputCustom from "../shared/Input/InputCustom";
import ButtonCustom from "../shared/Button/ButtonCustom";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";

export interface CarouselItem {
  imageSrc: string;
  imageAlt: string;
  id?: string;
}

interface ItemCarouselProps {
  type: "upper" | "downer" | "shoes";
  items: CarouselItem[];
  onUpload: (type: string, file?: File, imageUrl?: string) => Promise<void>;
  selectedItem: CarouselItem | null;
  onSelectItem: (item: CarouselItem) => void;
  renderItemActions?: (item: CarouselItem) => React.ReactNode;
}

function ItemCarousel({
  type,
  items,
  onUpload,
  selectedItem,
  onSelectItem,
  renderItemActions,
}: ItemCarouselProps) {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="w-full item-carousel flex flex-1 gap-14 items-center">
      <LeftOutlined className="!text-4xl cursor-pointer" onClick={prev} />
      <Carousel
        infinite
        dots={false}
        dotPosition="bottom"
        slidesToShow={4}
        className="!w-[900px] !h-[179px]"
        ref={carouselRef}
      >
        {items.map((item, index) => (
          <div key={index} className="px-2">
            <div className="relative">
              <CardCustom
                cardSrc={item.imageSrc}
                cardAlt={item.imageAlt}
                cardWidth={179}
                cardHeight={179}
                className={`!w-[179px] !h-[179px] cursor-pointer transition-all hover:scale-105 ${
                  selectedItem?.imageSrc === item.imageSrc
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => onSelectItem(item)}
              />
              {renderItemActions && renderItemActions(item)}
            </div>
          </div>
        ))}
      </Carousel>
      <RightOutlined className="!text-4xl cursor-pointer" onClick={next} />
    </div>
  );
}

export default ItemCarousel;
