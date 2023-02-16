import FeedDetail from "@Component/screen-components/home-components/feeds/FeedDetail";
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
  const feeds: CreateFeedModel = {
    brandId: "75a38d67-bbe7-464b-b9a9-8120801048b9",
    phoneNumber: "088173",
    provinceId: 8,
    districtId: 74,
    wardId: 2386,
    jobType: 1,
    salaryUnit: "Trả lương theo ngày",
    timeToStart: "2023-02-28",
    jobCategoryId: "Nhân viên quán ăn",
    description:
      "Join our team and put your skills to the test as our newest backend website programmer. We're looking for a backend programming superstar to join our team and bring our website to new heights.\" Swag Soft is a leading mobile app development company in Singapore and provides a comprehensive suite of services, including application development services, enterprise app development, game development, virtual reality and augmented reality development and iBeacon technology. Our experienced team of mobile apps developers in Singapore creates iOS apps using native programming languages like Objective-C and C on the Xcode platform.",
    salary: "500000",
    experience: "1",
    amountPeople: "10",
    jobTitle: "Junior Nodejs ",
    detailsAddress: "552-11 khu dân cư pl5",
    position: "Nhân viên",
  };

  const [brandById, setBrandById] = useState<BrandsModel>();

  useEffect(() => {
    // if (!createFeed.brandId) {
    //   router.push({
    //     pathname: Routes.createFeed,
    //   });
    //   return;
    // }
    // console.log(JSON.stringify(createFeed));
    (() => {
      getBrandById(feeds.brandId);
    })();
  }, [router]);

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
      const response = await apiFeedsAxios.createFeeds(feeds);
      setLoading(false);
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
          <FeedDetail data={feeds} brand={brandById!} />
          <div className="d-flex justify-content-end">
            <AppButton textBtn="Lưu tin và thanh toán" onClick={onSaveFeed} />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
