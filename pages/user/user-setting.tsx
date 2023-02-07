import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import { Tabs, TabsProps } from "antd";
import React from "react";
import UserInfo from "@Component/screen-components/user-components/user-info";
import UserBrands from "@Component/screen-components/user-components/user-brands";
import UserPassword from "@Component/screen-components/user-components/user-password";
import { useLoading } from "@Hooks/use-loading";

export default function UserSetting() {
  const onChange = (key: string) => {};
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin`,
      children: <UserInfo />,
    },
    {
      key: "2",
      label: `Thương hiệu`,
      children: <UserBrands />,
    },
    {
      key: "3",
      label: `Mật khẩu`,
      children: <UserPassword />,
    },
  ];

  return (
    <Authentication>
      <Layout>
        <div className="container user-profile-screen">
          <div className="row login-register-cover">
            <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Cài đặt tài khoản</h2>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
