"use client";

import Image from "next/image";
import Logo from "@/src/assets/logos/main-logo.png";
import InputCustom from "@/src/components/shared/Input/InputCustom";
import InputPasswordCustom from "@/src/components/shared/Input/InputPasswordCustom";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import Spakle from "@/src/assets/images/star.png";
import { Checkbox, Divider, Form, FormProps } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { login } from "@/src/services/auth";
import { useAuthStore } from "@/src/stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const loginData = await login({
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      router.push("/");
    } catch (error) {}
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="min-h-screen w-full bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="p-6 absolute top-0 left-0 right-0 ">
        <Image src={Logo} alt="MeanG" width={200} height={90} />
      </div>

      {/* Login box */}
      <Form
        initialValues={{ remember: true }}
        className="!w-full flex justify-center"
        onFinish={onFinish}
      >
        <div className="login-content w-[50%] h-[53%] bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>

          {/* Email */}

          <Form.Item<FieldType>
            name="email"
            className="!w-full relative "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email hoặc số điện thoại",
              },
            ]}
          >
            <InputCustom
              placeholder="Email hoặc số điện thoại"
              className="w-[40%] h-[56px] mb-4 mx-auto"
            />
          </Form.Item>
          {/* Password */}

          <Form.Item<FieldType>
            name="password"
            className="!w-full"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email hoặc số điện thoại",
              },
            ]}
          >
            <InputPasswordCustom
              placeholder="Mật khẩu"
              className="w-[40%] h-[56px] mb-4 mx-auto"
            />
          </Form.Item>

          {/* Đăng nhập */}
          <div className="sparkle relative w-[40%] h-[56px] font-semibold mt-2">
            <Form.Item label={null}>
              <ButtonCustom
                htmlType="submit"
                className="w-full h-[56px] font-semibold  "
              >
                Đăng nhập
                {loading && <LoadingOutlined className="mx-2" />}
              </ButtonCustom>
            </Form.Item>
            <Image
              src={Spakle}
              alt="logo"
              // width={20}
              // height={20}
              className="absolute z-10 right-[-10px] top-[-7px] w-8 h-8 animate-sparkle pointer-events-none"
            />
          </div>

          {/* Options */}
          <div className="w-[40%] flex justify-between items-center text-sm mt-2 mb-3">
            <Checkbox className="text-quaternary">Ghi nhớ đăng nhập</Checkbox>
            <a href="#" className="text-primary font-semibold hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Hoặc */}
          <div className="divider w-[40%] mb-4 flex items-center text-sm text-gray-500">
            <Divider style={{ borderColor: "#000" }}>HOẶC</Divider>
          </div>
          {/* Social login */}
          <div className="flex gap-4 mb-4 text-2xl">
            <FacebookFilled className="text-[#1877F2] cursor-pointer" />
            <GoogleOutlined className="text-[#EA4335] cursor-pointer" />
          </div>

          {/* Đăng ký */}
          <p className="text-sm text-quaternary">
            Bạn không có tài khoản?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Đăng ký
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
}
