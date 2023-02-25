// import FeedDetail from "@Component/screen-components/home-components/feeds/FeedDetail";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import { useCreateFeed } from "@Hooks/use-create-feed";
import { Routes } from "@Routes/routes";
import { BrandsModel, CreateFeedModel } from "@Models/index";
import StepCreateFeed from "@Component/screen-components/create-feeds-components/Steps";
import { apiBrandsAxios } from "@Axios/user/api-brands";
import Authentication from "@Component/auth/Auth";
import AppButton from "@Component/elements/AppButton";
import { apiFeedsAxios } from "@Axios/user/api-feeds";
import { openNotification } from "@Utils/notification";

export default function CreateFeedView() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { createFeed } = useCreateFeed();

  const [brandById, setBrandById] = useState<BrandsModel>();

  useEffect(() => {
    if (!createFeed.brandId) {
      router.push({
        pathname: Routes.createFeed,
      });
      return;
    }
    (() => {
      getBrandById(createFeed.brandId);
    })();
  }, [router, createFeed]);

  const getBrandById = async (id: string) => {
    try {
      const response = await apiBrandsAxios.getBrandById(id);
      setBrandById(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSaveFeed = async () => {
    setLoading(true);
    try {
      const response = await apiFeedsAxios.createFeeds(createFeed);
      openNotification("success", "Thành công", "Tạo tin thành công");
      router.push({
        pathname: Routes.userListFeeds,
      });
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };

  return (
    <Authentication>
      <Layout>
        <div className="container home-screen">
          <StepCreateFeed currentStep={1} />
          <div style={{ height: 20 }}></div>
          {/* <FeedDetail data={createFeed} brand={brandById!} /> */}
          <div className="d-flex justify-content-end">
            <AppButton textBtn="Lưu tin và thanh toán" onClick={onSaveFeed} />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
