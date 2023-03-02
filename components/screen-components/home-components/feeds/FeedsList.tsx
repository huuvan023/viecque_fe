/* eslint-disable @next/next/no-img-element */
import ImageAssets from "@Component/elements/ImageAssets";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel } from "@Models/index";
import { Routes } from "@Routes/routes";
import { Col, Row } from "antd";
import { useEffect } from "react";

interface Props {
  data: GetFeedsModel[];
}
export default function FeedsList({ data }: Props) {
  useEffect(() => {}, [data]);

  const saveFeedOnLocal = (feed: GetFeedsModel) => {
    const data: GetFeedsModel[] = localStorage.getItem("feeds")
      ? JSON.parse(localStorage.getItem("feeds")!)
      : [];

    if (data.find((item) => item.id === feed.id)) {
      return;
    }
    localStorage.setItem("feeds", JSON.stringify([...data, feed]));
  };
  const onDetailFeed = (id: string) => {
    window.open(`${Routes.detail}?id=${id}`);
  };
  return (
    <div className="row">
      {data.map((item, index) => {
        return (
          <div
            key={item.id ?? index}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            style={{ position: "relative", cursor: "pointer" }}
          >
            <div
              className="card-grid-2 hover-up"
              onClick={() => onDetailFeed(item.id)}
            >
              <div className="card-grid-2-image-left">
                <div className="image-box">
                  <img
                    src={item.branding.resourceUrl}
                    width={100}
                    height={100}
                    alt="jobBox"
                  />
                </div>
                <div className="right-info">
                  {/* <Link legacyBehavior href={`${Routes.detail}?id=${item.id}`}> */}
                  <a target="_blank" className="name-job">
                    {item.jobTitle}
                  </a>
                  {/* </Link> */}
                  <span className="location-small">{item.branding?.name}</span>
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
                    <Col flex="auto" className="text-left main-text-color-grey">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i className="fi-rr-marker mr-5 ml-0" />
                        <span style={{ fontWeight: 700, color: "#a0abb8" }}>
                          {item.provinceId?.name} - {item.districtId?.name}
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

            <div className="boxSaveBtn" onClick={() => saveFeedOnLocal(item)}>
              <ImageAssets
                className="save-feed-btn"
                src="assets/imgs/icon/save.png"
                alt="JobBox"
              />
              <span>Lưu lại</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
