import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import { useRouter } from "next/router";
import { Button, Result } from "antd";
import { Routes } from "@Routes/routes";
import { apiFeedsAxios } from "@Axios/user/api-feeds";
import { apiPublicAxios } from "@Axios/public/api-public";
import { GetFeedsModel } from "@Models/index";

type Status = "success" | "error";
export default function Detail() {
  const router = useRouter();
  const { setLoading } = useLoading();
  const [status, setStatus] = useState<Status>("success");
  const [errorMsg, setErrorMsg] = useState("");
  const [feedData, setFeedData] = useState<GetFeedsModel>();
  useEffect(() => {
    const { query } = router;

    if (query?.result === "SUCCESS") {
      setStatus("success");
    } else {
      setStatus("error");
    }
    if (query.errorMsg) {
      setErrorMsg(query.errorMsg as string);
    }
    const feedID = router.query.feedsId as string;
    if (feedID) {
      (async () => {
        try {
          const response = await apiPublicAxios.getFeedsById(feedID || "");
          setFeedData(response.data.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      })();
    }
  }, [router]);

  const onGoHome = () => {
    setLoading(true);
    router.push({
      pathname: Routes.home,
    });
  };
  if (!feedData) {
    return;
  }
  return (
    <>
      {feedData?.feedsStatus === "PAID" ? (
        <Layout>
          <div className="container home-screen">
            <Result
              status={status}
              title={
                status === "success"
                  ? "Thanh toán thành công"
                  : "Thanh toán thất bại"
              }
              subTitle={`Dơn hàng ${feedData?.jobTitle}`}
              extra={[
                <Button type="primary" key="console" onClick={onGoHome}>
                  Trở về trang chủ
                </Button>,
              ]}
            />
          </div>
        </Layout>
      ) : (
        <Layout>
          <div className="container home-screen">
            <Result
              status="warning"
              title="Đơn hàng chưa được thanh toán"
              subTitle={`Đơn hàng ${feedData?.jobTitle}`}
              extra={[
                <Button type="primary" key="console" onClick={onGoHome}>
                  Trở về trang chủ
                </Button>,
              ]}
            />
          </div>
        </Layout>
      )}
    </>
  );
}
