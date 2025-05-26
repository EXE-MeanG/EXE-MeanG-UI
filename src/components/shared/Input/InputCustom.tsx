"use client";

import React from "react";
import { Input, InputProps } from "antd";
import "./InputCustom.css";

interface InputCustomProps extends InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCustom: React.FC<InputCustomProps> = ({
  maxLength,
  type,
  value,
  placeholder,
  onChange,
  className,
  disabled,
  ...props
}) => {
  return (
    <div
      className={`relative p-[2px] rounded-md overflow-hidden bg-primary-gradient input-glow-border w-64 ${className} bg-red-950`}
    >
      <div className="bg-primary h-full w-full rounded-md hover:opacity-90">
        <Input
          min={0}
          disabled={disabled}
          maxLength={maxLength}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-full w-full border-none  text-primary 
          placeholder-gray-400 px-4 focus:ring-0 focus:outline-none focus:bg-white hover:bg-white  rounded-md"
        />
      </div>
    </div>
  );
};

export default InputCustom;
