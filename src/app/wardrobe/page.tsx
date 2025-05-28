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
import { Col, GetProp, Row, Upload, UploadProps, message } from "antd";
import OutfitDump from "@/src/assets/outfit/o1.png";
import { uploadApi, CategoryEnum } from "@/src/apis/upload.api";
import { getUserItems } from "@/src/services/cloths";
import { useRouter } from "next/navigation";
import { developmentURL } from "@/src/apis/constraints";
import { useAuthStore } from "@/src/stores/authStore";
import { UploadOutlined } from "@ant-design/icons";

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
  id?: string;
}

interface CarouselItems {
  uppers: CarouselItem[];
  downers: CarouselItem[];
  ass: CarouselItem[];
}

interface SelectedItems {
  upper: CarouselItem | null;
  downer: CarouselItem | null;
  shoes: CarouselItem | null;
}

// Add type for getUserItems
type GetUserItemsFunction = () => Promise<ApiResponse>;
const getUserItemsTyped: GetUserItemsFunction = getUserItems;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default function Wardrobe() {
  const [generatedOutfit, setGeneratedOutfit] = useState("");
  const router = useRouter();
  const token = useAuthStore.getState().accessToken;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    upper: null,
    downer: null,
    shoes: null,
  });
  const [carouselItems, setCarouselItems] = useState<CarouselItems>({
    uppers: [],
    downers: [],
    ass: [],
  });
  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (!token) router.push("/login");
  }, []);
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

  const handleUpload = async (type: string, file?: File, imageUrl?: string) => {
    try {
      // Convert type string to CategoryEnum
      const categoryMap: { [key: string]: CategoryEnum } = {
        upper: "shirt",
        downer: "pants",
        shoes: "shoes",
      };

      const categoryEnum = categoryMap[type];
      if (!categoryEnum) {
        throw new Error("Invalid category type");
      }

      const result = await uploadApi.uploadItemImage({
        file,
        name: file ? file.name : "Default Name",
        imageUrl: imageUrl || "",
        categoryEnum,
      });

      setCarouselItems((prev) => {
        const typeMap: { [key: string]: keyof typeof prev } = {
          upper: "uppers",
          downer: "downers",
          shoes: "ass",
        };

        const key = typeMap[type];
        return {
          ...prev,
          [key]: [
            ...prev[key],
            {
              imageSrc: file ? URL.createObjectURL(file) : imageUrl,
              imageAlt: file ? file.name : "Uploaded Image",
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

  const handleItemSelect = (type: string, item: CarouselItem) => {
    setSelectedItems((prev) => ({
      ...prev,
      [type]: item,
    }));
  };

  const handleGenerateOutfit = async () => {
    if (!selectedItems.upper || !selectedItems.downer || !selectedItems.shoes) {
      message.warning("Please select one item from each category");
      return;
    }

    try {
      // Here you can call your API with the selected items
      const outfitData = {
        upperItem: selectedItems.upper,
        downerItem: selectedItems.downer,
        shoesItem: selectedItems.shoes,
      };

      // Call your API here
      // const response = await yourApi.generateOutfit(outfitData);
      message.success("Outfit generated successfully!");
    } catch (error) {
      message.error("Failed to generate outfit");
      console.error("Generate outfit error:", error);
    }
  };
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <div className="wardrobe min-h-screen w-100vw  ">
      <section className="bg-hero-pattern bg-cover bg-center">
        <Header />
        <div className="wardrobe_content px-[100px] py-[50px]">
          <TypographyCustom text="MIX & MATCH" size={80} />
          <div className="wardrobe_content__container flex justify-between items-start gap-11">
            <div className="wardrobe_content__container___model flex-1 flex flex-col items-center justify-center gap-2">
              <Upload
                name="image"
                action={`${developmentURL}api/v1/user/upload-body-image`}
                headers={{
                  Authorization: `Bearer ${token}`,
                }}
                beforeUpload={beforeUpload}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <div className="relative group">
                  <CardCustom
                    cardSrc={Model1.src}
                    cardWidth={411}
                    cardHeight={617}
                    className="w-[411px] h-[617px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <UploadOutlined className="text-4xl text-white mb-2" />
                    <span className="text-white text-xl font-semibold">
                      Tải lên hình ảnh của bạn
                    </span>
                  </div>
                </div>
              </Upload>
              <div className="flex gap-4">
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
                <ButtonDiscCustom
                  onClick={handleGenerateOutfit}
                  disabled={
                    !selectedItems.upper ||
                    !selectedItems.downer ||
                    !selectedItems.shoes
                  }
                >
                  <Image
                    src={Plus}
                    alt="plus"
                    width={24}
                    height={24}
                    className="mr-2"
                  />{" "}
                  Generate Outfit
                </ButtonDiscCustom>
              </div>
              <ModalEvent isOpen={isOpen} handleCancle={handleClose} />
            </div>
            <div className="wardrobe_content__container___items flex flex-col gap-10 ">
              <ItemCarousel
                type="upper"
                items={carouselItems.uppers}
                onUpload={handleUpload}
                selectedItem={selectedItems.upper}
                onSelectItem={(item) => handleItemSelect("upper", item)}
              />
              <ItemCarousel
                type="downer"
                items={carouselItems.downers}
                onUpload={handleUpload}
                selectedItem={selectedItems.downer}
                onSelectItem={(item) => handleItemSelect("downer", item)}
              />
              <ItemCarousel
                type="shoes"
                items={carouselItems.ass}
                onUpload={handleUpload}
                selectedItem={selectedItems.shoes}
                onSelectItem={(item) => handleItemSelect("shoes", item)}
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
                cardSrc={Model1.src}
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
                    cardSrc={OutfitDump.src}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump.src}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump.src}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump.src}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump.src}
                    cardAlt="outfit-dump"
                    className="w-[290px] h-[290px] "
                    cardWidth={200}
                    cardHeight={200}
                  />
                </Col>
                <Col span={8}>
                  <CardCustom
                    cardSrc={OutfitDump.src}
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
