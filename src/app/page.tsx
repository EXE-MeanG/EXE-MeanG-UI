"use client";

import { motion } from "framer-motion";
import Header from "../components/layouts/Header";
import TypographyCustom from "../components/shared/Typography/TypographyCustom";
import ButtonCustom from "../components/shared/Button/ButtonCustom";
import Image from "next/image";
import Item from "@/src/assets/items/tagitem.png";
import Item2 from "@/src/assets/items/tagitem2.png";
import DiscCustom from "../components/shared/Disc/discCustom";
import CardCustom from "../components/shared/Card/cardCustom";
import Image1 from "@/src/assets/images/image1.png";
import Image2 from "@/src/assets/images/image2.png";
import Image3 from "@/src/assets/images/image3.png";
import Team from "@/src/assets/images/team.png";
import Icon1 from "@/src/assets/icons/shoppe.png";
import Icon2 from "@/src/assets/icons/lazada.png";
import Icon3 from "@/src/assets/icons/taobuy.png";
import Line from "@/src/assets/items/line.png";
import Spakle from "@/src/assets/images/star.png";

import CalendarAnimation from "../components/shared/CalendarAnimated";
import Link from "next/link";
import Footer from "../components/layouts/Footer";
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
            <p className="text-4xl text-primary font-semibold mb-6 inline-block w-[64%] text-shadow-md ">
              Chuyên gia tư vấn thời trang chuyên nghiệp dành riêng cho bạn.
              Giúp bạn kết hợp và tạo nên phong cách cá nhân của mình..
            </p>
            <div className="sparkle relative">
              <ButtonCustom className="font-semibold text-4xl w-[328px] h-[79px] ">
                Try MEANG
              </ButtonCustom>
              <Image
                src={Spakle}
                alt="logo"
                // width={20}
                // height={20}
                className="absolute z-10 right-[-10px] top-[-7px] w-8 h-8 animate-sparkle pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="video-introduction min-h-[1000px] max-w-[100vw] pattern bg-cover bg-center">
        <div className="video-introduction-header">
          <Image
            className="w-full h-90%"
            src={Item} // Thay đổi đường dẫn đến hình ảnh của bạn
            alt="Tag Item"
          />
        </div>
        <div className=" video-introduction-content flex mt-[100px] justify-center items-center h-[600px] px-16  gap-24">
          <video
            src="./moimoi.MP4"
            controls
            autoPlay
            muted
            className="w-[1020px] h-[600px]"
          ></video>
          <div className="video-introduction-description">
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
      <section className="ai-introduction h-[1000px] max-w-[100vw] bg-example-pattern bg-exa bg-center bg-cover flex flex-col items-center justify-center gap-32 ">
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
      <section className="calendar-mix-match min-h-[1000px]  max-w-[100vw] pattern bg-cover bg-center ">
        <Image
          className="calendar-mix-match-content w-full h-100%"
          src={Item2} // Thay đổi đường dẫn đến hình ảnh của bạn
          alt="Tag Item"
        />
        <div className="calendar-mix-match-description flex items-center justify-center gap-32 p-16">
          <div className="calendar-mix-match-description-content flex items-center flex-1 justify-center h-full ">
            <CalendarAnimation />
          </div>
          <div className="calendar-mix-match-description-header flex flex-col flex-1 items-start justify-center mt-[100px]">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2592B9] to-[#DAF1F8] bg-clip-text text-transparent text-start">
              Calendar mix & match
            </h1>
            <Link
              href={"#"}
              className="text-6xl text-primary font-bold mb-6 w-[56%] text-start hover:text-[#2592B9]"
            >
              Ứng dụng quản lý tủ quần áo nay có thêm.
            </Link>
            <p className="text-3xl text-primary font-semibold mb-6 w-[70%] text-start">
              Tính năng lên lịch phối đồ, giúp bạn chuẩn bị sẵn outfit cho cả
              tuần hoặc những ngày quan trọng mà không cần vội vàng. Bạn có thể
              lên kế hoạch trước cho các sự kiện như buổi họp quan trọng, tiệc
              sinh nhật hay chuyến du lịch.{" "}
            </p>
          </div>
        </div>
      </section>
      <section className="e-commerce min-h-[500px] flex flex-col items-center justify-center  max-w-[100vw] bg-hero-pattern bg-cover bg-center p-16 gap-12">
        <Link href={"#"} className="e-commerce-header">
          <TypographyCustom text="Liên Kết Thương Mại Điện Tử" size={80} />
        </Link>
        <div className="e-commerce-icon-list flex items-center justify-center gap-3 ">
          <Link href={"#"} className="e-commerce-header">
            <DiscCustom iconSrc={Icon1.src} iconSize={100} iconAlt="shoppe" />
          </Link>
          <Image src={Line} alt="line" width={200} height={200} />
          <Link href={"#"} className="e-commerce-header">
            <DiscCustom iconSrc={Icon2.src} iconSize={90} iconAlt="lazada" />
          </Link>

          <Link href={"#"} className="e-commerce-header">
            <Image src={Line} alt="line" width={200} height={200} />
          </Link>
          <DiscCustom iconSrc={Icon3.src} iconSize={100} iconAlt="taobao" />
        </div>
        <div className="e-commerce-description flex flex-col items-center justify-center">
          <p className="text-3xl text-white mb-6  w-[77%] text-center">
            Tính năng này giúp người dùng tìm và mua món đồ còn thiếu để hoàn
            thiện outfit. Khi chọn một set đồ nhưng thiếu một item (như giày, áo
            khoác...), hệ thống AI sẽ đề xuất sản phẩm phù hợp từ các trang
            thương mại điện tử, dựa trên phong cách, màu sắc và ngân sách cá
            nhân.
          </p>
        </div>
      </section>
      <section className="about-us min-h-[1000px] flex flex-col items-center justify-center  max-w-[100vw]  bg-cover bg-center p-16 gap-12">
        <TypographyCustom text="VỀ CHÚNG TÔI" size={80} />
        <div className="about-us-card relative flex items-center justify-center gap-32">
          <CardCustom
            cardSrc={Team}
            cardAlt="image1"
            cardWidth={1450}
            cardHeight={782}
            className="w-[1442px] h-[782px]"
          />
          <p className="absolute bottom-0 left-10 text-3xl text-primary font-semibold mb-6 w-[70%] text-start">
            Chúng tôi là một nhóm sinh viên từ Đại học FPT Đà Nẵng, và đây là dự
            án khởi nghiệp đầu tiên đánh dấu hành trình của chúng tôi.  MeanG
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
