"use client";
import Header from "@/src/components/layouts/Header";
import ProfileForm from "@/src/components/profile-form";
import Sidebar from "@/src/components/profile-sidebars";
import { useState } from "react";
import "./style.css";
import { Button, Modal } from "antd";
export default function Profile() {
  const [selected, setSelected] = useState("profile");

  return (
    <div className=" min-h-screen w-100vw bg-hero-pattern bg-cover bg-center ">
      <Header />
      <div className="profile-content flex items-center p-[300px]  ">
        <div className="mr-6 relative z-[2]">
          <Sidebar onSelect={setSelected} />
        </div>
        <div className="flex-1 min-w-[1279px] h-[773px] mr-6 relative z-[2]">
          {selected === "profile" && <ProfileForm />}
          {selected === "logout" && (
            <>
              <Modal
                className="logout-modal"
                width={639}
                height={354}
                open={true}
                title="Xác Nhận"
                centered
                footer={() => (
                  <>
                    <button className="p-[10px] text-2xl hover:opacity-75">
                      Hủy
                    </button>
                    <button className="p-[10px] text-2xl text-[var(--border-primary)] hover:opacity-75">
                      Đăng Xuất
                    </button>
                  </>
                )}
              >
                <p className="text-[#565656]">
                  Bạn có muốn đăng xuất khỏi tài khoản MeanG trên trình duyệt
                  Chrome/ip không ?
                </p>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
