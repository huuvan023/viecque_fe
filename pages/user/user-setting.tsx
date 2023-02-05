import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import AppInput from "@Component/elements/Input";
import { useLoading } from "@Hooks/use-loading";
import { BrandsModel, UserProfileModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Avatar, Button, Form, List, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

export default function UserSetting() {
  const { setLoading } = useLoading();
  const [openAddNumberPhone, setOpenAddNumberPhone] = useState(false);
  const [newNumberPhone, setNewNumberPhone] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
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
  // const [list, setList] = useState<any[]>([]);
  return (
    <Authentication>
      <Layout>
        <div className="container user-profile-screen">
          <div className="row login-register-cover">
            <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">
                  Xin chào {userProfile?.fullName}!
                </p>
                <h2 className="mt-10 mb-5 text-brand-1">Cài đặt tài khoản</h2>
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

                  <List
                    header={
                      <div className="list-number-phone">
                        Danh sách số điện thoại
                      </div>
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
                </Form>
              </div>
              <List
                header={
                  <div className="list-number-phone">Danh sách nhãn hiệu</div>
                }
                bordered
                className="demo-loadmore-list mt-4"
                itemLayout="horizontal"
                dataSource={userProfile?.brands}
                footer={
                  <Button className="list-add-btn">Thêm nhãn hiệu</Button>
                }
                renderItem={(item: BrandsModel) => (
                  <List.Item
                    actions={[
                      <button className="btn-edit-brands">Chỉnh sửa</button>,
                    ]}
                  >
                    <Skeleton avatar title={false} loading={false} active>
                      <List.Item.Meta
                        avatar={<Avatar src={item.resourceUrl} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.description}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
              <div className="text-right">
                <a className="btn btn-default btn-shadow ml-40 hover-up mb-3 mt-3">
                  Lưu thiết lập
                </a>
              </div>
            </div>
          </div>
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
      </Layout>
    </Authentication>
  );
}
