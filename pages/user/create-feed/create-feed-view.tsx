// import FeedDetail from "@Component/screen-components/home-components/feeds/FeedDetail";
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
import GetLocationString from "@Component/Layout/GetLocationString";
import { Jobtype } from "@Constants/jobtype";
import { Button, Image, Typography } from "antd";
import { convertDateTimeToDateString } from "@Utils/format-time-string";
import { apiPaymentAxios } from "@Axios/payment/api-payment";
export default function CreateFeedView() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { createFeed } = useCreateFeed();

  const [brandById, setBrandById] = useState<BrandsModel>();

  useEffect(() => {
    if (!createFeed.jobTitle) {
      router.push({
        pathname: Routes.createFeed,
      });
      return;
    }
    if (createFeed.brandId) {
      (() => {
        getBrandById(createFeed.brandId);
      })();
    }
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

  const onSaveFeed = async (isPayment: boolean) => {
    setLoading(true);
    try {
      const response = await apiFeedsAxios.createFeeds(createFeed!);
      openNotification("success", "Thành công", "Tạo tin thành công");

      if (isPayment) {
        console.log(response.data?.data);
        const feed = response.data?.data;
        onPayment({ feedsId: feed.id, description: feed.jobTitle });
      } else {
        router.push({
          pathname: Routes.userListFeeds,
        });
      }
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };
  const onPayment = async ({
    feedsId,
    description,
  }: {
    feedsId: string;
    description: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiPaymentAxios.momo({
        feedsId: feedsId,
        description: `Thanh toán đơn hàng ${description}`,
      });
      if (response.data?.message) {
        window.location.href = response.data?.message;
      }
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  return (
    <Authentication>
      <Layout>
        <div className="container home-screen">
          <StepCreateFeed currentStep={1} />
          <div style={{ height: 20 }}></div>
          {createFeed ? (
            <>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card-detail-feed">
                    <div className="card-detail-feed-child">
                      <div className="image-box">
                        <Image
                          src={brandById?.resourceUrl}
                          width={50}
                          height={50}
                          alt="jobBox"
                        />
                      </div>
                      <div className="right-info">
                        <a className="name-job">{createFeed.jobTitle}</a>
                        <span className="size-box-width"></span>
                        <span className="card-time">
                          <span> Đang tạo tin </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-detail-feed">
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="location-icon font-bold">
                          Địa điểm chi tiết
                        </span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>{createFeed.detailsAddress}</span>
                      </div>
                    </div>

                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="phone-icon font-bold">Phone</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>{createFeed.phoneNumber}</span>
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="money-icon font-bold">Thù lao</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(+createFeed.salary)}{" "}
                          {`(${createFeed.salaryUnit})`}
                        </span>
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="people-icon font-bold">
                          Số người tuyển
                        </span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>{createFeed.amountPeople} người</span>
                      </div>
                    </div>

                    <div className="p-2">
                      <hr />
                    </div>
                    <div className="name-info">Thông tin chi tiết</div>

                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Loại việc làm</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          {
                            Jobtype.find(
                              (item) => item.value === createFeed.jobType
                            )?.label
                          }
                        </span>
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Thời gian làm việc</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: createFeed.workingTime,
                          }}
                        />
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Thời gian bắt đầu</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          {convertDateTimeToDateString(createFeed.timeToStart)}
                        </span>
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Địa điểm</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          <GetLocationString
                            districtId={createFeed.districtId}
                            provinceId={createFeed.provinceId}
                            wardId={createFeed.wardId}
                          />
                        </span>
                      </div>
                    </div>

                    <div style={{ height: 20 }}></div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card-detail-feed">
                    <div className="card-detail-feed-child">
                      <div className="right-info p-2">
                        <a className="name-job">Mô tả công việc</a>

                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: createFeed.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="d-flex justify-content-end align-items-center">
            <AppButton
              textBtn="Hủy tin"
              onClick={() => {
                router.push({
                  pathname: Routes.home,
                });
              }}
              style={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid",
              }}
            />

            <AppButton textBtn="Lưu tin nháp" onClick={onSaveFeed} />
            <AppButton
              textBtn="Lưu tin và thanh toán"
              onClick={() => onSaveFeed(true)}
            />
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
