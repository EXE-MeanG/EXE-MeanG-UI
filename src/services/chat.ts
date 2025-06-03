import api from "../apis/axiosCustom";
import { useAuthStore } from "../stores/authStore";

interface ChatInput {
  question: string;
}
export interface ChatResponse {
  outfit?: string[];
  reply?: string;
}
export const Chatting = async ({ question }: ChatInput) => {
  try {
    const res = await api.getInstance().post("/api/v1/chatbot", {
      question,
    });

    const { outfit, reply }: ChatResponse = res?.data?.data;

    return {
      outfit: outfit || [],
      reply: reply || "Tôi không hiểu câu hỏi của bạn. Vui lòng thử lại.",
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Lỗi gì đó đang xảy ra";
      throw new Error(message);
    }
    throw new Error("Lỗi gì đó đang xảy ra. Vui lòng thử lại.");
  }
};
export const ReloadOutfit = async (itemIdChange: string, itemIds: string[]) => {
  try {
    const res = await api.getInstance().post("/api/v1/chatbot/recommend", {
      itemIdChange,
      itemIds,
    });
    const { _id, image, link } = res?.data?.data;
    return {
      _id,
      image,
      link,
    };
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Lỗi gì đó đang xảy ra";
      throw new Error(message);
    }
    throw new Error("Lỗi gì đó đang xảy ra. Vui lòng thử lại.");
  }
};
