"use client";

import { useState } from "react";
import { Form, FormProps, message } from "antd";
import Image from "next/image";
import Logo from "../../assets/logos/main-logo.png";
import InputCustom from "@/src/components/shared/Input/InputCustom";
import InputPasswordCustom from "@/src/components/shared/Input/InputPasswordCustom";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import Spakle from "../../assets/images/star.png";
import { motion } from "framer-motion";
import Link from "next/link";
import "./style.css";
import { register } from "@/src/services/auth";
import { useRegisterStore } from "@/src/stores/registerStore";
import { useRouter } from "next/navigation";

type RegisterFieldType = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  const [form] = Form.useForm<RegisterFieldType>();
  const setRegisterData = useRegisterStore((state) => state.setData);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish: FormProps<RegisterFieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const registerData = await register({
        email: values.email,
        password: values.password,
        username: values.name,
      });
      console.log("Register data:", values);
      setRegisterData({
        email: values.email || "",
        password: values.password || "",
      });
      message.success("Đăng ký thành công!");
      form.resetFields();
      setLoading(false);
      router.push("/verify");
    } catch (error: any) {
      form.resetFields();
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="register-screen min-h-screen w-full bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div
        className="p-6 absolute top-0 left-0 right-0 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={Logo} alt="MeanG" width={200} height={90} />
      </div>

      {/* Register Form */}
      <Form
        form={form}
        onFinish={onFinish}
        className="!w-full flex justify-center"
      >
        <div className="register-content w-[50%] bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>

          {/* Tabs with animated underline */}
          <div className="relative w-[40%] mb-6">
            <div className="flex justify-between text-sm font-medium relative">
              <button
                className={`w-1/2 pb-2 ${
                  activeTab === "phone" ? "text-black" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("phone")}
                type="button"
              >
                Số điện thoại
              </button>
              <button
                className={`w-1/2 pb-2 ${
                  activeTab === "email" ? "text-black" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("email")}
                type="button"
              >
                Email
              </button>
            </div>
            <motion.div
              className="absolute bottom-0 h-[2px] bg-black w-1/2"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: activeTab === "email" ? "50%" : "0%",
              }}
            />
          </div>

          {/* Full name */}
          <Form.Item<RegisterFieldType>
            name="name"
            className="!w-full relative"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
          >
            <InputCustom
              placeholder="Tên của bạn"
              className="w-[40%] h-[56px] mb-4 mx-auto"
            />
          </Form.Item>

          {/* Email or Phone */}
          {activeTab === "phone" ? (
            <Form.Item<RegisterFieldType>
              name="phone"
              className="!w-full relative"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <InputCustom
                placeholder="Số điện thoại của bạn"
                className="w-[40%] h-[56px] mb-4 mx-auto"
              />
            </Form.Item>
          ) : (
            <Form.Item<RegisterFieldType>
              name="email"
              className="!w-full relative"
              rules={[
                { required: true, message: "Vui lòng nhập email của bạn" },
              ]}
            >
              <InputCustom
                placeholder="Email của bạn"
                className="w-[40%] h-[56px] mb-4 mx-auto"
              />
            </Form.Item>
          )}

          {/* Password */}
          <Form.Item<RegisterFieldType>
            name="password"
            className="!w-full relative"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <InputPasswordCustom
              placeholder="Mật khẩu"
              className="w-[40%] h-[56px] mb-4 mx-auto"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item<RegisterFieldType>
            name="confirmPassword"
            className="!w-full relative"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp");
                },
              }),
            ]}
          >
            <InputPasswordCustom
              placeholder="Xác nhận mật khẩu"
              className="w-[40%] h-[56px] mb-4 mx-auto"
            />
          </Form.Item>

          {/* Register Button */}
          <div className="sparkle relative w-[40%] h-[56px] font-semibold mt-2 mb-4">
            <Form.Item>
              <ButtonCustom
                htmlType="submit"
                className="w-full h-[56px] font-semibold "
              >
                Đăng ký
              </ButtonCustom>
            </Form.Item>
            <Image
              src={Spakle}
              alt="logo"
              className="absolute z-10 right-[-10px] top-[-7px] w-8 h-8 animate-sparkle pointer-events-none"
            />
          </div>

          {/* Login Link */}
          <p className="text-sm text-quaternary text-center mt-2">
            Bạn đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
