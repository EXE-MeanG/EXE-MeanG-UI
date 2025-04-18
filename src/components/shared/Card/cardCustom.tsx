"use client";

import React from "react";
import Image from "next/image";
import "./cardCustom.css";

interface CardCustom {
  className?: string;
  iconSrc: string;
  iconAlt?: string;
  iconSize?: number;
}

const CardCustom: React.FC<CardCustom> = ({
  className,
  iconSrc,
  iconAlt = "icon",
  iconSize = 24,
}) => {
  return (
    <div
      className={`h-60 w-48 relative p-[5px] rounded-sm  overflow-hidden bg-primary-gradient main-card card-glow-border ${className} `}
    >
      <div className=" b w-full h-full rounded-sm bg-main-background "></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />
      </div>
    </div>
  );
};

export default CardCustom;
