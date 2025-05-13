"use client";

import React from "react";
import { DatePicker, DatePickerProps } from "antd";
import "./InputCustom.css"; // dùng lại hiệu ứng glow nếu có

interface DatePickerCustomProps extends DatePickerProps {
  className?: string;
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
  value,
  onChange,
  placeholder,
  className,
  ...props
}) => {
  return (
    <div
      className={`relative p-[2px] rounded-md overflow-hidden bg-primary-gradient input-glow-border w-64 ${className}`}
    >
      <div className="bg-primary h-full w-full rounded-md hover:opacity-90">
        <DatePicker
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-full w-full border-none text-primary 
            placeholder-gray-400 px-4 focus:ring-0 focus:outline-none focus:bg-white hover:bg-white rounded-md"
          {...props}
        />
      </div>
    </div>
  );
};

export default DatePickerCustom;
