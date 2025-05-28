"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import "./cardCustom2.css";

interface CardCustom2 {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const CardCustom2: React.FC<CardCustom2> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`h-60 w-48 relative p-[4px] rounded-sm  overflow-hidden bg-primary-gradient main-card card-glow-border ${className} `}
    >
      <div className=" b w-full h-full rounded-sm bg-main-background "></div>
      <div className="absolute w-[98%] h-[98%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default CardCustom2;
