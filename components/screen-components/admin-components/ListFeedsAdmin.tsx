import { apiAdminAxios } from "@Axios/admin/api-admin";
import AppPagination from "@Component/elements/AppPagination";
import { useLoading } from "@Hooks/use-loading";
import { GetFeedsModel, PaginationModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Popover,
  Row,
  Select,
  Space,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import SearchComponent from "@Component/elements/Search";
import FeedDetailAdminView from "../feed/FeedDetailDrawerView";
import { FilterStatus } from "@Constants/filter-status";

const { RangePicker } = DatePicker;
export default function ListFeedsAdmin() {
  const { setLoading } = useLoading();

  const [data, setdata] = useState<GetFeedsModel[]>([]);
  const [feed, setFeed] = useState<GetFeedsModel | null>(null);
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterUserId, setFilterUserId] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [total, setTotal] = useState(0);
  const [userList, setuserList] = useState<any[]>([]);

  const getAllUser = async () => {
    try {
      const response = await apiAdminAxios.getAllUser();
      setuserList(response.data.data);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };

  useEffect(() => {
    (async () => {
      getAdminFeeds();
      getAllUser();
    })();
  }, [pagination, filterStatus, filterUserId]);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setFeed(null);
  };
  const getAdminFeeds = async () => {
    try {
      const response = await apiAdminAxios.getAllFeeds({
        ...pagination,
        statuses: filterStatus,
        userIds: filterUserId,
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

  const onOpenDrawer = (feed: GetFeedsModel) => {
    setOpenDrawer(true);
    setFeed(feed);
  };
  const onDeclineJob = async (id: string) => {
    try {
      const response = await apiAdminAxios.declineFeed(id);
      openNotification("success", "Thành công", "Decline job thành công");
    } catch (error: any) {
      const message = error.response?.data.message;
      openNotification("error", "Thất bại", message);
    }
  };
  const onApproveFeed = async (id: string) => {
    try {
      const response = await apiAdminAxios.approveFeed(id);

      openNotification("success", "Thành công", "Approve job thành công");
    } catch (error: any) {
      const message = error.response?.data.message;
      openNotification("error", "Thất bại", message);
    }
  };
  const onFilterStatus = (value: any) => {
    setFilterStatus(value);
  };
  const onFilterUserid = (value: any) => {
    setFilterUserId(value);
  };

  return (
    <div className="row">
      {/* <SearchComponent onSearch={(value) => console.log(value)} /> */}
      <Select
        mode="tags"
        size="large"
        placeholder="Status"
        onChange={onFilterStatus}
        style={{ width: "100%", marginBottom: "10px" }}
        options={FilterStatus}
      />
      <Select
        mode="tags"
        size="large"
        placeholder="userid"
        onChange={onFilterUserid}
        style={{ width: "100%", marginBottom: "10px" }}
        options={userList.map((item) => ({
          value: item.userId,
          label: item.username,
        }))}
      />
      <div style={{ width: "100%", marginBottom: "10px" }}>
        <RangePicker style={{ width: "100%" }} size="large" />
      </div>
      {data?.map((item, index) => {
        return (
          <div
            key={item.id ?? index}
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            style={{ position: "relative", cursor: "pointer" }}
          >
            <div
              className="card-grid-2 hover-up"
              onClick={() => onOpenDrawer(item)}
            >
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
                    <div
                      className="button-menu"
                      onClick={() => onApproveFeed(item.id)}
                    >
                      <a>approve</a>
                    </div>
                    <div
                      className="button-menu"
                      onClick={() => onDeclineJob(item.id)}
                    >
                      <a>decline</a>
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
        {feed ? <FeedDetailAdminView data={feed} /> : null}
      </Drawer>
    </div>
  );
}
