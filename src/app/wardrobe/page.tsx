"use client";
import Header from "@/src/components/layouts/Header";
import CardCustom from "@/src/components/shared/Card/cardCustom";
import TypographyCustom from "@/src/components/shared/Typography/TypographyCustom";
import Model1 from "../../assets/model/model1.png";
import { useState, useEffect } from "react";
import ItemCarousel from "@/src/components/item-carousel";
import ButtonDiscCustom from "@/src/components/shared/ButtonDIsc/discCustom";
import Image from "next/image";
import Plus from "../../assets/icons/plus.png";
import ModalEvent from "@/src/components/shared/ModalEvent/modalEvent";
import { GetProp, Upload, UploadProps, message, Modal } from "antd";
import { uploadApi, CategoryEnum } from "@/src/apis/upload.api";
import {
  addToFavorite,
  generateOutfit,
  getUserItems,
  getAllOutfits,
  deleteItem,
  deleteOutfit,
} from "@/src/services/cloths";
import { useRouter } from "next/navigation";
import { developmentURL } from "@/src/apis/constraints";
import { useAuthStore } from "@/src/stores/authStore";
import {
  UploadOutlined,
  HeartOutlined,
  HeartFilled,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Chat from "@/src/components/chat";
import OutfitCarousel from "@/src/components/FavoriteCarousel";
import { getUserProfile } from "@/src/services/user";
import ModalPayment from "@/src/components/payment/ModalPayment";

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

export interface SelectedItems {
  upper: CarouselItem | null;
  downer: CarouselItem | null;
  shoes: CarouselItem | null;
}

// Add type for getUserItems
type GetUserItemsFunction = () => Promise<ApiResponse>;
const getUserItemsTyped: GetUserItemsFunction = getUserItems;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default function Wardrobe() {
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState("");
  const [generatedOutfitImage, setGeneratedOutfitImage] = useState<string>(
    Model1.src
  );
  const [isGenerating, setIsGenerating] = useState(false);
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [outfitGeneratedId, setOutfitGeneratedId] = useState<string>("");
  const [outfits, setOutfits] = useState<
    Array<{
      _id: string;
      imageUrl: string;
      name: string;
      isFavorite: boolean;
    }>
  >([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: "item" | "outfit";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [initOutfit, setInitOutfit] = useState(Model1.src);
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
            id: item._id,
          })),
        downers: (apiData.data || [])
          .filter((item) => item.category_enum === "pants")
          .map((item) => ({
            imageSrc: item.imageLink,
            imageAlt: item.name,
            id: item._id,
          })),
        ass: (apiData.data || [])
          .filter((item) => item.category_enum === "shoes")
          .map((item) => ({
            imageSrc: item.imageLink,
            imageAlt: item.name,
            id: item._id,
          })),
      };
      setCarouselItems(transformedData);
    };

    fetchItems();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await getAllOutfits();
        if (response?.data) {
          setOutfits(
            response.data.map((item: any) => ({
              _id: item._id,
              imageUrl: item.imageUrl || item.imageLink,
              name: item.name || "Outfit",
              isFavorite: item.isFavorite,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching outfits:", error);
        message.error("Failed to load outfits");
      }
    };

    fetchOutfits();
  }, [isFavorite]); // Refetch when favorite status changes
  useEffect(() => {
    const fetchInitOutfit = async () => {
      const response = await getUserProfile();
      if (response?.data) {
        setGeneratedOutfitImage(response.data.bodyImageUrl);
      }
    };
    fetchInitOutfit();
  }, []);
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
    if (!selectedItems.upper || !selectedItems.downer) {
      message.warning("Vui lòng chọn áo và quần trước khi tạo");
      return;
    }

    setIsGenerating(true);
    const outfitIds = [
      selectedItems.upper.id,
      selectedItems.downer.id,
      selectedItems.shoes?.id, // Make shoes optional
    ].filter((id): id is string => id !== undefined);

    try {
      const response = await generateOutfit(outfitIds);
      if (response?.data) {
        message.success("Tạo trang phục thành công");
        setGeneratedOutfitImage(response.data.imageUrl);
        setOutfitGeneratedId(response.data._id);
      }
    } catch (error: any) {
      console.error("Generate outfit error:", error);
      message.error(error?.message || "Tạo trang phục thất bại");
      if (error.message === "Số lượt tạo trang phục đã hết") {
        setIsModalPaymentOpen(true);
      }
    } finally {
      setIsGenerating(false);
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

  const handleOutfitSelection = (outfit: string[]) => {
    // Create a new selected items object
    const newSelectedItems: SelectedItems = {
      upper: null,
      downer: null,
      shoes: null,
    };

    // For each outfit ID, try to find it in any of the categories
    outfit.forEach((outfitId) => {
      // Try to find in uppers
      const upperMatch = carouselItems.uppers.find(
        (item) => item.id === outfitId
      );
      if (upperMatch) {
        newSelectedItems.upper = upperMatch;
      }

      // Try to find in downers
      const downerMatch = carouselItems.downers.find(
        (item) => item.id === outfitId
      );
      if (downerMatch) {
        newSelectedItems.downer = downerMatch;
      }

      // Try to find in shoes
      const shoesMatch = carouselItems.ass.find((item) => item.id === outfitId);
      if (shoesMatch) {
        newSelectedItems.shoes = shoesMatch;
      }
    });

    // Update all selections at once
    setSelectedItems(newSelectedItems);
  };

  const handleToggleFavorite = async (itemId?: string) => {
    const targetId = itemId || outfitGeneratedId;

    if (!targetId) {
      message.warning("Vui lòng tạo trang phục trước khi thêm vào yêu thích");
      return;
    }

    try {
      const response = await addToFavorite(targetId);
      if (response?.httpStatusCode === 200) {
        if (itemId) {
          // Update the outfits list directly
          setOutfits((prevOutfits) =>
            prevOutfits.map((outfit) =>
              outfit._id === itemId
                ? { ...outfit, isFavorite: !outfit.isFavorite }
                : outfit
            )
          );
        } else {
          // Update the main outfit's favorite status
          setIsFavorite((prev) => !prev);
        }
        message.success(
          isFavorite ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích"
        );
      }
    } catch (error: any) {
      message.error(error?.message || "Thêm vào yêu thích thất bại");
      console.error("Add to favorite error:", error);
    }
  };

  const handleDeleteClick = (id: string, type: "item" | "outfit") => {
    setItemToDelete({ id, type });
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setLoading(true);
    try {
      if (itemToDelete.type === "item") {
        await deleteItem(itemToDelete.id);
        // Refresh items list
        const apiData = await getUserItemsTyped();
        const transformedData: CarouselItems = {
          uppers: (apiData.data || [])
            .filter((item) => item.category_enum === "shirt")
            .map((item) => ({
              imageSrc: item.imageLink,
              imageAlt: item.name,
              id: item._id,
            })),
          downers: (apiData.data || [])
            .filter((item) => item.category_enum === "pants")
            .map((item) => ({
              imageSrc: item.imageLink,
              imageAlt: item.name,
              id: item._id,
            })),
          ass: (apiData.data || [])
            .filter((item) => item.category_enum === "shoes")
            .map((item) => ({
              imageSrc: item.imageLink,
              imageAlt: item.name,
              id: item._id,
            })),
        };
        setCarouselItems(transformedData);
      } else {
        await deleteOutfit(itemToDelete.id);
        // Refresh outfits list
        const response = await getAllOutfits();
        if (response?.data) {
          setOutfits(
            response.data.map((item: any) => ({
              _id: item._id,
              imageUrl: item.imageUrl || item.imageLink,
              name: item.name || "Outfit",
              isFavorite: item.isFavorite,
            }))
          );
        }
      }
      message.success("Xóa thành công");
    } catch (error: any) {
      message.error(error.message || "Xóa thất bại");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setItemToDelete(null);
    }
  };

  const renderItemCarousel = (
    type: keyof SelectedItems,
    items: CarouselItem[],
    selectedItem: CarouselItem | null
  ) => (
    <ItemCarousel
      type={type === "shoes" ? "shoes" : type === "upper" ? "upper" : "downer"}
      items={items}
      onUpload={handleUpload}
      selectedItem={selectedItem}
      onSelectItem={(item) => handleItemSelect(type, item)}
      renderItemActions={(item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (item.id) {
              handleDeleteClick(item.id, "item");
            }
          }}
          className="absolute top-0 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
        >
          <DeleteOutlined className="text-xl text-red-500" />
        </button>
      )}
    />
  );

  return (
    <div className="wardrobe min-h-screen w-100vw">
      <section className="bg-hero-pattern bg-cover bg-center">
        <Header />
        <div className="wardrobe_content px-[100px] py-[50px]">
          <TypographyCustom text="MIX & MATCH" size={80} />
          <div className="wardrobe_content__container flex justify-between items-start gap-11">
            <div className="wardrobe_content__container___model flex-1 flex flex-col items-center justify-center gap-2">
              <div className="relative group">
                <Upload
                  name="image"
                  action={`${developmentURL}/api/v1/user/upload-body-image`}
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
                  <div className="relative">
                    <CardCustom
                      cardSrc={generatedOutfitImage}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent upload trigger
                    handleToggleFavorite();
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-lg z-10"
                >
                  {isFavorite ? (
                    <HeartFilled className="text-2xl text-red-500" />
                  ) : (
                    <HeartOutlined className="text-2xl text-gray-600 hover:text-red-500" />
                  )}
                </button>
              </div>
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
                    isGenerating
                  }
                >
                  {isGenerating ? (
                    <LoadingOutlined className="mr-2" />
                  ) : (
                    <Image
                      src={Plus}
                      alt="plus"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  )}{" "}
                  {isGenerating ? "Đang tạo..." : "Tạo Trang Phục"}
                </ButtonDiscCustom>
              </div>
              <ModalEvent isOpen={isOpen} handleCancle={handleClose} />
            </div>
            <div className="wardrobe_content__container___items flex flex-col gap-10 ">
              {renderItemCarousel(
                "upper",
                carouselItems.uppers,
                selectedItems.upper
              )}
              {renderItemCarousel(
                "downer",
                carouselItems.downers,
                selectedItems.downer
              )}
              {renderItemCarousel(
                "shoes",
                carouselItems.ass,
                selectedItems.shoes
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[100px] py-[50px]">
        <TypographyCustom text="AI GENERATE" size={80} />
        <Chat
          onOutfitSelect={handleOutfitSelection}
          itemSelect={selectedItems}
          handleGenerateOutfit={handleGenerateOutfit}
        />
      </section>
      <section className="px-[100px] py-[50px] h-[100vh]">
        <div className="w-full">
          <TypographyCustom text="YOUR OUTFITS " size={80} />
        </div>
        {outfits.length > 0 ? (
          <OutfitCarousel
            items={outfits}
            onSelect={(item) => {
              console.log("Selected outfit:", item);
            }}
            onToggleFavorite={handleToggleFavorite}
            renderItemActions={(item) => (
              <div className="absolute top-2 left-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(item._id);
                  }}
                  className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  {item.isFavorite ? (
                    <HeartFilled className="text-xl text-red-500" />
                  ) : (
                    <HeartOutlined className="text-xl text-gray-600 hover:text-red-500" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item._id, "outfit");
                  }}
                  className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  <DeleteOutlined className="text-xl text-red-500" />
                </button>
              </div>
            )}
          />
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No outfits yet. Create some outfits to see them here!
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setItemToDelete(null);
        }}
        confirmLoading={loading}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn xóa{" "}
          {itemToDelete?.type === "item" ? "trang phục" : "bộ trang phục"} này?
        </p>
      </Modal>
      <ModalPayment
        isOpen={isModalPaymentOpen}
        onClose={() => setIsModalPaymentOpen(false)}
      />
    </div>
  );
}
