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
