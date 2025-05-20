"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/src/assets/logos/main-logo.png";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storeUserName = localStorage.getItem("auth-storage");
    if (storeUserName) {
      const parse = JSON.parse(storeUserName);
      const name = parse?.state?.user?.username;
      setUserName(name);
    }
  }, []);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/"}>Cài đặt tài khoảng</Link>,
    },
    {
      key: "2",
      label: <Link href={"/"}>Đăng Xuất</Link>,
    },
  ];
  return (
    <header className="w-full h-16 flex items-center justify-between px-8 shadow-2xl bg-transparent ">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 ">
        <Link href="/" className="flex items-center">
          <Image
            className="flex items-center"
            alt="Logo"
            src={Logo}
            width={200}
            height={200}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex gap-8">
        <Link
          href="/"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Trang chủ
        </Link>
        <Link
          href="/about"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Hồ Sơ Cá Nhân
        </Link>
        <Link
          href="/services"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Tủ Đồ
        </Link>
        <Link
          href="/contact"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Lịch Trình
        </Link>
      </nav>

      {/* Auth Buttons */}
      {userName ? (
        <div className="welcome-text text-secondary font-semibold text-xl flex gap-4 ">
          <UserOutlined />
          <span>Xin chào {userName}</span>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 border-r-2  text-secondary text-xl  hover:text-white"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="px-4 py-2  text-secondary text-xl  hover:text-white"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
