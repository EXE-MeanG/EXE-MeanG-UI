"use client";

import { motion } from "framer-motion";
import Header from "../components/layouts/Header";
import TypographyCustom from "../components/shared/Typography/TypographyCustom";

export default function Home() {
  return (
    <div className="h-[4000px]">
      <section className="h-[700px] bg-hero-pattern bg-cover bg-center">
        <Header />
        <div className="  flex items-center justify-center h-full px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="min-w-2xl flex flex-col items-center justify-center text-center"
          >
            <TypographyCustom text="Your fashionista!" size={100} />
            <p className="text-4xl text-tertiary mb-6 inline-block w-[80%]">
              Chuyên gia tư vấn thời trang chuyên nghiệp dành riêng cho bạn.
              Giúp bạn kết hợp và tạo nên phong cách cá nhân của mình..
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Bắt đầu ngay
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
