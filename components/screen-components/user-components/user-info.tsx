import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import { useLoading } from "@Hooks/use-loading";
import { UserProfileModel } from "@Models/index";
import { Routes } from "@Routes/routes";
import { openNotification } from "@Utils/notification";
import { Button, Form, List, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function UserInfo() {
  const { setLoading } = useLoading();
  const [openAddNumberPhone, setOpenAddNumberPhone] = useState(false);
  const [newNumberPhone, setNewNumberPhone] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
  const router = useRouter();
  useEffect(() => {
    getDataUser();
  }, []);

  const onAddNumberPhone = () => {
    setOpenAddNumberPhone(false);
    if (!newNumberPhone) {
      return;
    }
    const newUserProfile = { ...userProfile! };
    newUserProfile.phoneNumber.push(newNumberPhone);
    setUserProfile(newUserProfile);
    setNewNumberPhone("");
  };

  const getDataUser = async () => {
    try {
      const response = await apiUserProfileAxios.getUserProfile();
      setUserProfile(response.data.data);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };

  const onSaveSetting = async () => {
    const { fullName, phoneNumber } = userProfile!;
    if (!fullName) {
      return openNotification("error", "Thất bại", "Vui lòng điền Họ và tên");
    }
    setLoading(true);
    try {
      const response = await apiUserProfileAxios.updateUserProfle({
        fullName,
        listPhoneNumbers: phoneNumber,
      });
      openNotification(
        "success",
        "Thành công",
        "Cập nhật thông tin tài khoản thành công"
      );
      router.push(Routes.home);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  return (
    <>
      <Form
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        className="login-register text-start mt-20"
        action="#"
      >
        <AppInput
          disabled={true}
          label="Email"
          placeholder="Email"
          name="email"
          value={userProfile?.email}
        />
        <AppInput
          required={true}
          label="Họ và tên"
          placeholder="Họ và tên"
          name="fullName"
          value={userProfile?.fullName}
          onChange={(event) => {
            const newUserProfile = { ...userProfile! };
            newUserProfile.fullName = event.target.value;
            setUserProfile(newUserProfile);
          }}
        />
      </Form>
      <List
        header={
          <div className="list-number-phone">Danh sách số điện thoại</div>
        }
        bordered
        dataSource={userProfile?.phoneNumber}
        footer={
          <Button
            className="list-add-btn"
            onClick={() => setOpenAddNumberPhone(true)}
          >
            Thêm số điện thoại
          </Button>
        }
        renderItem={(item, index) => (
          <List.Item>
            <div className="list-number-phone-item">
              <span>{item}</span>
            </div>
          </List.Item>
        )}
      />
      <div className="text-right">
        <AppButton textBtn="Lưu thiết lập" onClick={onSaveSetting} />
      </div>
      <>
        <Modal
          title="Thêm số điện thoại"
          open={openAddNumberPhone}
          onOk={onAddNumberPhone}
          onCancel={() => {
            setOpenAddNumberPhone(false);
            setNewNumberPhone("");
          }}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form>
            <AppInput
              required={false}
              label="Số điện thoại"
              placeholder="Số điện thoại"
              name="numberPhone"
              type="number"
              value={newNumberPhone}
              onChange={(event) => {
                setNewNumberPhone(event.target.value);
              }}
            />
          </Form>
        </Modal>
      </>
    </>
  );
}
