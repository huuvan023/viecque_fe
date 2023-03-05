import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import React, { useEffect } from "react";
import { useLoading } from "@Hooks/use-loading";
import TabFeeds from "@Component/screen-components/user-feeds-components/TabFeeds";

export default function UserFeeds() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Authentication>
      <Layout>
        <div className="container user-feeds-screen">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1">Quản lý tin</h2>
            <TabFeeds />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
