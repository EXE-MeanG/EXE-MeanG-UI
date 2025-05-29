import api from "../apis/axiosCustom";

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  gender: string;
  bodyImageUrl: string;
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hip: number;
  shoulderWidth: number;
  armLength: number;
  legLength: number;
  torsoLength: number;
  description: string;
  outfitFavourite: any[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  username?: string;
  gender?: string;
  height?: number;
  weight?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  shoulderWidth?: number;
  armLength?: number;
  legLength?: number;
  torsoLength?: number;
  description?: string;
}

export const getUserProfile = async () => {
  try {
    const res = await api.getInstance().get("/api/v1/user/profile");
    return {
      httpStatusCode: res.status,
      data: res?.data?.data as UserProfile,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Lấy thông tin thất bại";
      throw new Error(message);
    }
    throw new Error("Lấy thông tin thất bại. Vui lòng thử lại.");
  }
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  try {
    const res = await api.getInstance().patch("/api/v1/user/profile", {
      updateProfileDto: data,
    });
    return {
      httpStatusCode: res.status,
      data: res?.data?.data as UserProfile,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage ||
        "Cập nhật thông tin thất bại";
      throw new Error(message);
    }
    throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại.");
  }
};
