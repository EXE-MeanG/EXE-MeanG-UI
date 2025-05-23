"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/src/assets/logos/main-logo.png";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, message } from "antd";
import { useRouter } from "next/navigation";

const Header = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storeUserName = localStorage.getItem("auth-storage");
    if (storeUserName) {
      const parse = JSON.parse(storeUserName);
      const name = parse?.state?.user?.username;
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-storage");
    setUserName("");
    message.success("Đăng xuất thành công");
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "Hồ sơ cá nhân",
      onClick: () => router.push("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
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
          href="/profile"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Hồ Sơ Cá Nhân
        </Link>
        <Link
          href="/wardrobe"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Tủ Đồ
        </Link>
        <Link
          href="/events"
          className="text-secondary not-italic text-xl font-semibold hover:text-white"
        >
          Lịch Trình
        </Link>
      </nav>

      {/* Auth Buttons */}
      {userName ? (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
          <div className="welcome-text text-secondary font-semibold text-xl flex gap-4 items-center cursor-pointer hover:text-white">
            <UserOutlined />
            <span>Xin chào {userName}</span>
          </div>
        </Dropdown>
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
