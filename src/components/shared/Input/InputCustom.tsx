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
  value,
  placeholder,
  onChange,
  className,
  ...props
}) => {
  return (
    <div
      className={`relative p-[2px] rounded-xl overflow-hidden bg-primary-gradient input-glow-border w-64 ${className} `}
    >
      <div className="bg-primary rounded-xl">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full border-none bg-transparent text-white 
          placeholder-gray-400 px-4 focus:ring-0 focus:outline-none focus:bg-transparent hover:bg-transparent hover:opacity-70"
        />
      </div>
    </div>
  );
};

export default InputCustom;
