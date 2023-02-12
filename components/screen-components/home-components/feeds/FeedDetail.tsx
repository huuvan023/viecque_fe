import ImageAssets from "@Component/elements/ImageAssets";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FeedDetail({ data }: { data: any }) {
  const router = useRouter();
  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="card-detail-feed">
            <div className="card-detail-feed-child">
              <div className="save-box">
                <ImageAssets
                  className="save-icon"
                  src="assets/imgs/icon/save.png"
                  alt="JobBox"
                />
                <span>Lưu lại</span>
              </div>

              <div className="image-box">
                <img src="assets/imgs/brands/brand-2.png" alt="jobBox" />
              </div>
              <div className="right-info">
                <a className="name-job">Nhân viên bán hàng</a>
                <span className="location-small">Công ty test</span>
                <span className="size-box-width"></span>
                <span className="card-time">
                  5<span> minutes ago</span>
                </span>
              </div>
            </div>
          </div>
          <div className="card-detail-feed">
            <div className="card-detail-feed-child">
              <div className="col-sm-3 col-4">
                <span className="location-icon font-bold">Địa điểm</span>
              </div>
              <div className="col-sm-9 col-8">
                <span>764 Vo Van Kiet, Ward 1, District 5, Ho Chi Minh</span>
              </div>
            </div>
            <div className="card-detail-feed-child">
              <div className="col-sm-3 col-4">
                <span className="email-icon font-bold">Email</span>
              </div>
              <div className="col-sm-9 col-8">
                <span>doanthanhluc91bvh@gmail.com</span>
              </div>
            </div>
            <div className="card-detail-feed-child">
              <div className="col-sm-3 col-4">
                <span className="phone-icon font-bold">Phone</span>
              </div>
              <div className="col-sm-9 col-8">
                <span>097863571</span>
              </div>
            </div>
            <div className="card-detail-feed-child">
              <div className="col-sm-3 col-4">
                <span className="money-icon font-bold">Thù lao</span>
              </div>
              <div className="col-sm-9 col-8">
                <span>12.000.000 VNĐ/Tháng</span>
              </div>
            </div>
            <div className="p-2">
              <hr />
            </div>
            <div className="name-info">Thông tin</div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="card-detail-feed">
            <div className="card-detail-feed-child">
              <div className="right-info">
                <a className="name-job">Mô tả công việc</a>
                <p>
                  {`Join our team and put your skills to the test as our newest
                  backend website programmer. We're looking for a backend
                  programming superstar to join our team and bring our website
                  to new heights." Swag Soft is a leading mobile app development
                  company in Singapore and provides a comprehensive suite of
                  services, including application development services,
                  enterprise app development, game development, virtual reality
                  and augmented reality development and iBeacon technology. Our
                  experienced team of mobile apps developers in Singapore
                  creates iOS  apps using native
                  programming languages like Objective-C and C on the Xcode
                  platform.`}
                </p>
              </div>
            </div>
          </div>
          <div className="card-detail-feed">
            <div className="card-detail-feed-child">
              <div className="right-info">
                <a className="name-job">Yêu cầu công việc</a>
                <p>
                  {`Requirements: Have 2 - 3 years of experience in NodeJS-Express
                  Experience with using Databases such as MySQL, MongoDB
                  Experience with RESTful APIs Experience in Cloud Platform such
                  as AWS Having experience in building a single page application
                  with NextJs or ReactJs is an advantage Experience in HTML,
                  CSS/SCSS and JavaScript/ES6 Ability to analyze System Design.
                  Having experience in building big system is an advantage
                  Having the spirit to continuously strive for improvement and
                  betterment. Ability to work in groups as well as being
                  independent. Be responsible for work Nice-to-have Skills:
                  Proactive can-do attitude English communication skill`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
