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
  const [isUploading, setIsUploading] = useState(false);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await onUpload(type, file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full flex  gap-6">
      <div className="flex items-center justify-start">
        <Upload
          name="image"
          showUploadList={false}
          customRequest={({ file }) => {
            if (file instanceof File) {
              handleUpload(file);
            }
          }}
          disabled={isUploading}
        >
          <CardCustom2 className="!w-[179px] !h-[179px] cursor-pointer transition-all hover:scale-105">
            {isUploading ? (
              <>
                <LoadingOutlined className="text-2xl mb-2" spin />
                <span className="text-gray-500">Uploading...</span>
              </>
            ) : (
              <>
                <Image src={Plus} alt="plus" width={24} height={24} />
                <span className="mt-2 text-gray-500">Upload {type}</span>
              </>
            )}
          </CardCustom2>
        </Upload>
      </div>

      <div className="item-carousel flex flex-1 gap-14 items-center">
        <LeftOutlined className="!text-4xl cursor-pointer" onClick={prev} />
        <Carousel
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
    </div>
  );
}

export default ItemCarousel;
