"use client";

import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import type { RadioGroupProps } from "antd";

interface RadioCustomGroupProps extends RadioGroupProps {
  options: { label: string; value: string }[];
  value?: string;
  width?: string;
  height?: string;
  onChange?: (e: RadioChangeEvent) => void;
  className?: string;
}

const RadioCustomCircleGroup: React.FC<RadioCustomGroupProps> = ({
  options,
  value,
  onChange,
  className,
  width = "w-36",
  height = "h-10",
  ...props
}) => {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      {...props}
      className={`flex gap-4 ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer p-[2px] rounded-md bg-primary-gradient input-glow-border ${width} ${height} `}
          >
            <div
              className={`bg-white w-full h-full rounded-md flex items-center px-3 gap-2 hover:opacity-90 ${
                isSelected ? " text-black shadow-md" : "text-primary"
              }`}
            >
              {/* Vòng tròn chọn */}
              <span
                className={`w-3.5 h-3.5 flex-shrink-0 border-2 rounded-full ${
                  isSelected ? "bg-primary border-primary" : "border-gray-400"
                }`}
              />
              <span className="text-sm">{option.label}</span>
            </div>
            {/* Hidden Radio */}
            <Radio value={option.value} className="hidden" />
          </label>
        );
      })}
    </Radio.Group>
  );
};

export default RadioCustomCircleGroup;
