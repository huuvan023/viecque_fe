import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import React, { useEffect, useState } from "react";

import { useLoading } from "@Hooks/use-loading";
import { Tabs, TabsProps } from "antd";
import MyTabFeeds from "@Component/screen-components/feeds-components/MyTabFeed";
import TabFeedsNoActive from "@Component/screen-components/feeds-components/TabNoActive";

export default function UserFeeds() {
  const { setLoading } = useLoading();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tin của bạn",
      children: <MyTabFeeds />,
    },
    {
      key: "2",
      label: "Tin hết hạn",
      children: <TabFeedsNoActive />,
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
