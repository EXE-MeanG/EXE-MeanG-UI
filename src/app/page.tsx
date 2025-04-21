"use client";

import { motion } from "framer-motion";
import Header from "../components/layouts/Header";
import TypographyCustom from "../components/shared/Typography/TypographyCustom";
import ButtonCustom from "../components/shared/Button/ButtonCustom";
import Image from "next/image";
import Item from "@/src/assets/items/tagitem.png";
import DiscCustom from "../components/shared/Disc/discCustom";
import CardCustom from "../components/shared/Card/cardCustom";
import Image1 from "@/src/assets/images/image1.png";
import Image2 from "@/src/assets/images/image2.png";
import Image3 from "@/src/assets/images/image3.png";
export default function Home() {
  return (
    <div className="h-[4000px]">
      <section className="h-[800px] max-w-[100vw] bg-hero-pattern bg-cover bg-center">
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
            <ButtonCustom className="font-semibold text-xl w-[328px] h-[79px] ">
              Try MEANG
            </ButtonCustom>
          </motion.div>
        </div>
      </section>
      <section className="video-introduction min-h-[1000px] max-w-[100vw] pattern bg-cover bg-center ">
        <div className="header">
          <Image
            className="w-full h-90%"
            src={Item} // Thay đổi đường dẫn đến hình ảnh của bạn
            alt="Tag Item"
          />
        </div>
        <div className=" flex mt-[100px] justify-center items-center h-[600px] px-16  gap-24">
          <div className="introduction">
            <video
              src="./moimoi.MP4"
              controls
              autoPlay
              muted
              className="w-[1020px] h-[600px]"
            ></video>
          </div>
          <div className="description">
            <ul className="uppercase">
              <li className="flex items-center gap-8 mb-12 mt-12 ">
                <DiscCustom
                  iconSrc="/items/stair.png"
                  iconAlt="stair"
                  iconSize={30}
                  className="w-20 h-20 flex-shrink-0"
                />
                <p className="text-2xl font-semibold">
                  sắp xếp trang phục thông minh
                </p>
              </li>
              <li className="flex items-center gap-8 mb-12">
                <DiscCustom
                  iconSrc="/items/chip.png"
                  iconAlt="chip"
                  iconSize={30}
                  className="w-20 h-20 flex-shrink-0"
                />
                <p className="text-2xl font-semibold">
                  dễ dàng phối đồ và theo dõi tất cả món đồ trong tủ
                </p>
              </li>
              <li className="flex items-center gap-8 mb-12">
                <DiscCustom
                  iconSrc="/items/face.png"
                  iconAlt="face"
                  iconSize={30}
                  className="w-20 h-20 flex-shrink-0"
                />
                <p className="text-2xl font-semibold">
                  luôn có outfit phù hợp cho mọi trường hợp
                </p>
              </li>
              <li className="flex items-center gap-8 ">
                <DiscCustom
                  iconSrc="/items/kitchen.png"
                  iconAlt="kitchen"
                  iconSize={30}
                  className="w-20 h-20 flex-shrink-0"
                />
                <p className="text-2xl font-semibold">
                  tối ưu hóa tủ đồ và tránh mua sắm lãng phí
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="ai-introduction h-[1000px] max-w-[100vw] bg-example-pattern bg-exa bg-center bg-cover flex flex-col items-center justify-center gap-32 bg-red-400 ">
        <div className="example-pictures flex flex-col items-center justify-center gap-32">
          <div className="example-pictures-wrapper flex items-center justify-center h-full ">
            <motion.div
              initial={{ y: 50, rotate: -15 }}
              animate={{
                y: [50, 20, 50],
                rotate: -15,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <CardCustom
                cardSrc={Image1}
                cardAlt="image1"
                cardWidth={331}
                cardHeight={436}
                className="w-[331px] h-[436px]"
              />
            </motion.div>
            <motion.div
              initial={{ y: 50 }}
              animate={{
                y: [50, 0, 50],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <CardCustom
                cardSrc={Image2}
                cardAlt="image1"
                cardWidth={331}
                cardHeight={436}
                className="w-[331px] h-[436px]"
              />
            </motion.div>
            <motion.div
              initial={{ y: 50, rotate: 15 }}
              animate={{
                y: [50, 20, 50],
                rotate: 15,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <CardCustom
                cardSrc={Image3}
                cardAlt="image1"
                cardWidth={331}
                cardHeight={436}
                className="w-[331px] h-[436px]"
              />
            </motion.div>
          </div>
          <div className="blur-[40px] backdrop-blur-md bg-black w-[537px] h-[62px] rounded-[50%] "></div>
        </div>
        <div className="example-description flex flex-col items-center justify-center">
          <p className="text-3xl text-primary mb-6  w-[64%] text-center">
            Ứng dụng quản lý tủ quần áo cá nhân nay còn thông minh hơn với tính
            năng AI tự động phối đồ cho bạn mỗi khi cần gấp! Chỉ cần nhập hoàn
            cảnh như đi làm, đi chơi hay dự tiệc, AI sẽ ngay lập tức gợi ý
            outfit phù hợp từ chính tủ đồ của bạn.
          </p>
        </div>
      </section>
    </div>
  );
}
