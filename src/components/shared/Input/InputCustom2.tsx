"use client";

import React from "react";
import { Input, InputProps } from "antd";
import "./InputCustom.css";

interface InputCustomProps2 extends InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCustom2: React.FC<InputCustomProps2> = ({
  value,
  placeholder,
  onChange,
  className,
  ...props
}) => {
  return (
    <div
      className={`relative p-[2px] rounded-md overflow-hidden   w-64 ${className} bg-red-950`}
    >
      <div className=" h-full w-full rounded-md hover:opacity-90">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-full w-full border-none  text-primary !bg-example-pattern
          placeholder-white placeholder:font-semibold px-4 focus:ring-0 focus:outline-none focus:bg-white hover:bg-white text-3xl "
        />
      </div>
    </div>
  );
};

export default InputCustom2;
