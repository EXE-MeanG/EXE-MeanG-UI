"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./avatarDiscCustom.css";
import { CameraOutlined } from "@ant-design/icons";

interface AvaDiscCustom {
  className?: string;
  iconSrc: string;
  iconAlt?: string;
  iconSize?: number;
}

const AvaDiscCustom: React.FC<AvaDiscCustom> = ({
  className,
  iconSrc,
  iconAlt = "icon",
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
      <div className=" p-[4px] rounded-full overflow-hidden relative z-20">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={100}
          height={100}
          className="!w-full !h-full object-cover rounded-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-1/6 translate-y-1/6 bg-blue-100 rounded-full p-2  z-20">
        <CameraOutlined className="text-xl text-black" />
      </div>
    </div>
  );
};

export default AvaDiscCustom;
