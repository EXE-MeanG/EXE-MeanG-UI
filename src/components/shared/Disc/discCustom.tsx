"use client";

import React from "react";
import Image from "next/image";
import "./discCustom.css";

interface DiscCustom {
  className?: string;
  iconSrc: string;
  iconAlt?: string;
  iconSize?: number;
}

const DiscCustom: React.FC<DiscCustom> = ({
  className,
  iconSrc,
  iconAlt = "icon",
  iconSize = 24,
}) => {
  return (
    <div
      className={`h-32 w-32 relative p-[4px] rounded-full overflow-hidden bg-primary-gradient ${className}`}
    >
      <div className="bg-primary w-full h-full rounded-full circle-center"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />
      </div>
    </div>
  );
};

export default DiscCustom;
