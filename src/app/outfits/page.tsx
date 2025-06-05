"use client";

import { useState, useEffect } from "react";
import { Modal, message, Spin } from "antd";
import Header from "@/src/components/layouts/Header";
import TypographyCustom from "@/src/components/shared/Typography/TypographyCustom";
import OutfitCarousel from "@/src/components/FavoriteCarousel";
import ModalEvent from "@/src/components/shared/ModalEvent/modalEvent";
import {
  getAllOutfits,
  deleteOutfit,
  addToFavorite,
} from "@/src/services/cloths";
import { useRouter } from "next/navigation";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  LoadingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Outfits() {
  const router = useRouter();
  const [outfits, setOutfits] = useState<
    Array<{
      _id: string;
      imageUrl: string;
      name: string;
      isFavorite: boolean;
    }>
  >([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    setPageLoading(true);
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
      message.error("Lỗi khi lấy trang phục");
    } finally {
      setPageLoading(false);
    }
  };

  const handleToggleFavorite = async (itemId: string) => {
    try {
      const response = await addToFavorite(itemId);
      if (response?.httpStatusCode === 200) {
        setOutfits((prevOutfits) =>
          prevOutfits.map((outfit) =>
            outfit._id === itemId
              ? { ...outfit, isFavorite: !outfit.isFavorite }
              : outfit
          )
        );
        message.success(
          outfits.find((o) => o._id === itemId)?.isFavorite
            ? "Đã xóa khỏi yêu thích"
            : "Đã thêm vào yêu thích"
        );
      }
    } catch (error: any) {
      message.error(error?.message || "Thêm vào yêu thích thất bại");
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setLoading(true);
    try {
      await deleteOutfit(itemToDelete);
      await fetchOutfits(); // Refresh the outfits list
      message.success("Xóa thành công");
    } catch (error: any) {
      message.error(error.message || "Xóa thất bại");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setItemToDelete(null);
    }
  };

  const handleCreateEvent = (eventData: any) => {
    // Handle event creation
    message.success("Sự kiện đã được tạo");
    setIsEventModalOpen(false);
  };

  const handleScheduleClick = (outfit: any) => {
    setSelectedOutfit(outfit);
    setIsEventModalOpen(true);
  };

  return (
    <div className="outfits min-h-screen w-100vw">
      <section className="bg-hero-pattern h-[100vh] bg-cover bg-center">
        <Header />
        <div className="px-[100px] py-[50px]">
          <div className="w-full">
            <TypographyCustom text="YOUR OUTFIT " size={80} />
          </div>
          {pageLoading ? (
            <div className="flex justify-center items-center h-[617px]">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                tip="Loading outfits..."
                className="text-primary"
              />
            </div>
          ) : outfits.length > 0 ? (
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
                      handleDeleteClick(item._id);
                    }}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                  >
                    <DeleteOutlined className="text-xl text-red-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScheduleClick(item);
                    }}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                  >
                    <CalendarOutlined className="text-xl text-blue-500" />
                  </button>
                </div>
              )}
            />
          ) : (
            <div className="text-center text-gray-500 text-xl mt-8">
              No outfits yet. Create some outfits to see them here!
            </div>
          )}
        </div>
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
        <p>Bạn có chắc chắn muốn xóa bộ trang phục này?</p>
      </Modal>

      {/* Event Creation Modal */}
      <ModalEvent
        isOpen={isEventModalOpen}
        handleCancle={() => {
          setIsEventModalOpen(false);
          setSelectedOutfit(null);
        }}
        onEventCreate={handleCreateEvent}
        preSelectedOutfit={selectedOutfit}
      />
    </div>
  );
}
