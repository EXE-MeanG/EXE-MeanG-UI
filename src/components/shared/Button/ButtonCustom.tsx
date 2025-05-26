import React from "react";
import { Button, ButtonProps } from "antd";
import Image from "next/image";
interface ButtonCustomProps extends ButtonProps {
  type?: "primary" | "default" | "dashed" | "text" | "link" | undefined;
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
  htmlType,
}) => {
  return (
    <Button
      className={`w-48 relative rounded-lg bg-[#182D33]  bg-custom-gradient border-none  
      overflow-hidden hover:opacity-70  hover:!bg-custom-gradient hover:border-none hover:!text-primary ${className}`}
      type={type}
      onClick={onClick}
      loading={loading}
      htmlType={htmlType}
      disabled={disabled}
    >
      <div className="stroke-wrapper z-10 w-full h-full absolute overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-85 mix-blend-lighten blur-sm animate-diagonalMove"
          style={{ animationDelay: "3.8s", zIndex: 10 }}
        ></div>
      </div>
      <div className="mask-background absolute bg-white w-full h-full opacity-60"></div>
      <div className="content z-10">{children}</div>
    </Button>
  );
};

export default ButtonCustom;
