import { apiPublicAxios } from "@Axios/public/api-public";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import AppLocation from "@Component/Layout/AppLocation";
import { Jobtype } from "@Constants/jobtype";
import { useLoading } from "@Hooks/use-loading";
import UserBrands from "@Component/screen-components/user-components/user-brands";
import dayjs from "dayjs";
import {
  BrandsModel,
  GetFeedsModel,
  JobCategoryModel,
  LocationDataModel,
  UpdateFeedModel,
} from "@Models/index";
import { openNotification } from "@Utils/notification";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Image,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { apiFeedsAxios } from "@Axios/user/api-feeds";

interface Props {
  feed: GetFeedsModel;
  onCloseEditFeed: (isClose: boolean) => void;
  openEditFeed: boolean;
}
export default function EditFeed(props: Props) {
  useEffect(() => {
    if (!props.feed) {
      return;
    }
    const { feed } = props;

    (async () => {
      getJobCategoryList();
      setLoading(false);
    })();

    setBrand(feed.branding);
    setJobTitle(feed.jobTitle);
    setDetailsAddress(feed.detailsAddress);
    setPhoneNumber(feed.phoneNumber);
    setJobType(Jobtype.find((item) => item.label === feed.jobType)?.value);
    setWorkingTime(feed.workingTime);
    setSalary(feed.salary);
    setAmountPeople(feed.amount);
    setDescription(feed.description);
    setTimeToStart(new Date(feed.timeToStart));
    setSalaryUnit(feed.salaryUnit);
    setJobCategoryId(feed.jobCate.id);
  }, [props.feed]);

  const [isChooseBrands, setIschooseBrands] = useState(false);
  const { setLoading } = useLoading();

  const [brand, setBrand] = useState<BrandsModel>();
  const [locationData, setLocationData] = useState<LocationDataModel>();
  const [jobType, setJobType] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salaryUnit, setSalaryUnit] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [jobCategoryList, setJobCategoryList] = useState<JobCategoryModel[]>(
    []
  );
  const [timeToStart, setTimeToStart] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState("");
  const [detailsAddress, setDetailsAddress] = useState("");
  const [salary, setSalary] = useState(50000);
  const [amountPeople, setAmountPeople] = useState(1);

  const getJobCategoryList = async () => {
    try {
      const response = await apiPublicAxios.getJobCate();
      setJobCategoryList(response.data.data);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const onUpdateFeed = async () => {
    if (!brand) {
      openNotification("error", "Thất bại", "Vui lòng chọn thương hiệu!");
      return;
    }
    if (!locationData) {
      openNotification("error", "Thất bại", "Vui lòng chọn vị trí!");
      return;
    }
    if (!jobType) {
      openNotification(
        "error",
        "Thất bại",
        "Vui lòng chọn loại thời gian làm việc!"
      );
      return;
    }
    if (!jobCategoryId) {
      openNotification("error", "Thất bại", "Vui lòng danh mục công việc!");
      return;
    }
    if (!salaryUnit) {
      openNotification("error", "Thất bại", "Vui lòng chọn chế độ trả lương!");
      return;
    }
    if (!timeToStart) {
      openNotification("error", "Thất bại", "Vui lòng chọn thời gian bắt đầu!");
      return;
    }
    if (!description) {
      openNotification("error", "Thất bại", "Vui lòng điền mô tả công việc!");
      return;
    }
    if (!workingTime) {
      openNotification(
        "error",
        "Thất bại",
        "Vui lòng điền thời gian làm việc trong ngày67!"
      );
      return;
    }

    const data: UpdateFeedModel = {
      id: props.feed.id,
      brandId: brand.brandId!,
      provinceId: locationData.provinceId!,
      districtId: locationData.districtId!,
      wardId: locationData.wardId!,
      jobType: jobType!,
      salaryUnit: salaryUnit,
      timeToStart: timeToStart,
      jobCategoryId: jobCategoryId,
      description: description,
      salary: salary.toString(),
      amountPeople: amountPeople.toString(),
      jobTitle: jobTitle,
      detailsAddress: detailsAddress,
      phoneNumber: phoneNumber,
      workingTime: workingTime,
    };
    onSaveFeed(data);
    setLoading(true);
  };
  const onSaveFeed = async (updateFeed: UpdateFeedModel) => {
    setLoading(true);
    try {
      const response = await apiFeedsAxios.updateFeeds(updateFeed);
      openNotification("success", "Thành công", "Cập nhật tin thành công");
      props.onCloseEditFeed(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      props.onCloseEditFeed(false);
    }
  };

  const onFinish = async () => {
    onUpdateFeed();
  };

  const onFinishFailed = (errorInfo: any) => {
    openNotification("error", "Thất bại", "Vui lòng điền đủ thông tin");
  };

  return (
    <Drawer
      title="Chỉnh sửa tin"
      placement="bottom"
      height="90%"
      onClose={() => props.onCloseEditFeed(false)}
      open={props.openEditFeed}
    >
      <div className="container user-profile-screen">
        <div className="row login-register-cover">
          <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
            <div className="text-center">
              <h2 className="mt-10 mb-5 text-brand-1">
                Chỉnh sửa tin tuyển dụng
              </h2>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-register text-start mt-20"
                action="#"
              >
                <div className="box-size">
                  <AppInput
                    required={true}
                    label="Tên bài tuyển dụng"
                    placeholder="Tên bài tuyển dụng"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(event) => {
                      setJobTitle(event.target.value);
                    }}
                    requiredMessage="Vui lòng điền tên bài tuyển dụng"
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Upload thương hiệu
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {brand ? (
                    <div className="box-brand-create-feed">
                      <Row>
                        <Col span={18} push={6}>
                          <div className="label-brand-create-feed">
                            {brand?.name}
                          </div>
                          <p className="text-overflow">{brand?.description}</p>
                        </Col>
                        <Col span={6} pull={18}>
                          <Image
                            width={50}
                            height={50}
                            src={brand?.resourceUrl}
                          />
                        </Col>
                      </Row>
                    </div>
                  ) : null}

                  <UserBrands
                    open={isChooseBrands}
                    onSuccess={(brand: BrandsModel) => {
                      setBrand(brand);
                    }}
                    onCancel={(close) => setIschooseBrands(false)}
                  />
                  <Button
                    type="dashed"
                    size="large"
                    style={{ width: "100%" }}
                    onClick={() => setIschooseBrands(true)}
                  >
                    Upload thương hiệu
                  </Button>
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Chọn vị trí <span style={{ color: "red" }}>*</span>
                  </label>
                  <AppLocation
                    changeOnSelect={false}
                    handleLocationData={(locationData) =>
                      setLocationData(locationData)
                    }
                  />
                </div>
                <div className="box-size">
                  <AppInput
                    required={true}
                    label="Vị trí chi tiết"
                    placeholder="Số nhà ABC hẻm XYZ..."
                    name="detailsAddress"
                    value={detailsAddress}
                    onChange={(event) => {
                      setDetailsAddress(event.target.value);
                    }}
                    requiredMessage="Vui lòng điền vị trí chi tiết"
                  />
                </div>
                <div className="box-size">
                  <AppInput
                    required={true}
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                    requiredMessage="Vui lòng nhập số điện thoại"
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Chọn loại thời gian làm việc
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    // defaultValue="lucy"
                    placeholder="Vui lòng chọn loại thời gian làm việc"
                    size="large"
                    style={{ width: "100%" }}
                    value={Jobtype.find((item) => item.value === jobType)}
                    onChange={(value: any) => {
                      setJobType(value);
                    }}
                    options={Jobtype}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Thời gian làm việc trong ngày
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    placeholder="Thời gian làm việc trong ngày"
                    rows={4}
                    cols={50}
                    value={workingTime}
                    onChange={(event) => {
                      setWorkingTime(event.target.value);
                    }}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Danh mục công việc
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    showSearch
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Chọn danh mục công việc"
                    optionFilterProp="children"
                    onChange={(value: any) => {
                      setJobCategoryId(value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={jobCategoryList
                      .map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                      .find((item) => item.value === jobCategoryId)}
                    options={jobCategoryList.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Số người cần tuyển
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    min={1}
                    max={10000}
                    defaultValue={amountPeople}
                    onChange={(value) => setAmountPeople(value!)}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Mức lương (VNĐ)
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    min={50000}
                    max={1000000000}
                    defaultValue={salary}
                    onChange={(value) => {
                      setSalary(value!);
                    }}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Chế độ trả lương
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    showSearch
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Chọn chế độ trả lương"
                    optionFilterProp="children"
                    onChange={(value: any) => {
                      setSalaryUnit(value);
                    }}
                    // onSearch={onSearch}
                    value={{
                      value: salaryUnit,
                      label: salaryUnit,
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Trả lương theo ngày",
                        label: "Trả lương theo ngày",
                      },
                      {
                        value: "Trả lương theo tuần",
                        label: "Trả lương theo tuần",
                      },
                      {
                        value: "Trả lương theo tháng",
                        label: "Trả lương theo tháng",
                      },
                    ]}
                  />
                </div>
                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Thời gian bắt đầu
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    defaultValue={dayjs(timeToStart)}
                    onChange={(date, dateString) => {
                      setTimeToStart(new Date(dateString));
                    }}
                  />
                </div>

                <div className="box-size">
                  <label className="form-label" htmlFor="input-1">
                    Mô tả công việc
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Mô tả công việc"
                    rows={4}
                    cols={50}
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
                <div className="text-right">
                  <AppButton textBtn="Lưu tin" type="submit" />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
