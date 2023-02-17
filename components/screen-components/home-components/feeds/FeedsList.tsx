import ImageAssets from "@Component/elements/ImageAssets";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel } from "@Models/index";
import { Routes } from "@Routes/routes";
import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  data: GetFeedsModel[];
  onSaveBtn?: boolean;
}
export default function FeedsList({ data, onSaveBtn }: Props) {
  const { setLoading } = useLoading();
  // const [brandById, setBrandById] = useState<BrandsModel>();

  useEffect(() => {}, [data]);
  // const getBrandById = async (id: string) => {
  //   try {
  //     const response = await apiBrandsAxios.getBrandById(id);
  //     setBrandById(response.data.data[0]);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="row">
      {data.map((item, index) => {
        return (
          <div
            key={item.id ?? index}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
          >
            <div className="card-grid-2 hover-up">
              <div className="card-grid-2-image-left">
                {onSaveBtn ? (
                  <div className="save-box">
                    <ImageAssets
                      className="save-icon"
                      src="assets/imgs/icon/save.png"
                      alt="JobBox"
                    />
                    <span>Lưu lại</span>
                  </div>
                ) : null}

                <div className="image-box">
                  <img src="https://res.cloudinary.com/huuvan/image/upload/v1676592997/viecque/brands/9562396b-b9ef-4f7a-8d66-c2d7f35159ce/eRSJvOyUd.png" alt="jobBox" />
                </div>
                <div className="right-info">
                  <Link legacyBehavior href={`${Routes.detail}?id=${item.id}`}>
                    <a target="_blank" className="name-job">
                      {item.jobTitle}
                    </a>
                  </Link>
                  <span className="location-small">Công ty test</span>
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
          </div>
        );
      })}
    </div>
  );
}
