"use client";
import Header from "@/src/components/layouts/Header";
import CardCustom from "@/src/components/shared/Card/cardCustom";
import TypographyCustom from "@/src/components/shared/Typography/TypographyCustom";
import Model1 from "@/src/assets/model/model1.png";
import { useState } from "react";
import ItemCarousel from "@/src/components/item-carousel";
import ButtonDiscCustom from "@/src/components/shared/ButtonDIsc/discCustom";
import Image from "next/image";
import Plus from "@/src/assets/icons/plus.png";
import ModalEvent from "@/src/components/shared/ModalEvent/modalEvent";
import InputCustom2 from "@/src/components/shared/Input/InputCustom2";
import { Col, Row } from "antd";
import OutfitDump from "@/src/assets/outfit/o1.png";
export default function Wardrobe() {
  const dumpData = {
    uppers: [
      {
        imageSrc: "@/src/assets/upper/u1.png",
        imageAlt: "u1",
      },
      {
        imageSrc: "@/src/assets/upper/u2.png",
        imageAlt: "u2",
      },
      {
        imageSrc: "@/src/assets/upper/u3.png",
        imageAlt: "u3",
      },
      {
        imageSrc: "@/src/assets/upper/u4.png",
        imageAlt: "u4",
      },
      {
        imageSrc: "@/src/assets/upper/u5.png",
        imageAlt: "u5",
      },
    ],
    downers: [
      {
        imageSrc: "@/src/assets/downer/d1.png",
        imageAlt: "d1",
      },
      {
        imageSrc: "@/src/assets/downer/d2.png",
        imageAlt: "d2",
      },
      {
        imageSrc: "@/src/assets/downer/d3.png",
        imageAlt: "d3",
      },
      {
        imageSrc: "@/src/assets/downer/d4.png",
        imageAlt: "d4",
      },
      {
        imageSrc: "@/src/assets/downer/d5.png",
        imageAlt: "d5",
      },
    ],
    ass: [
      {
        imageSrc: "@/src/assets/ass/a1.png",
        imageAlt: "a1",
      },
      {
        imageSrc: "@/src/assets/ass/a2.png",
        imageAlt: "a2",
      },
      {
        imageSrc: "@/src/assets/ass/a3.png",
        imageAlt: "a3",
      },
      {
        imageSrc: "@/src/assets/ass/a4.png",
        imageAlt: "a4",
      },
      {
        imageSrc: "@/src/assets/ass/a5.png",
        imageAlt: "a5",
      },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <div className="wardrobe min-h-screen w-100vw  ">
      <section className="bg-hero-pattern bg-cover bg-center">
        <Header />
        <div className="wardrobe_content px-[100px] py-[50px]">
          <TypographyCustom text="MIX & MATCH" size={80} />
          <div className="wardrobe_content__container flex justify-between items-start">
            <div className="wardrobe_content__container___model flex-1 flex flex-col items-center justify-center gap-2">
              <CardCustom
                cardSrc={Model1}
                cardWidth={411}
                cardHeight={617}
                className="w-[411px] h-[617px]"
              />
              <ButtonDiscCustom onClick={handleOpen}>
                <Image
                  src={Plus}
                  alt="plus"
                  width={24}
                  height={24}
                  className="mr-2"
                />{" "}
                Đặt Lịch Hẹn
              </ButtonDiscCustom>
              <ModalEvent isOpen={isOpen} handleCancle={handleClose} />
            </div>
            <div className="wardrobe_content__container___items flex flex-col gap-10 ">
              <ItemCarousel />
              <ItemCarousel />
              <ItemCarousel />
            </div>
          </div>
        </div>
      </section>
      <section className="wardrobe_chat px-[100px] py-[50px] ">
        <TypographyCustom text="AI GENERATE" size={80} />
        <div className="wardrobe_chat__content w-full">
          <InputCustom2 className="w-full h-[90px] " placeholder="Tìm Kiếm" />
          <div className=" w-full wardrobe_chat__container my-20 flex justify-between items-start gap-40 ">
            <div className="wardrobe_chat__container___model flex flex-col items-center justify-center gap-2">
              <CardCustom
                cardSrc={Model1}
                cardWidth={411}
                cardHeight={617}
                className="w-[411px] h-[617px]"
              />
              <ButtonDiscCustom onClick={handleOpen}>
                <Image
                  src={Plus}
                  alt="plus"
                  width={24}
                  height={24}
                  className="mr-2"
                />{" "}
                Đặt Lịch Hẹn
              </ButtonDiscCustom>
              <ModalEvent isOpen={isOpen} handleCancle={handleClose} />
            </div>
            <div className="wardrobe_chat__items ">
              <Row gutter={[20, 50]}>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
