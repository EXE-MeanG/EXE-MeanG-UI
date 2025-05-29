import api from "../apis/axiosCustom";
import { useAuthStore } from "../stores/authStore";

interface UserItems {
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
interface GenerateOutfitData {
  image_url: string;
}
export const getUserItems = async () => {
  try {
    const res = await api.getInstance().get("/api/v1/items");
    return {
      httpStatusCode: res.status,
      data: res?.data?.data || [],
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Lấy dữ liệu thất bại";
      throw new Error(message);
    }
    throw new Error("Lấy dữ liệu thất bại. Vui lòng thử lại.");
  }
};
export const generateOutfit = async (itemIds: string[]) => {
  try {
    const res = await api.getInstance().post("/api/v1/outfit/generate", {
      items: itemIds,
    });
    return {
      httpStatusCode: res.status,
      data: res?.data?.data || "",
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Tạo Outfit thất bại";
      throw new Error(message);
    }
  }
};
export const addToFavorite = async (itemId: string) => {
  try {
    console.log("Calling favorite API with ID:", itemId);
    const res = await api
      .getInstance()
      .post(`/api/v1/outfit?${itemId}/favorite`);
    console.log("Favorite API response:", res);
    return {
      httpStatusCode: res.status,
      data: res?.data?.data || [],
    };
  } catch (err: any) {
    console.error("Favorite API error:", {
      status: err.response?.status,
      data: err.response?.data,
      url: err.config?.url,
    });
    if (err.response?.status === 404) {
      throw new Error("Không tìm thấy trang phục");
    }
    if (err.response?.status === 400) {
      const message =
        err.response?.data?.errors?.[0]?.errorMessage || "Thêm thất bại";
      throw new Error(message);
    }
    throw new Error("Thêm thất bại. Vui lòng thử lại.");
  }
};
