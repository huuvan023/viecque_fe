import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel, ResponseModel } from "@Models/index";
import env from "@Env/index";
import axios, { AxiosResponse } from "axios";
import { Button, Image, Typography } from "antd";
import { useRouter } from "next/router";
import { convertDateTimeToDateString } from "@Utils/format-time-string";
import GetLocationString from "@Component/Layout/GetLocationString";
interface Props {
  data: GetFeedsModel | null;
}
export default function Detail({ data }: Props) {
  const router = useRouter();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <>
      <Layout>
        <div className="container home-screen">
          {data ? (
            <>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="card-detail-feed">
                    <div className="card-detail-feed-child">
                      <div className="image-box">
                        <Image
                          src={
                            data.branding?.resourceUrl ??
                            "/assets/imgs/icon/block-user.png"
                          }
                          width={50}
                          height={50}
                          alt="jobBox"
                        />
                      </div>
                      <div className="right-info">
                        <a className="name-job">{data.jobTitle}</a>
                        <span className="location-small">
                          {data.branding?.name}
                        </span>
                        <span className="size-box-width"></span>
                        <span className="card-time">
                          --<span> phút trước </span>
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
                        <span>{data.detailsAddress}</span>
                      </div>
                    </div>

                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="phone-icon font-bold">Phone</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>{data.phoneNumber}</span>
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
                          }).format(+data.salary)}{" "}
                          {`(${data.salaryUnit})`}
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
                        <span>{data.amount} người</span>
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
                          {data.jobType}
                          {/* {Jobtype.find((item) => item.value === data.jobType)?.label} */}
                        </span>
                      </div>
                    </div>

                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Phân loại việc làm</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        {/* <span>{data.jobCategoryId}</span> */}
                        {data.jobCate.name}
                      </div>
                    </div>

                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Thời gian bắt đầu</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          {convertDateTimeToDateString(data.timeToStart)}
                        </span>
                      </div>
                    </div>
                    <div className="card-detail-feed-child">
                      <div className="col-sm-4 col-5">
                        <span className="font-bold">Địa điểm</span>
                      </div>
                      <div className="col-sm-8 col-7">
                        <span>
                          {data.provinceId.name +
                            " - " +
                            data.districtId.name +
                            " - " +
                            data.wardId.name}
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
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  color: "red",
                }}
              >
                Tin không tồn tại!
              </div>
              <div className="text-center mt-30">
                <Button
                  block
                  onClick={() =>
                    router.push({
                      pathname: "/",
                    })
                  }
                >
                  <a className="name-job">Click quay về trang chủ!</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{
  props: Props;
}> {
  const { id = "" } = context.query;
  let dataResponse = null;
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${env}/public/feeds/by-id`,
    headers: {
      accept: "application/json",
      feedsId: id,
    },
  };
  try {
    const response = await (axios(config) as Promise<
      AxiosResponse<ResponseModel<GetFeedsModel>>
    >);
    dataResponse = response?.data?.data;
  } catch (error) {}

  return {
    props: {
      data: dataResponse,
    },
  };
}
