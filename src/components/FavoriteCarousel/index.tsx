import { Carousel } from "antd";
import React, { useRef } from "react";
import {
  LeftOutlined,
  RightOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import CardCustom from "../shared/Card/cardCustom";
import "./style.css";

interface OutfitItem {
  _id: string;
  imageUrl: string;
  name: string;
  isFavorite: boolean;
}

interface OutfitCarouselProps {
  items: OutfitItem[];
  onSelect?: (item: OutfitItem) => void;
  onToggleFavorite?: (itemId: string) => Promise<void>;
}

function OutfitCarousel({
  items,
  onSelect,
  onToggleFavorite,
}: OutfitCarouselProps) {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  const handleHeartClick = async (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    if (onToggleFavorite) {
      await onToggleFavorite(itemId);
    }
  };

  return (
    <div className="w-full outfit-carousel flex flex-1 gap-14 items-center">
      <LeftOutlined className="!text-4xl cursor-pointer" onClick={prev} />
      <Carousel
        infinite
        dots={false}
        dotPosition="bottom"
        slidesToShow={3}
        className="!w-[80vw] !h-[617px]"
        ref={carouselRef}
      >
        {items.map((item, index) => (
          <div key={item._id || index} className="px-2">
            <div className="relative">
              <CardCustom
                cardSrc={item.imageUrl}
                cardAlt={item.name}
                cardWidth={411}
                cardHeight={617}
                className="!w-[411px] !h-[617px] cursor-pointer transition-all hover:scale-105"
                onClick={() => onSelect?.(item)}
              />
              <button
                onClick={(e) => handleHeartClick(e, item._id)}
                className="absolute top-2 left-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              >
                {item.isFavorite ? (
                  <HeartFilled className="text-xl text-red-500" />
                ) : (
                  <HeartOutlined className="text-xl text-gray-600 hover:text-red-500" />
                )}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      <RightOutlined className="!text-4xl cursor-pointer" onClick={next} />
    </div>
  );
}

export default OutfitCarousel;
