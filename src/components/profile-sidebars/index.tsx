"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./style.css";

const items = [
  { key: "profile", icon: <UserOutlined />, label: "Hồ sơ cá nhân" },
  { key: "security", icon: <LockOutlined />, label: "Bảo Mật" },
  { key: "notifications", icon: <BellOutlined />, label: "Thông báo" },
];

export default function Sidebar({
  onSelect,
}: {
  onSelect: (key: string) => void;
}) {
  const [selectedKey, setSelectedKey] = useState("profile");
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightTop, setHighlightTop] = useState(0);

  // Cập nhật vị trí highlight
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeItem = container.querySelector(
      `.ant-menu-item-selected`
    ) as HTMLElement;

    if (activeItem) {
      setHighlightTop(activeItem.offsetTop);
    }
  }, [selectedKey]);

  return (
    <div className="menu-container relative h-[773px]" ref={containerRef}>
      {/* Highlight background */}
      <div
        className="absolute left-0 w-full h-[70px] bg-[#e6f4ff] rounded-md transition-all duration-300 z-0"
        style={{ top: highlightTop }}
      />
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={({ key }) => {
          setSelectedKey(key);
          onSelect(key);
        }}
        className="w-[284px] relative z-10 custom-menu"
      />
    </div>
  );
}
