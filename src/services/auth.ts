import api from "../apis/axiosCustom";
import { useAuthStore } from "../stores/authStore";

interface LoginInput {
  email?: string;
  password?: string;
}
interface RegisterInput extends LoginInput {
  username?: string;
}
interface VerifyInput {
  otp?: string;
  email?: string;
}
export const login = async ({ email, password }: LoginInput) => {
  try {
    const res = await api.getInstance().post("/api/v1/auth/login", {
      email,
      password,
    });

    const { accessToken, refreshToken, username } = res?.data?.data;
    console.log(accessToken, refreshToken, username);

    useAuthStore.getState().setTokens(accessToken, refreshToken);
    useAuthStore.getState().setUser({ username: username }); // nếu có thêm user info
    return true;
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Sai thông tin đăng nhập";
      throw new Error(message);
    }
    throw new Error("Đăng nhập thất bại. Vui lòng thử lại.");
  }
};
export const register = async ({
  email,
  username,
  password,
}: RegisterInput) => {
  try {
    const res = await api.getInstance().post("/api/v1/auth/register", {
      email,
      username,
      password,
    });
    return true;
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "Email đã tồn tại";

      throw new Error(message);
    }
    throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
  }
};
export const verify = async ({ otp, email }: VerifyInput) => {
  try {
    const res = await api.getInstance().post("api/v1/auth/verify", {
      otpCode: otp,
      email,
    });
    return true;
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message =
        err.response.data.errors[0].errorMessage || "OTP Code không hợp lệ";
      throw new Error(message);
    }
    throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
  }
};
