"use client";
import { AntDesignOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  DatePicker,
  Radio,
  Row,
  Col,
  Avatar,
  message,
  Form,
} from "antd";
import AvatarDump from "../../assets/images/avatardump.png";
import AvaDiscCustom from "../shared/AvaDIsc/discCustom";
import InputCustom from "../shared/Input/InputCustom";
import DatePickerCustom from "../shared/Input/DatePickerCustom";
import RadioCustomGroup from "../shared/RadioCustom";
import { useEffect, useState } from "react";
import ButtonCustom from "../shared/Button/ButtonCustom";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import {
  getUserProfile,
  UserProfile,
  updateProfile,
} from "@/src/services/user";
import "./style.css";
export default function ProfileForm() {
  const [form] = Form.useForm();
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getUserProfile();
        if (response?.data) {
          setProfile(response.data);
          setGender(response.data.gender);
          // Set form values
          form.setFieldsValue({
            username: response.data.username,
            gender: response.data.gender,
            measurements: `${response.data.chest || ""}-${
              response.data.waist || ""
            }-${response.data.hip || ""}`,
            height: response.data.height,
            weight: response.data.weight,
            email: response.data.email,
            armLength: response.data.armLength,
            legLength: response.data.legLength,
            torsoLength: response.data.torsoLength,
            shoulderWidth: response.data.shoulderWidth,
            description: response.data.description,
          });
        }
      } catch (error: any) {
        message.error(error.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Parse measurements string into individual values
      const [chest, waist, hip] = values.measurements
        .split("-")
        .map((val: string) => parseInt(val.trim()) || 0);

      const updateData = {
        username: values.username,
        gender: values.gender,
        height: parseInt(values.height) || 0,
        weight: parseInt(values.weight) || 0,
        chest,
        waist,
        hip,
        armLength: parseInt(values.armLength) || 0,
        legLength: parseInt(values.legLength) || 0,
        torsoLength: parseInt(values.torsoLength) || 0,
        shoulderWidth: parseInt(values.shoulderWidth) || 0,
        description: values.description,
      };

      const response = await updateProfile(updateData);
      if (response?.data) {
        setProfile(response.data);
        message.success("Cập nhật thông tin thành công");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-11 bg-white rounded-lg shadow-2xl w-full min-h-full">
      <div className="flex items-center gap-4 mb-6">
        <AvaDiscCustom
          iconSrc={AvatarDump.src}
          iconAlt="profile avatar"
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

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[32, 32]}>
          <Col span={6} className="w-[407px] h-[60px]">
            <Form.Item
              name="username"
              label={
                <span className="text-[20px] font-semibold">Tên của bạn</span>
              }
            >
              <InputCustom
                placeholder="Tên của bạn"
                className="w-full h-[60px]"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="gender"
              label={
                <span className="text-[20px] font-semibold">Giới tính</span>
              }
            >
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
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="measurements"
              label={
                <span className="text-[20px] font-semibold">Số đo 3 vòng</span>
              }
            >
              <InputCustom className="w-full h-[60px]" placeholder="v1-v2-v3" />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              name="height"
              label={
                <span className="text-[20px] font-semibold">Chiều cao</span>
              }
            >
              <InputCustom addonAfter="cm" className="w-full h-[60px]" />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              name="weight"
              label={
                <span className="text-[20px] font-semibold">Cân nặng</span>
              }
            >
              <InputCustom addonAfter="kg" className="w-full h-[60px]" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label={<span className="text-[20px] font-semibold">Email</span>}
            >
              <InputCustom
                type="email"
                placeholder="youremail@gmail.com"
                className="w-full h-[60px] "
                disabled
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="armLength"
              label={
                <span className="text-[20px] font-semibold">Chiều dài tay</span>
              }
            >
              <InputCustom addonAfter="cm" className="w-full h-[60px]" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="legLength"
              label={
                <span className="text-[20px] font-semibold">
                  Chiều dài chân
                </span>
              }
            >
              <InputCustom addonAfter="cm" className="w-full h-[60px]" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="torsoLength"
              label={
                <span className="text-[20px] font-semibold">
                  Chiều dài thân
                </span>
              }
            >
              <InputCustom addonAfter="cm" className="w-full h-[60px]" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="shoulderWidth"
              label={
                <span className="text-[20px] font-semibold">
                  Chiều rộng vai
                </span>
              }
            >
              <InputCustom addonAfter="cm" className="w-full h-[60px]" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label={<span className="text-[20px] font-semibold">Mô tả</span>}
          className="mt-6"
        >
          <Input.TextArea
            className="mt-2"
            rows={4}
            placeholder="Mô tả về bạn"
          />
        </Form.Item>

        <div className="comfirm p-10 w-full flex justify-end">
          <ButtonCustom
            htmlType="submit"
            className="!w-32 h-10 rounded-sm shadow-md font-semibold"
            loading={loading}
          >
            Lưu thay đổi
          </ButtonCustom>
        </div>
      </Form>
    </div>
  );
}
