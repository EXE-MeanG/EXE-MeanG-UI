"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = clockwise, -1 = counterclockwise
  const requestRef = useRef<number>();

  const rotate = () => {
    setAngle((prev) => prev + direction * 0.5); // tốc độ quay
    requestRef.current = requestAnimationFrame(rotate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [direction]);

  return (
    <div
      className={`relative h-32 w-32 ${className}`}
      onMouseEnter={() => setDirection(-1)}
      onMouseLeave={() => setDirection(1)}
    >
      {/* Vòng xoay */}
      <div
        className="absolute inset-0 p-[4px] rounded-full overflow-hidden bg-primary-gradient"
        style={{
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.05s linear",
        }}
      >
        <div className="bg-primary w-full h-full rounded-full circle-center" />
      </div>

      {/* ✅ Mặt nạ trắng ở trên */}
      <div className="absolute inset-0 rounded-full bg-white opacity-60 pointer-events-none z-10" />

      {/* Icon trung tâm */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />
      </div>
    </div>
  );
};

export default DiscCustom;
