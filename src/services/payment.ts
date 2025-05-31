import api from "../apis/axiosCustom";

export const createPayment = async (amount: number) => {
  try {
    const res = await api.getInstance().post("/api/v1/order/create", {
      amount,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
  }
};
