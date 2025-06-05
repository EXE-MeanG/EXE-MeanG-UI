"use client";

import React from "react";
import "./cardCustom.css";
import { Image } from "antd";

interface CardCustom {
  className?: string;
  cardSrc: string;
  cardAlt?: string;
  cardWidth?: number;
  cardHeight?: number;
  onClick?: () => void;
  classImage?: string;
}

const CardCustom: React.FC<CardCustom> = ({
  className,
  cardSrc,
  cardAlt = "card",
  cardWidth = 24,
  cardHeight = 24,
  onClick,
  classImage,
}) => {
  return (
    <div
      className={`h-60 w-48 relative p-[4px] rounded-sm  overflow-hidden bg-primary-gradient main-card card-glow-border ${className} `}
      onClick={onClick}
    >
      <div className=" w-full h-full rounded-sm bg-main-background "></div>
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <Image
          preview={false}
          src={cardSrc}
          alt={cardAlt}
          width={cardWidth}
          height={cardHeight}
          className={`!w-[80%] !h-[80%] !object-cover !absolute !top-1/2 !left-1/2 !transform -translate-x-1/2 -translate-y-1/2 ${classImage} `}
        />
      </div>
    </div>
  );
};

export default CardCustom;
