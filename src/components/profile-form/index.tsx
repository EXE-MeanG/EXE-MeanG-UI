"use client";
import { AntDesignOutlined } from "@ant-design/icons";
import { Button, Input, DatePicker, Radio, Row, Col, Avatar } from "antd";
import AvatarDump from "@/src/assets/images/avatardump.png";
import AvaDiscCustom from "../shared/AvaDIsc/discCustom";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import InputCustom from "../shared/Input/InputCustom";
import DatePickerCustom from "../shared/Input/DatePickerCustom";
import RadioCustomGroup from "../shared/RadioCustom";
import { useState } from "react";
export default function ProfileForm() {
  const [gender, setGender] = useState("male");
  return (
    <div className="p-11 bg-white rounded-lg shadow-2xl w-full h-full">
      <div className="flex items-center gap-4 mb-6">
        <AvaDiscCustom
          iconSrc={AvatarDump.src}
          iconAlt="dumpava"
          className="w-[193px] h-[193px]"
        />
        <div className="space-x-2 flex gap-5 ">
          <ButtonDiscCustom className="hover:shadow-lg w-[180px] h-[62x]">
            Thay ảnh khác
          </ButtonDiscCustom>
          <button className="w-[180px] h-[62x] bg-[var(--secondary-background)] hover:opacity-[0.75] hover:shadow-lg transition-shadow">
            Xoá ảnh đại diện
          </button>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col span={6} className="w-[407px] h-[60px]">
          <label className="text-[20px] font-semibold">Tên của bạn</label>
          <InputCustom placeholder="Tên của bạn " className="w-full h-full" />
        </Col>
        <Col span={6} className="w-[407px] h-[60px]">
          <label className="text-[20px] font-semibold">Tuổi của bạn</label>
          <DatePickerCustom format="DD/MM/YYYY" className="w-[full] h-[60px]" />
        </Col>

        <Col span={6}>
          <label className="text-[20px] font-semibold">Giới tính</label>
          <RadioCustomGroup
            options={[
              { label: "Nam", value: "male" },
              { label: "Nữ", value: "female" },
            ]}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            height="h-[60px]"
            className="w-full"
          />
        </Col>

        <Col span={4}>
          <label className="text-[20px] font-semibold">Số đo 3 vòng</label>
          <InputCustom className="w-full h-[60px]" placeholder="v1-v2-v3" />
        </Col>
        <Col span={10}>
          <label className="text-[20px] font-semibold">Địa chỉ của bạn</label>
          <InputCustom
            placeholder="Phường (Xã), Quận (Huyện), Tỉnh (Thành phố)"
            className="w-full h-[60px]"
          />
        </Col>
        <Col span={3}>
          <label className="text-[20px] font-semibold">Chiều cao</label>
          <InputCustom addonAfter="cm" className="w-full h-[60px]" />
        </Col>
        <Col span={3}>
          <label className="text-[20px] font-semibold">Cân nặng</label>
          <InputCustom addonAfter="kg" className="w-full h-[60px]" />
        </Col>

        <Col span={3}>
          <label className="text-[20px] font-semibold">Tỷ lệ mỡ</label>
          <InputCustom
            placeholder="Không bắt buộc"
            className="w-full h-[60px]"
          />
        </Col>
        <Col span={3}>
          <label className="text-[20px] font-semibold">Tỷ lệ cơ</label>
          <InputCustom
            placeholder="Không bắt buộc"
            className="w-full h-[60px]"
          />
        </Col>

        <Col span={12}>
          <label className="text-[20px] font-semibold">Email</label>
          <InputCustom
            type="email"
            placeholder="youremail@gmail.com"
            className="w-full h-[60px]"
          />
        </Col>
        <Col span={12}>
          <label className="text-[20px] font-semibold">Số điện thoại</label>
          <InputCustom
            placeholder="000 - 1234 - 123"
            className="w-full h-[60px]"
          />
        </Col>
      </Row>
    </div>
  );
}
