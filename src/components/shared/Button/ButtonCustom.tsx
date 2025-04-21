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
      className={`w-48 relative rounded-lg bg-[#182D33]  bg-custom-gradient ${className} overflow-hidden`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      <div className="stroke-wrapper z-10 w-full h-full absolute overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-32 h-1 bg-white opacity-85 mix-blend-lighten blur-sm animate-diagonalMove"
          style={{ animationDelay: "3.8s", zIndex: 10 }}
        ></div>
      </div>
      <div className="mask-background absolute bg-white w-full h-full opacity-60"></div>
      <Image
        src={Spakle}
        alt="logo"
        width={20}
        height={20}
        className="absolute z-10 right-[-10px] top-[-7px] w-5 h-5 animate-sparkle pointer-events-none"
      />
      <div className="content z-10">{children}</div>
    </Button>
  );
};

export default ButtonCustom;
