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

interface OutfitItem {
  _id: string;
  user: string;
  imageUrl: string;
  items: string[];
  isFavorite: boolean;
  create_at: string;
  update_at: string;
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

export const getAllOutfits = async () => {
  try {
    const res = await api.getInstance().get("/api/v1/outfit");
    // Sort outfits - favorites first, then by creation date within each group
    const sortedOutfits = (res?.data?.data || []).sort(
      (a: OutfitItem, b: OutfitItem) => {
        if (a.isFavorite === b.isFavorite) {
          // If both are favorite or both are not, sort by creation date (newest first)
          return (
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
          );
        }
        // Put favorites first
        return a.isFavorite ? -1 : 1;
      }
    );

    return {
      httpStatusCode: res.status,
      data: sortedOutfits,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage ||
        "Lấy dữ liệu trang phục thất bại";
      throw new Error(message);
    }
    throw new Error("Lấy dữ liệu trang phục thất bại. Vui lòng thử lại.");
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
    if (err.response.data.errors[0].errorCode === 100216) {
      const message =
        err.response.data.errors[0].errorMessage ||
        "Số lượt tạo trang phục đã hết";
      throw new Error(message);
    }
  }
};

export const addToFavorite = async (itemId: string) => {
  try {
    console.log("Calling favorite API with ID:", itemId);
    const res = await api
      .getInstance()
      .post(`/api/v1/outfit/${itemId}/favorite`);
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

export const deleteItem = async (itemId: string) => {
  try {
    const res = await api.getInstance().delete(`/api/v1/items/${itemId}`);
    return {
      httpStatusCode: res.status,
      data: res.data,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Xóa trang phục thất bại";
      throw new Error(message);
    }
    throw new Error("Xóa trang phục thất bại. Vui lòng thử lại.");
  }
};

export const deleteOutfit = async (outfitId: string) => {
  try {
    const res = await api
      .getInstance()
      .delete(`/api/v1/user/outfits/${outfitId}`);
    return {
      httpStatusCode: res.status,
      data: res.data,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Xóa trang phục thất bại";
      throw new Error(message);
    }
    throw new Error("Xóa trang phục thất bại. Vui lòng thử lại.");
  }
};
