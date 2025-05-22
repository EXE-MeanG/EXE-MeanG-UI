"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import "./cardCustom.css";

interface CardCustom {
  className?: string;
  cardSrc: string | StaticImageData;
  cardAlt?: string;
  cardWidth?: number;
  cardHeight?: number;
}

const CardCustom: React.FC<CardCustom> = ({
  className,
  cardSrc,
  cardAlt = "card",
  cardWidth = 24,
  cardHeight = 24,
}) => {
  return (
    <div
      className={`h-60 w-48 relative p-[10px] rounded-sm  overflow-hidden bg-primary-gradient main-card card-glow-border ${className} `}
    >
      <div className="  w-full h-full rounded-sm bg-main-background "></div>
      <div className="absolute w-[98%] h-[98%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src={cardSrc}
          alt={cardAlt}
          width={cardWidth}
          height={cardHeight}
          className="w-[80%] h-[80%] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "
        />
      </div>
    </div>
  );
};

export default CardCustom;
