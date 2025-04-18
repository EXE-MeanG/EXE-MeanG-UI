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
  const width = text.length * size * 0.6; // Tính chiều rộng của chữ
  const height = size * 1.5; // Chiều cao của SVG

  return (
    <svg
      width={width} // Cập nhật lại width sao cho phù hợp với kích thước chữ
      height={height}
      viewBox={`0 0 ${width} ${height}`} // Cập nhật lại viewBox sao cho phù hợp với kích thước chữ
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
          <stop offset="0%" stopColor="#DAF1F8" />
          <stop offset="38%" stopColor="#A4B7BE" />
          <stop offset="54%" stopColor="#FFFFFF" />
          <stop offset="72%" stopColor="#B6CBD2" />
          <stop offset="100%" stopColor="#B6CBD2" />
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
