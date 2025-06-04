import api from "../apis/axiosCustom";

export interface Schedule {
  outfit_id: {
    _id: string;
    imageUrl: string;
  };
  start_time: Date;
  end_time: Date;
  description: string;
  location: string;
  imageUrl?: string;
}

export const addEvent = async ({
  outfit_id,
  start_time,
  end_time,
  description,
  location,
}: Schedule) => {
  try {
    const res = await api.getInstance().post("/api/v1/schedule/", {
      outfit: outfit_id,
      start_time,
      end_time,
      description,
      location,
    });
    return {
      httpStatusCode: res.status,
      data: res?.data?.data as Schedule,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Thêm sự kiện thất bại";
      throw new Error(message);
    }
    throw new Error("Thêm sự kiện thất bại. Vui lòng thử lại.");
  }
};
export const getAllEvents = async () => {
  try {
    const res = await api.getInstance().get("/api/v1/schedule/");
    return {
      httpStatusCode: res.status,
      data: res?.data?.data as Schedule[],
    };
  } catch (err: any) {
    throw new Error("Lấy danh sách sự kiện thất bại. Vui lòng thử lại.");
  }
};
