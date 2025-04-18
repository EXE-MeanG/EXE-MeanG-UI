"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-8 shadow-md bg-transparent ">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">MyLogo</Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex gap-8">
        <Link
          href="/"
          className="text-secondary text-lg font-semibold hover:text-white"
        >
          Trang chủ
        </Link>
        <Link
          href="/about"
          className="text-secondary text-lg font-semibold hover:text-white"
        >
          Giới thiệu
        </Link>
        <Link
          href="/services"
          className="text-secondary text-lg font-semibold hover:text-white"
        >
          Dịch vụ
        </Link>
        <Link
          href="/contact"
          className="text-secondary text-lg font-semibold hover:text-white"
        >
          Liên hệ
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 border rounded-md text-gray-700 hover:border-blue-600 hover:text-blue-600"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Đăng ký
        </Link>
      </div>
    </header>
  );
};

export default Header;
