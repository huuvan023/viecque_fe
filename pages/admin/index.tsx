import Layout from "@Component/Layout/Layout";
 import React, { useEffect } from "react";
import { Tabs, TabsProps } from "antd";
import JobCategoryComponent from "@Component/screen-components/admin-components/Jobcategory";
import ListUserComponent from "@Component/screen-components/admin-components/ListUser";
import ListFeedsAdmin from "@Component/screen-components/admin-components/ListFeedsAdmin";
import { useRole } from "@Hooks/use-role";
import { openNotification } from "@Utils/notification";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import Authentication from "@Component/auth/Auth";
export default function Home() {
  const { isRole } = useRole();
  const router = useRouter();
  useEffect(() => {
    if (isRole === "RECRUITER") {
      openNotification(
        "error",
        "Thất bại",
        "Bạn không có quyền truy cập vào trang này!"
      );
      router.push({
        pathname: Routes.home,
      });
    }
  }, [isRole]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "list feeds",
      children: <ListFeedsAdmin />,
    },
    {
      key: "2",
      label: "JobCategory",
      children: <JobCategoryComponent />,
    },
    {
      key: "3",
      label: "list user",
      children: <ListUserComponent />,
    },
  ];
  return (
    <Authentication>
      <Layout>
        <div className="container user-feeds-screen">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Trang quảng tri</h2>
            {isRole === "ADMIN" ? (
              <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={items}
              />
            ) : null}
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
