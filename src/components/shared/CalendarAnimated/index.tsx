"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingItem from "./floatingItems";
import SandClock from "../../../assets/images/sandclock.png";

import Star from "../../../assets/images/stars.png";
import Ring from "../../../assets/images/ring.png";
import Speaker from "../../../assets/images/speaker.png";
import Piece from "../../../assets/images/tua rua 1.png";
import Piece2 from "../../../assets/images/tua rua.png";
import Calendar from "../../../assets/images/calendar.png";

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
      size: { width: 200, height: 200 },
    },
    {
      src: Star,
      alt: "Ngôi sao",
      pieces: 1,
      basePosition: { top: "70%", left: "0%" },
      size: { width: 200, height: 200 },
    },
    {
      src: Ring,
      alt: "Vòng",
      pieces: 1,
      basePosition: { top: "60%", left: "45%" },
      size: { width: 300, height: 300 },
    },
    {
      src: Speaker,
      alt: "Loa",
      pieces: 1,
      basePosition: { top: "0%", left: "0%" },
      size: { width: 300, height: 200 },
    },
  ];

  return (
    <div className="relative w-[100%] h-[500px] mx-auto">
      {/* Calendar in the center */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          isLoaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          width: "650px",
          height: "700px",
          filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.2))",
        }}
      >
        <motion.div
          className="relative w-full h-full hover:scale-105 transition-transform duration-300"
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image
              src={Calendar}
              alt="Lịch"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image
              src={Piece2}
              alt="Tua rua 2"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <Image
              src={Piece}
              alt="Tua rua 1"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </motion.div>
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
