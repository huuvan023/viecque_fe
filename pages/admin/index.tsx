import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import React, { useEffect } from "react";
import { Tabs, TabsProps } from "antd";
import JobCategoryComponent from "@Component/screen-components/admin-components/Jobcategory";
import ListUserComponent from "@Component/screen-components/admin-components/ListUser";
import ListFeedsAdmin from "@Component/screen-components/admin-components/ListFeedsAdmin";
export default function Home() {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "JobCategory",
      children: <JobCategoryComponent />,
    },
    {
      key: "2",
      label: "list user",
      children: <ListUserComponent />,
    },
    {
      key: "3",
      label: "list feeds",
      children: <ListFeedsAdmin />,
    },
  ];
  return (
    <>
      <Layout>
        <div className="container user-feeds-screen">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Trang quảng tri</h2>
            <Tabs defaultActiveKey="3" type="card" size="large" items={items} />
          </div>
        </div>
      </Layout>
    </>
  );
}
