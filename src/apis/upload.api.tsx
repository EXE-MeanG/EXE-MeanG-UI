import api from "./axiosCustom";

export type CategoryEnum = "shirt" | "pants" | "shoes" | "accessory";

interface UploadItemRequest {
  name: string;
  categoryEnum: CategoryEnum;
  file: File;
}

export const uploadApi = {
  async uploadItemImage(data: UploadItemRequest) {
    try {
      const formData = new FormData();
      formData.append("image", data.file);
      formData.append("name", data.name);
      formData.append("categoryEnum", data.categoryEnum);

      const response = await api.getInstance().post("/api/v1/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },
};
