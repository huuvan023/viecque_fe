import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import React, { useEffect } from "react";
import { useLoading } from "@Hooks/use-loading";
import { Tabs, TabsProps } from "antd";
import TabFeeds from "@Component/screen-components/user-feeds-components/TabFeeds";
import TabFeedsNoActive from "@Component/screen-components/user-feeds-components/TabNotPaidFeeds";
import TabReportedFeeds from "@Component/screen-components/user-feeds-components/TabReportedFeeds";

export default function UserFeeds() {
  const { setLoading } = useLoading();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả tin",
      children: <TabFeeds />,
    },
    {
      key: "2",
      label: "Tin nháp",
      children: <TabFeedsNoActive />,
    },
    {
      key: "3",
      label: "Tin reported",
      children: <TabReportedFeeds />,
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Authentication>
      <Layout>
        <div className="container user-feeds-screen">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Quản lý tin</h2>
            <Tabs defaultActiveKey="1" type="card" size="large" items={items} />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
