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
import Plus from "../../assets/icons/plus.png";
import InputCustom from "../shared/Input/InputCustom";
import ButtonCustom from "../shared/Button/ButtonCustom";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";

export interface CarouselItem {
  imageSrc: string;
  imageAlt: string;
  id?: string;
}

interface ItemCarouselProps {
  type: "upper" | "downer" | "shoes";
  items: CarouselItem[];
  onUpload: (type: string, file?: File, imageUrl?: string) => Promise<void>;
  selectedItem: CarouselItem | null;
  onSelectItem: (item: CarouselItem) => void;
  renderItemActions?: (item: CarouselItem) => React.ReactNode;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
function ItemCarousel({
  type,
  items,
  onUpload,
  selectedItem,
  onSelectItem,
  renderItemActions,
}: ItemCarouselProps) {
  const carouselRef = useRef<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [linkValue, setLinkValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadOption, setUploadOption] = useState<"link" | "file" | null>(
    "link"
  );
  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  const handleUploadLink = async () => {
    if (!linkValue) {
      message.error("Please enter a valid link");
      return;
    }
    setIsUploading(true);
    setIsOpen(false);
    try {
      if (onUpload) {
        await onUpload(type, undefined, linkValue);
      }
      setLinkValue("");
      setIsOpen(false);
    } catch (error) {
    } finally {
      setIsUploading(false);
    }
  };
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Vui lòng chọn ảnh có định dạng JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh của bạn phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setIsOpen(false);
      setIsUploading(true);

      return;
    }
    if (info.file.status === "done") {
      setIsUploading(false);
      if (onUpload && info.file.originFileObj) {
        await onUpload(type, info.file.originFileObj);
      }
    }
  };
  return (
    <div className="w-full flex  gap-6">
      <div className="flex items-center justify-start">
        <CardCustom2
          className="!w-[179px] !h-[179px] cursor-pointer transition-all hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          {isUploading ? (
            <>
              <LoadingOutlined className="text-2xl mb-2" spin />
              <span className="text-gray-500">Đang tải lên...</span>
            </>
          ) : (
            <>
              <Image src={Plus} alt="plus" width={24} height={24} />
              <span className="mt-2 text-gray-500">Tải lên {type}</span>
            </>
          )}
        </CardCustom2>
      </div>

      <div className="item-carousel flex flex-1 gap-14 items-center">
        <LeftOutlined className="!text-4xl cursor-pointer" onClick={prev} />
        <Carousel
          dots={false}
          dotPosition="bottom"
          slidesToShow={4}
          className="!w-[900px] !h-[179px]"
          ref={carouselRef}
        >
          {items.map((item, index) => (
            <div key={index} className="px-2">
              <div className="relative">
                <CardCustom
                  cardSrc={item.imageSrc}
                  cardAlt={item.imageAlt}
                  cardWidth={179}
                  cardHeight={179}
                  className={`!w-[179px] !h-[179px] cursor-pointer transition-all hover:scale-105 ${
                    selectedItem?.imageSrc === item.imageSrc
                      ? "border-4 border-blue-500"
                      : ""
                  }`}
                  onClick={() => onSelectItem(item)}
                />
                {renderItemActions && renderItemActions(item)}
              </div>
            </div>
          ))}
        </Carousel>
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
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
                  className="!w-28 !h-10 shadow-md shadow-slate-500  !rounded-none"
                  onClick={handleUploadLink}
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
        <RightOutlined className="!text-4xl cursor-pointer" onClick={next} />
      </div>
    </div>
  );
}

export default ItemCarousel;
