"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/src/assets/logos/main-logo.png";
import InputCustom from "@/src/components/shared/Input/InputCustom";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import Spakle from "@/src/assets/images/star.png";

export default function ResetPassword() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  return (
    <div className="min-h-screen w-full bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center px-4">
      <div className="p-6 absolute top-0 left-0 right-0 ">
        <Image src={Logo} alt="MeanG" width={200} height={90} />
      </div>

      <div className="reset-content w-[50%] bg-white p-8 rounded-xl shadow-md flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold ">Khôi Phục Mật Khẩu</h1>
        <p className="w-[50%] text-center text-md font-medium  mb-4">
          Nhập số điện thoại hoặc địa chỉ email của bạn và chúng tôi sẽ gửi cho
          bạn mã xác minh
        </p>
        {/* Tabs with animated underline */}

        {/* Form content */}
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <InputCustom
            placeholder="Email hoặc số điện thoại"
            className="w-[40%] h-[56px]"
          />
          <div className="sparkle relative w-[40%] h-[56px] font-semibold mt-2">
            <ButtonCustom className="w-full h-full font-semibold mt-2 ">
              Tiếp tục
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
            Quay lại trang{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
