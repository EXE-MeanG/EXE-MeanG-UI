import React from "react";
import { Button } from "antd";
import Spakle from "@/src/assets/images/star.png";
import Image from "next/image";
interface ButtonCustomProps {
  type?: "primary" | "default" | "dashed" | "text" | "link";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  type = "default",
  onClick,
  disabled = false,
  loading = false,
  children,
  className = "",
}) => {
  return (
    <Button
      className={`w-48 relative bg-[#182D33]  bg-custom-gradient ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      <div className="stroke-wrapper w-full h-full absolute overflow-hidden">
        <div
          className="absolute top-0 left-0 w-32 h-1 bg-white opacity-50 mix-blend-lighten blur-sm animate-diagonalMove"
          style={{ animationDelay: "3.8s", zIndex: 10 }}
        ></div>
      </div>

      <Image 
        src={Spakle}
        alt="logo"
        width={20}
        height={20}
        className="absolute right-[-10px] top-[-7px] w-5 h-5 animate-sparkle pointer-events-none"
      />
      {children}
    </Button>
  );
};

export default ButtonCustom;
