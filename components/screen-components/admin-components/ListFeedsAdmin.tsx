import { apiAdminAxios } from "@Axios/admin/api-admin";
import AppPagination from "@Component/elements/AppPagination";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel, PaginationModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Button, Col, Popover, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ListFeedsAdmin() {
  const [data, setdata] = useState<GetFeedsModel[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const { setLoading } = useLoading();
  useEffect(() => {
    (async () => {
      getAdminFeeds();
    })();
  }, [pagination]);

  const getAdminFeeds = async () => {
    try {
      const response = await apiAdminAxios.getAllFeeds({
        ...pagination,
      });
      setdata(response.data.data);
      const total = response.data.totalRecord;
      setTotal(total!);
      setLoading(false);
    } catch (error: any) {
      const message = error.response?.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const Menu = (
    <div>
      <div className="button-menu">
        <a>approve</a>
      </div>
      <div className="button-menu">
        <a>decline</a>
      </div>
    </div>
  );
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
                <div className="image-box">
                  <img
                    src="https://res.cloudinary.com/huuvan/image/upload/v1676592997/viecque/brands/9562396b-b9ef-4f7a-8d66-c2d7f35159ce/eRSJvOyUd.png"
                    alt="jobBox"
                  />
                </div>
                <div className="right-info">
                  <a target="_blank" className="name-job">
                    {item.jobTitle}
                  </a>

                  <span className="location-small">Công ty test</span>
                  <span className="size-box-width"></span>
                  <span className="card-time">
                    5<span> minutes ago</span>
                  </span>
                </div>
                <div>
                  <Popover
                    placement="bottomRight"
                    title={<span>Menu</span>}
                    content={Menu}
                    trigger="click"
                  >
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      type="dashed"
                    >
                      <MenuOutlined />
                    </Button>
                  </Popover>
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
      <AppPagination
        handlePagination={(pagination) => {
          setPagination(pagination);
        }}
        pagination={pagination}
        total={total}
      />
    </div>
  );
}
