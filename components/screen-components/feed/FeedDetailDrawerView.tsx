/* eslint-disable @next/next/no-img-element */
import ImageAssets from "@Component/elements/ImageAssets";
import { Jobtype } from "@Constants/jobtype";
import { BrandsModel, GetFeedsModel } from "@Models/index";
import GetLocationString from "@Component/Layout/GetLocationString";
interface Props {
  data: GetFeedsModel;
  // brand: BrandsModel;
}
export default function FeedDetailDrawerView({ data }: Props) {
  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="card-detail-feed">
            <div className="card-detail-feed-child">
              {/* <div className="image-box">
                <img
                  src={brand?.resourceUrl}
                  width={50}
                  height={50}
                  alt="jobBox"
                />
              </div> */}
              <div className="right-info">
                <a className="name-job">{data.jobTitle}</a>
                {/* <span className="location-small">{brand?.name}</span> */}
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
                <span className="people-icon font-bold">Số người tuyển</span>
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
                <span>{data.jobType}</span>
              </div>
            </div>

            <div className="card-detail-feed-child">
              <div className="col-sm-4 col-5">
                <span className="font-bold">Phân loại việc làm</span>
              </div>
              <div className="col-sm-8 col-7">
                {/* <span>{data.jobCate?.name}</span> */}
              </div>
            </div>

            <div className="card-detail-feed-child">
              <div className="col-sm-4 col-5">
                <span className="font-bold">Thời gian bắt đầu</span>
              </div>
              <div className="col-sm-8 col-7">
                <span>
                  {/* {data.timeToStart} */}
                  {/* {`${data.timeToStart?.getDate()} - ${data.timeToStart?.getMonth()} - ${data.timeToStart?.getFullYear()}`} */}
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
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
