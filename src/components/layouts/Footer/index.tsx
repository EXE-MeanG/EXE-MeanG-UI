"use client";

import Image from "next/image";
import Logo from "@/src/assets/logos/main-logo.png";
import {
  FacebookOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-[#D9F5FF] text-[#0F0F0F] py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-black/40 pb-10">
        {/* Logo + social */}
        <div>
          <div className="mb-4">
            <Image src={Logo} alt="MeanG" width={200} height={130} />
          </div>
          <p className="font-semibold text-2xl mb-2">MẠNG XÃ HỘI</p>
          <div className="flex gap-3 text-xl">
            <FacebookOutlined />
            <XOutlined />
            <InstagramOutlined />
          </div>
        </div>

        {/* Kết nối */}
        <div>
          <h3 className="font-semibold mb-3 text-xl border-b-2 border-black inline-block pb-1">
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>
          <ul className="mt-3 space-y-2 list-disc list-inside text-md">
            <li>Về chúng tôi</li>
            <li>Dịch vụ</li>
            <li>Tư vấn</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Dịch vụ */}
        <div>
          <h3 className="font-semibold mb-3 border-b-2 text-xl border-black inline-block pb-1">
            DỊCH VỤ
          </h3>
          <ul className="mt-3 space-y-2 list-disc list-inside text-md">
            <li>Mix & Match</li>
            <li>Tủ đồ của bạn</li>
            <li>Gợi ý AI</li>
            <li>Liên kết TMĐT</li>
            <li>Lịch trình của bạn</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="font-semibold mb-3 border-b-2 text-xl border-black inline-block pb-1">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h3>
          <p className="text-md mb-4">
            Hãy để lại email của bạn để nhận được những ý tưởng thời trang mới
            và những thông tin, ưu đãi từ MeanG
          </p>
          <p className="text-md">
            Email:{" "}
            <a className="underline" href="mailto:meang6584@gmail.com.vn">
              meang6584@gmail.com.vn
            </a>
          </p>
          <p className="text-md">Hotline: 18007200</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-6 text-black/70">
        Việc sử dụng trang web này cho thấy bạn tuân thủ chính sách quyền riêng
        tư, điều khoản và điều kiện của chúng tôi
      </div>
    </footer>
  );
}
