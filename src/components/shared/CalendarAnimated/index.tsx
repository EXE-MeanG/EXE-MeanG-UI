"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FloatingItem from "./floatingItems";
import SandClock from "@/src/assets/images/sandclock.png";
import Star from "@/src/assets/images/stars.png";
import Ring from "@/src/assets/images/ring.png";
import Speaker from "@/src/assets/images/speaker.png";
import Piece from "@/src/assets/images/tua rua 1.png";
import Piece2 from "@/src/assets/images/tua rua.png";
import Calendar from "@/src/assets/images/calendar.png";
export default function CalendarAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const items = [
    {
      src: SandClock,
      alt: "Đồng hồ cát",
      pieces: 1,
      basePosition: { top: "15%", left: "55%" },
      size: { width: 160, height: 160 },
    },
    {
      src: Star,
      alt: "Ngôi sao",
      pieces: 1,
      basePosition: { top: "70%", left: "0%" },
      size: { width: 150, height: 150 },
    },
    {
      src: Ring,
      alt: "Vòng",
      pieces: 1,
      basePosition: { top: "75%", left: "55%" },
      size: { width: 155, height: 155 },
    },
    {
      src: Speaker,
      alt: "Loa",
      pieces: 1,
      basePosition: { top: "20%", left: "0%" },
      size: { width: 150, height: 150 },
    },
    // {
    //   src: Piece,
    //   alt: "Mảnh nhỏ 1",
    //   pieces: 1,
    //   basePosition: { top: "10%", left: "50%" },
    //   size: { width: 30, height: 30 },
    // },
    // {
    //   src: Piece2,
    //   alt: "Mảnh nhỏ 2",
    //   pieces: 1,
    //   basePosition: { top: "85%", left: "50%" },
    //   size: { width: 30, height: 30 },
    // },
  ];

  return (
    <div className="relative  max-w-xl h-[500px] mx-auto">
      {/* Calendar in the center */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          isLoaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          width: "250px",
          height: "250px",
          filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.2))",
        }}
      >
        <div className="relative w-full h-full hover:scale-105 transition-transform duration-300">
          <Image
            src={Calendar}
            alt="Lịch"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
          <Image
            src={Piece2}
            alt="Lịch"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
          <Image
            src={Piece}
            alt="Lịch"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Floating items */}
      {items.map((item, index) => (
        <FloatingItem
          key={index}
          src={item.src}
          alt={item.alt}
          pieces={item.pieces}
          basePosition={item.basePosition}
          size={item.size}
          delay={index * 0.2}
          isLoaded={isLoaded}
        />
      ))}
    </div>
  );
}
