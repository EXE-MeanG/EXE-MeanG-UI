import { RightOutlined } from "@ant-design/icons";
import React from "react";
interface BoxDiscProps {
  title: string;
  className?: string;
}
function BoxDisc({ title, className }: BoxDiscProps) {
  return (
    <div
      className={`box-disc my-3 p-1 wrapper relative rounded-md overflow-hidden bg-primary-gradient input-glow-border ${className}`}
    >
      <div className="p-4 profile-notification_item bg-white flex justify-between">
        <span className="box-disc_title">{title}</span>
        <RightOutlined />
      </div>
    </div>
  );
}

export default BoxDisc;
