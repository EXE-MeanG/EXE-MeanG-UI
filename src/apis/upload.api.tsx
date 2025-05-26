import api from "./axiosCustom";

export type CategoryEnum = "shirt" | "pants" | "shoes" | "accessory";

interface UploadItemRequest {
  name: string;
  categoryEnum: CategoryEnum;
  file?: File;
  imageUrl?: string; // Optional, if you want to pass an image URL instead of a file
}

export const uploadApi = {
  async uploadItemImage(data: UploadItemRequest) {
    try {
      const formData = new FormData();

      if (data.file) {
        formData.append("image", data.file);
        formData.append("name", data.name);
        formData.append("categoryEnum", data.categoryEnum);
      }

      const response = await api.getInstance().post(
        "/api/v1/items",
        data.file
          ? formData // If a file is provided, use FormData
          : {
              // If no file, use the imageUrl and other data directly
              imageUrl: data.imageUrl,
              name: data.name,
              categoryEnum: data.categoryEnum,
            },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },
};
