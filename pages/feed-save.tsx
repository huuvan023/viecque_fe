/* eslint-disable @next/next/no-img-element */
import ImageAssets from "@Component/elements/ImageAssets";
import Layout from "@Component/Layout/Layout";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel } from "@Models/index";
import { Routes } from "@Routes/routes";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";

export default function FeedsSave() {
  const [data, setData] = useState<GetFeedsModel[]>([]);
  const { setLoading } = useLoading();
  useEffect(() => {
    const data: GetFeedsModel[] = localStorage.getItem("feeds")
      ? JSON.parse(localStorage.getItem("feeds")!)
      : [];
    setData(data);
    setLoading(false);
  }, []);

  const removeFeedOnLocal = (feed: GetFeedsModel) => {
    const data: GetFeedsModel[] = localStorage.getItem("feeds")
      ? JSON.parse(localStorage.getItem("feeds")!)
      : [];

    const newData = data.filter((item) => item.id !== feed.id);
    localStorage.setItem("feeds", JSON.stringify(newData));
    setData(newData);
  };
  const onDetailFeed = (id: string) => {
    window.open(`${Routes.detail}?id=${id}`);
  };
  return (
    <>
      <Layout>
        <div className="container home-screen">
          <div style={{ height: "20px" }}></div>
          <div className="row">
            {data.map((item, index) => {
              return (
                <div
                  key={item.id ?? index}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-2"
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <div
                    className="card-grid-2 hover-up h-100"
                    onClick={() => onDetailFeed(item.id)}
                  >
                    <div className="card-grid-2-image-left">
                      <div className="image-box">
                        <img
                          src={
                            item.branding?.resourceUrl ??
                            "/assets/imgs/icon/block-user.png"
                          }
                          width={50}
                          height={50}
                          alt="jobBox"
                        />
                      </div>
                      <div className="right-info">
                        {/* <Link legacyBehavior href={`${Routes.detail}?id=${item.id}`}> */}
                        <a target="_blank" className="name-job">
                          {item.jobTitle}
                        </a>
                        {/* </Link> */}
                        <span className="location-small">
                          {item.branding?.name}
                        </span>
                        <span className="size-box-width"></span>
                        <span className="card-time">
                          5<span> minutes ago</span>
                        </span>
                      </div>
                    </div>
                    <div className="card-block-info">
                      <p className="font-sm color-text-paragraph text-left text-description-card">
                        {item.description}
                      </p>
                      <div className="card-2-bottom mt-10">
                        <Row>
                          <Col
                            flex="auto"
                            className="text-left main-text-color-grey"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i className="fi-rr-marker mr-5 ml-0" />
                              <span
                                style={{ fontWeight: 700, color: "#a0abb8" }}
                              >
                                {item.provinceId?.name} -{" "}
                                {item.districtId?.name}
                              </span>
                            </div>
                          </Col>
                          <Col>
                            <span style={{ fontWeight: 700, color: "#a0abb8" }}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(+item.salary)}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>

                  <div
                    className="boxSaveBtn boxSaveBtnActive"
                    onClick={() => removeFeedOnLocal(item)}
                  >
                    <ImageAssets
                      className="save-feed-btn"
                      src="assets/imgs/icon/save.png"
                      alt="JobBox"
                    />
                    <span>Bỏ lưu</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
