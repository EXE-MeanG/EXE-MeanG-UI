"use client";
import Header from "@/src/components/layouts/Header";
import CardCustom from "@/src/components/shared/Card/cardCustom";
import TypographyCustom from "@/src/components/shared/Typography/TypographyCustom";
import Model1 from "@/src/assets/model/model1.png";
import { useState, useEffect } from "react";
import ItemCarousel from "@/src/components/item-carousel";
import ButtonDiscCustom from "@/src/components/shared/ButtonDIsc/discCustom";
import Image from "next/image";
import Plus from "@/src/assets/icons/plus.png";
import ModalEvent from "@/src/components/shared/ModalEvent/modalEvent";
import InputCustom2 from "@/src/components/shared/Input/InputCustom2";
import { Col, Row, message } from "antd";
import OutfitDump from "@/src/assets/outfit/o1.png";
import { uploadApi, CategoryEnum } from "@/src/apis/upload.api";
import { getUserItems } from "@/src/services/cloths";

interface ApiItem {
  _id: string;
  user: string;
  name: string;
  category_enum: "shirt" | "pants" | "shoes";
  imageLink: string;
  outfit: any[];
  is_favorite: boolean;
  create_at: string;
  update_at: string;
  __v: number;
}

interface ApiResponse {
  httpStatusCode: number;
  data: ApiItem[];
}

interface CarouselItem {
  imageSrc: string;
  imageAlt: string;
}

interface CarouselItems {
  uppers: CarouselItem[];
  downers: CarouselItem[];
  ass: CarouselItem[];
}

// Add type for getUserItems
type GetUserItemsFunction = () => Promise<ApiResponse>;
const getUserItemsTyped: GetUserItemsFunction = getUserItems;

export default function Wardrobe() {
  const [isOpen, setIsOpen] = useState(false);
  const [carouselItems, setCarouselItems] = useState<CarouselItems>({
    uppers: [],
    downers: [],
    ass: [],
  });

  useEffect(() => {
    const fetchItems = async () => {
      const apiData: ApiResponse = await getUserItemsTyped();
      const transformedData: CarouselItems = {
        uppers: (apiData.data || [])
          .filter((item) => item.category_enum === "shirt")
          .map((item) => ({
            imageSrc: item.imageLink,
            imageAlt: item.name,
          })),
        downers: (apiData.data || [])
          .filter((item) => item.category_enum === "pants")
          .map((item) => ({
            imageSrc: item.imageLink,
            imageAlt: item.name,
          })),
        ass: (apiData.data || [])
          .filter((item) => item.category_enum === "shoes")
          .map((item) => ({
            imageSrc: item.imageLink,
            imageAlt: item.name,
          })),
      };
      setCarouselItems(transformedData);
    };

    fetchItems();
  }, []); // Empty dependency array means this runs once on mount

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleUpload = async (type: string, file: File) => {
    try {
      // Convert type string to CategoryEnum
      const categoryMap: { [key: string]: CategoryEnum } = {
        upper: "shirt",
        downer: "pants",
        accessories: "accessory",
      };

      const categoryEnum = categoryMap[type];
      if (!categoryEnum) {
        throw new Error("Invalid category type");
      }

      const result = await uploadApi.uploadItemImage({
        file,
        name: file.name.split(".")[0],
        categoryEnum,
      });

      // Create a URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);

      // Update the carousel items based on type
      setCarouselItems((prev) => {
        const typeMap: { [key: string]: keyof typeof prev } = {
          upper: "uppers",
          downer: "downers",
          accessories: "ass",
        };

        const key = typeMap[type];
        return {
          ...prev,
          [key]: [
            ...prev[key],
            {
              imageSrc: imageUrl,
              imageAlt: file.name,
            },
          ],
        };
      });

      message.success(`${type} uploaded successfully`);
      return result;
    } catch (error) {
      message.error("Failed to upload image");
      console.error("Upload error:", error);
    }
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
              <ItemCarousel
                type="upper"
                items={carouselItems.uppers}
                onUpload={handleUpload}
              />
              <ItemCarousel
                type="downer"
                items={carouselItems.downers}
                onUpload={handleUpload}
              />
              <ItemCarousel
                type="accessories"
                items={carouselItems.ass}
                onUpload={handleUpload}
              />
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
