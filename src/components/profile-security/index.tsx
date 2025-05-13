import React from "react";
import InputPasswordCustom from "../shared/Input/InputPasswordCustom";
import ButtonCustom from "../shared/Button/ButtonCustom";
import BoxDisc from "../shared/BoxDisc";

function Security() {
  return (
    <div className="profile-security p-11 bg-white rounded-lg shadow-2xl w-full h-full flex flex-col">
      <div className="profile-security_top flex-1 ">
        <h2 className="text-xl font-semibold">Mật khẩu của bạn</h2>
        <InputPasswordCustom
          placeholder="*****************"
          className="w-full h-[60px] mt-10"
        />
        <InputPasswordCustom
          placeholder="Nhập mật khẩu mới"
          className="w-full h-[60px] mt-10"
        />
        <InputPasswordCustom
          placeholder="Xác nhận"
          className="w-full h-[60px] mt-10 "
        />
        <div className="comfirm p-10 w-full flex justify-end">
          <ButtonCustom className="!w-32 h-10 rounded-sm shadow-md font-semibold">
            Lưu thay đổi
          </ButtonCustom>
        </div>
      </div>
      <div className="profile-security_bottom flex-1">
        <h2 className="text-xl font-semibold">Kiểm tra bảo mật</h2>
        <BoxDisc title="Nơi bạn đăng nhập" className="text-gray-400" />
        <BoxDisc title="Cảnh báo đăng nhập" className="text-gray-400" />
        <BoxDisc title="Email đã liên kết" className="text-gray-400" />
      </div>
    </div>
  );
}

export default Security;
