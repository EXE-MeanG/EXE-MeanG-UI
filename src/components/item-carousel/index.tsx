import {
  Button,
  Carousel,
  GetProp,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from "antd";
import React, { useRef, useState } from "react";
import CardCustom2 from "../shared/Card2/cardCustom2";
import {
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import "./style.css";
import Image from "next/image";
import CardCustom from "../shared/Card/cardCustom";
import Plus from "@/src/assets/icons/plus.png";
import InputCustom from "../shared/Input/InputCustom";
import ButtonCustom from "../shared/Button/ButtonCustom";

interface ItemCarouselProps {
  type: "upper" | "downer" | "shoes";
  items: Array<{
    imageSrc: string;
    imageAlt: string;
    id?: string;
  }>;
  onUpload?: (type: string, file?: File, imageUrl?: string) => Promise<void>;
  selectedItem?: {
    imageSrc: string;
    imageAlt: string;
    id?: string;
  } | null;
  onSelectItem?: (item: {
    imageSrc: string;
    imageAlt: string;
    id?: string;
  }) => void;
}

function ItemCarousel({
  type,
  items,
  onUpload,
  selectedItem,
  onSelectItem,
}: ItemCarouselProps) {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef<any>(null);
  const [uploadOption, setUploadOption] = useState<"link" | "file" | null>(
    "link"
  );
  const next = () => {
    carouselRef.current.next();
  };
  const prev = () => {
    carouselRef.current.prev();
  };
  const [linkValue, setLinkValue] = useState<string>("");
  const uploadButton = (
    <CardCustom2 className="w-full h-full">
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={Plus}
            alt="plus"
            width={60}
            height={60}
            className="!text-6xl"
          />
          <span className="mt-2">{`Add ${type}`}</span>
        </div>
      )}
    </CardCustom2>
  );

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

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      if (onUpload && info.file.originFileObj) {
        await onUpload(type, info.file.originFileObj);
      }
    }
  };
  const handleuploadLink = async () => {
    if (!linkValue) {
      message.error("Please enter a valid link");
      return;
    }
    setLoading(true);
    try {
      if (onUpload) {
        await onUpload(type, undefined, linkValue);
      }
      setLinkValue("");
      setIsopen(false);
      message.success(`${type} uploaded successfully`);
    } catch (error) {
      message.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-carousel flex flex-1 gap-14">
      <LeftOutlined className="!text-4xl" onClick={prev} />
      <CardCustom2
        className="w-[179px] h-[179px]"
        onClick={() => setIsopen(true)}
      >
        {loading ? (
          <LoadingOutlined />
        ) : (
          <div className="flex flex-col items-center">
            <Image src={Plus} alt="plus" height={60} className="!text-6xl" />
            <span className="mt-2">{`Add ${type}`}</span>
          </div>
        )}
      </CardCustom2>
      <Modal
        open={isOpen}
        onCancel={() => setIsopen(false)}
        footer={null}
        width={600}
        centered
        title={"Tải lên hình ảnh của bạn bằng 1 trong 2 cách sau"}
        className="modal-custom"
      >
        <Radio.Group
          onChange={(e) => setUploadOption(e.target.value)}
          value={uploadOption}
          className="modal-option w-full flex flex-col gap-4"
        >
          <Radio value="link" className="modal-option__radio w-full">
            <div className="option w-full flex gap-3 items-center justify-center">
              <InputCustom
                disabled={uploadOption !== "link"}
                className="w-full h-[56px]"
                placeholder="Enter the link"
                onChange={(e) => setLinkValue(e.target.value)}
              />
              <ButtonCustom
                disabled={uploadOption !== "link"}
                className="!w-28 !h-10 shadow-md shadow-black  rounded-[10px]"
                onClick={handleuploadLink}
              >
                Xác nhận
              </ButtonCustom>
            </div>
          </Radio>

          <Radio value="file">
            <div className="option">
              <Upload
                name="avatar"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                disabled={uploadOption !== "file"}
              >
                <Button
                  disabled={uploadOption !== "file"}
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </div>
          </Radio>
        </Radio.Group>
      </Modal>
      <Carousel
        infinite
        dots={false}
        dotPosition="bottom"
        slidesToShow={4}
        className="!w-[900px] !h-[179px]"
        ref={carouselRef}
      >
        {items.map((item, index) => {
          const isSelected = selectedItem?.imageSrc === item.imageSrc;
          return (
            <div key={index} className="px-2 relative">
              <CardCustom
                cardSrc={item.imageSrc}
                cardAlt={item.imageAlt}
                cardWidth={100}
                cardHeight={100}
                className={`!w-[179px] !h-[179px] cursor-pointer transition-all ${
                  isSelected ? "opacity-95 scale-90" : ""
                }`}
                onClick={() => onSelectItem?.(item)}
              />
              {isSelected && (
                <div className="absolute top-2 right-11 z-20">
                  <CheckCircleFilled className="text-2xl text-primary !text-green-500" />
                </div>
              )}
            </div>
          );
        })}
      </Carousel>
      <RightOutlined className="!text-4xl" onClick={next} />
    </div>
  );
}

export default ItemCarousel;
