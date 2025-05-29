"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/logos/main-logo.png";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import Spakle from "../../assets/images/star.png";
import { useRegisterStore } from "@/src/stores/registerStore";
import { Divider, Form, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./style.css";
import { useForm } from "antd/es/form/Form";
import { FormProps } from "antd/lib";
import { verify } from "@/src/services/auth";
type VerifyType = {
  otp?: string;
};
export default function VerifyEmail() {
  const [isOpen, setIsOpen] = useState(false);
  const { email, password, clear } = useRegisterStore();
  const [form] = useForm<VerifyType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   if (!email || !password) {
  //     message.error("Thiếu thông tin đăng ký");
  //     router.push("/register");
  //   }
  // }, [email, password, router]);
  const onFinish: FormProps<VerifyType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      console.log();

      const verifyStatus = await verify({
        email,
        otp: values.otp,
      });
      console.log(verifyStatus);
      message.success("Xác nhận thành công");
      form.resetFields();
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      form.resetFields();
      message.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="verify-screen min-h-screen w-full bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-center px-4">
      <div className="p-6 absolute top-0 left-0 right-0 ">
        <Image src={Logo} alt="MeanG" width={200} height={90} />
      </div>

      <div className="reset-content w-[50%] bg-white px-8 py-3 rounded-xl shadow-md flex flex-col items-center ">
        <h1 className="text-4xl font-bold mt-2">Xác thực tài khoản của bạn</h1>
        <Divider />
        <p className="w-[100%] text-xl text-quaternary font-medium  ">
          Xin chào,
        </p>
        <p className="w-[100%] text-xl text-quaternary font-medium  ">
          Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quá trình đăng ký và kích
          hoạt tài khoản của bạn, vui lòng nhấp vào nút bên dưới.
        </p>

        <div className="flex flex-col gap-4 w-full items-center justify-center">
          {/* <InputCustom
            placeholder="Email hoặc số điện thoại"
            className="w-[40%] h-[56px]"
          /> */}
          <div className="sparkle relative w-[22%] h-[56px] font-semibold mb-2">
            <ButtonCustom
              className="w-full h-full font-semibold  rounded-md shadow-lg text-lg !font-bold "
              onClick={() => setIsOpen(true)}
            >
              Xác thực tài khoảng
            </ButtonCustom>
            <Image
              src={Spakle}
              alt="logo"
              // width={20}
              // height={20}
              className="absolute z-10 right-[-10px] top-[-7px] w-8 h-8 animate-sparkle pointer-events-none"
            />
            <Modal
              centered
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              closable
              width={600}
              footer={false}
            >
              {/* <div className=" p-4 modal-verify flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Mã xác thực đã được gửi </h1>
                <p className="text-lg font-semibold text-quaternary">
                  Chúng tôi đã gửi mã xác thực đến email của bạn. Vui lòng kiểm
                  tra hộp thư đến và nhập mã xác thực để hoàn tất quá trình đăng
                  ký.
                </p>
                <div className="verify-status w-full p-10 bg-gray-100 flex flex-col items-center justify-center">
                  <MailOutlined className="!text-4xl" />
                  <h1 className="text-xl font-bold">
                    Mã xác thực đã được gửi đến bạn
                  </h1>
                </div>
                <div className="verify-form">
                  <h2 className="text-lg font-semibold">Nhập mã xác thực</h2>
                  <Form className="w-full my-2" form={form} onFinish={onFinish}>
                    <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã xác nhận",
                        },
                      ]}
                    >
                      <InputCustom
                        className="w-full h-[56px]"
                        placeholder="Nhập mã 6 chữ số"
                        maxLength={6}
                      />
                    </Form.Item>
                    <Form.Item>
                      <ButtonCustom
                        htmlType="submit"
                        className="w-full h-[56px] text-lg font-bold shadow-md !rounded-md shadow-black"
                      >
                        Xác Nhận
                      </ButtonCustom>
                    </Form.Item>
                  </Form>
                </div>
                <p className="w-full text-center text-lg font-semibold text-quaternary">
                  Mã xác thực có hiệu lực trong 10 phút. Nếu bạn không nhận được
                  mã, vui lòng kiểm tra thư mục spam hoặc yêu cầu gửi lại mã.
                </p>
              </div> */}
              <div className=" p-4 modal-verify flex flex-col gap-4">
                <div className="verify-status w-full p-10 bg-gray-100 flex flex-col items-center justify-center">
                  <div className="icon-wrapper bg-green-100 p-2 rounded-full">
                    <CheckCircleOutlined
                      color=""
                      className="!text-4xl !text-[#00FF00]"
                    />
                  </div>
                  <h1 className="text-xl font-bold">Xác thực thành công!</h1>
                </div>
                <p className="w-full text-center text-lg font-semibold text-quaternary">
                  Tài khoản của bạn đã được xác thực thành công. Bây giờ bạn có
                  thể truy cập đầy đủ vào tất cả các tính năng của hệ thống.
                </p>
                <div className="next-step">
                  <h2>Các bước tiếp theo </h2>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </Modal>
          </div>
          <p className="w-[100%] text-xl text-quaternary font-medium">
            Liên kết xác thực này sẽ hết hạn sau 24 giờ. Nếu bạn không thực hiện
            xác thực trong thời gian này, bạn sẽ cần yêu cầu một liên kết xác
            thực mới.
          </p>
          <p className="w-[100%] text-xl text-quaternary font-medium">
            Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này hoặc
            liên hệ với bộ phận hỗ trợ của chúng tôi.
          </p>
          <Divider />
          <p className="w-[100%] text-lg text-quaternary ">Trân trọng,</p>
          <p className="w-[100%] text-lg text-quaternary ">Đội ngũ hỗ trợ.</p>
          <Divider />
          <footer className="relative w-full py-2  text-center text-sm text-gray-600 ">
            <p className="mb-1">
              © 2025 <span className="font-semibold">Công ty MeanG</span>. Tất
              cả các quyền được bảo lưu.
            </p>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi tại{" "}
              <a
                href="mailto:meang6854@gmail.com"
                className="text-primary hover:underline"
              >
                meang6854@gmail.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
