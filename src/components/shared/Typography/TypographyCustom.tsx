"use client";

import React from "react";

interface TypographyCustomProps {
  text: string;
  size?: number;
}

const TypographyCustom: React.FC<TypographyCustomProps> = ({
  text,
  size = 48,
}) => {
  const width = text.length * size * 0.6;
  const height = size * 1.5;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradient quay */}
        <linearGradient
          id="animatedGradient"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#E6FAFF" />
          <stop offset="38%" stopColor="#B5C9D1" />
          <stop offset="54%" stopColor="#FFFFFF" />
          <stop offset="72%" stopColor="#C8DDE4" />
          <stop offset="100%" stopColor="#C8DDE4" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="0 0.5 0.5"
            to="360 0.5 0.5"
            dur="5s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* ✅ Shadow cho chữ */}
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="black"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      <text
        x="50%"
        y={height / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size}
        fontFamily="Arial, sans-serif"
        fill="url(#animatedGradient)"
        filter="url(#textShadow)"
      >
        {text}
      </text>
    </svg>
  );
};

export default TypographyCustom;
