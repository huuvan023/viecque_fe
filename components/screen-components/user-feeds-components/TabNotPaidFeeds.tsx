import { useLoading } from "@Hooks/use-loading";
import React, { useEffect, useState } from "react";
import { apiFeedsAxios } from "@Axios/user/api-feeds";
import { PaginationModel } from "@Models/pagination.model";
import { GetFeedsModel } from "@Models/index";
import AppPagination from "@Component/elements/AppPagination";
import { openNotification } from "@Utils/notification";
import { Button, Col, Drawer, Image, Popover, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Routes } from "react-router-dom";
import FeedDetailDrawerView from "../feed/FeedDetailDrawerView";
import EditFeed from "./EditFeed";

const TabNotPaidFeeds = () => {
  const [data, setData] = useState<GetFeedsModel[]>([]);
  const { setLoading } = useLoading();
  const [feed, setFeed] = useState<GetFeedsModel | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [feedEdit, setFeedEdit] = useState<GetFeedsModel | null>(null);

  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getRecruiterFeeds();
    setLoading(true);
  }, [pagination]);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setFeed(null);
  };
  const onOpenDrawer = (feed: GetFeedsModel) => {
    setOpenDrawer(true);
    setFeed(feed);
  };
  const getRecruiterFeeds = async () => {
    try {
      const response = await apiFeedsAxios.getRecruiterNotPaidFeeds(pagination);
      setData(response.data.data);
      const total = response.data.totalRecord;
      setTotal(total!);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const onHideFeed = async (id: string) => {
    setLoading(true);
    try {
      const response = await apiFeedsAxios.putHideFeeds(id);
      openNotification("success", "Thành công", "Ẩn tin thành công");

      getRecruiterFeeds();
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const onDeleteFeed = async (id: string) => {
    setLoading(true);
    try {
      const response = await apiFeedsAxios.deleteFeeds(id);
      openNotification("success", "Thành công", "Xóa tin thành công");
      getRecruiterFeeds();
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="row">
        {data.map((item, index) => {
          return (
            <div
              key={item.id + index}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-2"
              style={{ position: "relative", cursor: "pointer" }}
            >
              <div
                className="card-grid-2 hover-up h-100"
                onClick={() => onOpenDrawer(item)}
              >
                <div className="card-grid-2-image-left">
                  <div className="image-box">
                    <Image
                      width={50}
                      height={50}
                      src={item.branding?.resourceUrl ?? "/assets/imgs/icon/block-user.png"}
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
                </div>
                <div className="card-block-info">
                  <p className="font-sm color-text-paragraph text-left text-description-card">
                    {item.description}
                  </p>
                  <p
                    className="font-sm color-text-paragraph text-left text-description-card"
                    style={{ color: "red" }}
                  >
                    Trạng thái tin: {item.feedsStatus}
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
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                }}
              >
                <Popover
                  placement="bottomRight"
                  title={<span>Menu</span>}
                  content={
                    <div>
                      <div className="button-menu">
                        <a>Thanh toán</a>
                      </div>
                      <div
                        className="button-menu"
                        onClick={() => setFeedEdit(item)}
                      >
                        <a>Chỉnh sửa tin</a>
                      </div>
                      <div
                        className="button-menu"
                        onClick={() => onHideFeed(item.id)}
                      >
                        <a>Ẩn tin</a>
                      </div>
                      <div
                        className="button-menu"
                        onClick={() => onDeleteFeed(item.id)}
                      >
                        <a>Xóa tin</a>
                      </div>
                    </div>
                  }
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
          );
        })}
      </div>

      <AppPagination
        handlePagination={(pagination) => {
          setPagination(pagination);
        }}
        pagination={pagination}
        total={total}
      />
      <Drawer
        title="Chi tiết tin"
        placement="bottom"
        height="90%"
        onClose={onCloseDrawer}
        open={openDrawer}
      >
        {feed ? <FeedDetailDrawerView data={feed} /> : null}
      </Drawer>
      <EditFeed
        feed={feedEdit!}
        openEditFeed={!!feedEdit}
        onCloseEditFeed={() => setFeedEdit(null)}
      />
    </>
  );
};
export default TabNotPaidFeeds;
