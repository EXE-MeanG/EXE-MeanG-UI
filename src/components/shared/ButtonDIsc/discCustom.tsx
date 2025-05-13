"use client";

import React from "react";
import "./discCustom.css";

interface ButtonDiscCustomProps {
  width?: string; // ví dụ: "w-40" hoặc "w-[200px]"
  height?: string; // ví dụ: "h-12" hoặc "h-[50px]"
  className?: string; // custom class từ ngoài
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonDiscCustom: React.FC<ButtonDiscCustomProps> = ({
  width = "w-40",
  height = "h-12",
  className = "",
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden font-medium shadow-sm flex items-center justify-center glass-background ${width} ${height} ${className}`}
    >
      {/* Nền ánh sáng xoay */}
      <div className="absolute w-[1000px] h-[1000px] z-0 spin-light" />
      <div className="absolute inset-0  bg-white opacity-60 pointer-events-none z-10" />

      {/* Nội dung nút */}
      <div className="relative z-10 flex items-center gap-1">{children}</div>
    </button>
  );
};

export default ButtonDiscCustom;
