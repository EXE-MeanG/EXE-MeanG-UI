"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/src/assets/logos/main-logo.png";
const Header = () => {
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
    </header>
  );
};

export default Header;
