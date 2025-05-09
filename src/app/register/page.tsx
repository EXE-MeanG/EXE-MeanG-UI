"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/src/assets/logos/main-logo.png";
import InputCustom from "@/src/components/shared/Input/InputCustom";
import InputPasswordCustom from "@/src/components/shared/Input/InputPasswordCustom";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import Spakle from "@/src/assets/images/star.png";
import { motion } from "framer-motion";

export default function Register() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  return (
    <div className="min-h-screen w-full bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="p-6 absolute top-0 left-0 right-0 ">
        <Image src={Logo} alt="MeanG" width={200} height={90} />
      </div>

      {/* Register box */}
      <div className="register-content w-[50%] bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>

        {/* Tabs with animated underline */}
        <div className="relative w-[40%] mb-6">
          <div className="flex justify-between text-sm font-medium relative">
            <button
              className={`w-1/2 pb-2 ${
                activeTab === "phone" ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("phone")}
            >
              Số điện thoại
            </button>
            <button
              className={`w-1/2 pb-2 ${
                activeTab === "email" ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("email")}
            >
              Email
            </button>
          </div>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-black w-1/2"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              left: activeTab === "email" ? "50%" : "0%",
            }}
          />
        </div>

        {/* Form content */}
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <InputCustom placeholder="Tên của bạn" className="w-[40%] h-[56px]" />
          {activeTab === "phone" ? (
            <InputCustom
              placeholder="Số điện thoại của bạn"
              className="w-[40%] h-[56px]"
            />
          ) : (
            <InputCustom
              placeholder="Email của bạn"
              className="w-[40%] h-[56px]"
            />
          )}
          <InputPasswordCustom
            placeholder="Mật khẩu"
            className="w-[40%] h-[56px]"
          />
          <InputPasswordCustom
            placeholder="Xác nhận mật khẩu"
            className="w-[40%] h-[56px]"
          />
          <div className="sparkle relative w-[40%] h-[56px] font-semibold mt-2">
            <ButtonCustom className="w-full h-full font-semibold mt-2 ">
              Đăng ký
            </ButtonCustom>
            <Image
              src={Spakle}
              alt="logo"
              // width={20}
              // height={20}
              className="absolute z-10 right-[-10px] top-[-7px] w-8 h-8 animate-sparkle pointer-events-none"
            />
          </div>

          <p className="text-sm text-quaternary text-center mt-2">
            Bạn đã có tài khoản?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
