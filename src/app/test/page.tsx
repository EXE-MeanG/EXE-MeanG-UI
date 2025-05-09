"use client";
import Image from "next/image";
import { useState } from "react";
import Shoppe from "@/src/assets/icons/shoppe.png";
import InputCustom from "@/src/components/shared/Input/InputCustom";
import TypographyCustom from "@/src/components/shared/Typography/TypographyCustom";
import DiscCustom from "@/src/components/shared/Disc/discCustom";
import CardCustom from "@/src/components/shared/Card/cardCustom";
import CalendarAnimation from "@/src/components/shared/CalendarAnimated";
import ButtonCustom from "@/src/components/shared/Button/ButtonCustom";
import ButtonDiscCustom from "@/src/components/shared/ButtonDIsc/discCustom";
import CalendarMini from "@/src/components/shared/CalendarMini";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="h-[4000px] bg-green-900">
      <ButtonCustom className="">WWelcome</ButtonCustom>;
      <InputCustom
        value={inputValue}
        className="mt-8"
        placeholder="Enter your name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <TypographyCustom text="Hello Gradient" />
      <DiscCustom iconSrc={Shoppe.src} iconSize={100} />
      <CalendarAnimation />
    </div>
  );
}
