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
