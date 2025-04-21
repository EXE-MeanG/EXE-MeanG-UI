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
        <linearGradient
          id="animatedGradient"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#E6FAFF" /> {/* Sáng hơn #DAF1F8 */}
          <stop offset="38%" stopColor="#B5C9D1" /> {/* Sáng hơn #A4B7BE */}
          <stop offset="54%" stopColor="#FFFFFF" /> {/* Giữ nguyên trắng */}
          <stop offset="72%" stopColor="#C8DDE4" /> {/* Sáng hơn #B6CBD2 */}
          <stop offset="100%" stopColor="#C8DDE4" /> {/* Sáng hơn #B6CBD2 */}
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="0 0.5 0.5"
            to="360 0.5 0.5"
            dur="5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y={height / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size}
        fontFamily="Arial, sans-serif"
        fill="url(#animatedGradient)"
      >
        {text}
      </text>
    </svg>
  );
};

export default TypographyCustom;
