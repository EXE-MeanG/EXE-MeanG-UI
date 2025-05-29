"use client";
import Header from "@/src/components/layouts/Header";
import ProfileForm from "@/src/components/profile-form";
import Sidebar from "@/src/components/profile-sidebars";
import { useEffect, useState } from "react";
import "./style.css";
import { Button, Modal } from "antd";
import Notification from "@/src/components/profile-notification";
import Security from "@/src/components/profile-security";
import { useRouter } from "next/navigation";
export default function Profile() {
  const [selected, setSelected] = useState("profile");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (!token) router.push("/login");
  }, []);
  return (
    <div className=" min-h-screen w-100vw bg-hero-pattern bg-cover bg-center ">
      <Header />
      <div className="profile-content flex items-center p-[100px] ">
        <div className="mr-6 relative z-[2]">
          <Sidebar onSelect={setSelected} />
        </div>
        <div className="flex-1 min-w-[1279px] min-h-[773px] mr-6  relative z-[2]">
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
          {selected === "notifications" && (
            <>
              <Notification />
            </>
          )}
          {selected === "security" && <Security />}
        </div>
      </div>
    </div>
  );
}
