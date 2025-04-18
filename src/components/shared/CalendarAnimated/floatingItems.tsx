"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";

// Generate fixed positions around a base position
function generateFixedPositions(
  count: number,
  basePosition: { top: string; left: string }
) {
  const positions = [];

  // Convert percentage strings to numbers
  const baseTop = Number.parseFloat(basePosition.top);
  const baseLeft = Number.parseFloat(basePosition.left);

  // Calculate fixed positions in a circular pattern
  for (let i = 0; i < count; i++) {
    // Evenly distribute angles around a circle
    const angle = (i / count) * Math.PI * 2;

    // Fixed distance from center
    const distance = 5; // percentage units

    const offsetTop = Math.sin(angle) * distance;
    const offsetLeft = Math.cos(angle) * distance;

    positions.push({
      top: `${baseTop + offsetTop}%`,
      left: `${baseLeft + offsetLeft}%`,
      // Fixed rotation based on position
      rotate: `${i * (360 / count)}deg`,
      // Slightly varied animation duration
      duration: 4 + (i % 2),
      // Staggered animation delay
      delay: i * 0.5,
      // Fixed scale
      scale: 1,
    });
  }

  return positions;
}

interface FloatingItemProps {
  src: string | StaticImageData;
  alt: string;
  pieces: number;
  basePosition: { top: string; left: string };
  size: { width: number; height: number };
  delay: number;
  isLoaded: boolean;
}

export default function FloatingItem({
  src,
  alt,
  pieces,
  basePosition,
  size,
  delay,
  isLoaded,
}: FloatingItemProps) {
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    // Generate fixed positions when component mounts
    setPositions(generateFixedPositions(pieces, basePosition));
  }, [pieces, basePosition]);

  return (
    <>
      {positions.map((position, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: position.top,
            left: position.left,
            transform: `rotate(${position.rotate}) scale(${position.scale})`,
            width: `${size.width * position.scale}px`,
            height: `${size.height * position.scale}px`,
            animation: `float ${position.duration}s infinite ease-in-out ${
              delay + position.delay
            }s`,
            zIndex: 5,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(${Math.random() * 10}deg)
              scale(${0.7 + Math.random() * 0.3});
          }
          50% {
            transform: translateY(-15px) rotate(${Math.random() * 20 - 10}deg)
              scale(${0.8 + Math.random() * 0.2});
          }
        }
      `}</style>
    </>
  );
}
