import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import { useLoading } from "@Hooks/use-loading";
import { UpdatePassword } from "@Models/index";
import { Routes } from "@Routes/routes";
import { openNotification } from "@Utils/notification";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

export default function UserPassword({}: Props) {
  const { setLoading } = useLoading();
  useEffect(() => {}, []);
  const router = useRouter();
  const onFinish = async (settingPassword: UpdatePassword) => {
    savePassword(settingPassword);
    setLoading(true);
  };
  const savePassword = async (settingPassword: UpdatePassword) => {
    try {
      const response = await apiUserProfileAxios.updatePassword(
        settingPassword
      );
      openNotification("success", "Thành công", "Cập nhật mật khẩu thành công");
      router.push(Routes.home);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        "Mật khẩu củ sai vui lòng nhập lại"
      );
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-register text-start mt-20"
        action="#"
      >
        <AppInput
          required={true}
          label="Mật khẩu củ"
          placeholder="Mật khẩu củ"
          name="oldPassword"
          requiredMessage="Vui lòng điền mật khẩu củ"
        />
        <AppInput
          required={true}
          label="Mật khẩu mới"
          placeholder="Mật khẩu mới"
          requiredMessage="Vui lòng điền mật khẩu mới"
          name="newPassword"
        />
        <div className="text-right">
          <AppButton textBtn="Lưu thiết lập" onClick={() => {}} type="submit" />
        </div>
      </Form>
      <div className="text-right"></div>
    </>
  );
}
