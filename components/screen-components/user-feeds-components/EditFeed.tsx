import { apiPublicAxios } from "@Axios/public/api-public";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
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
  Radio,
} from "antd";
import { useEffect, useState } from "react";
import { apiFeedsAxios } from "@Axios/user/api-feeds";
import SelectLocation from "@Component/Layout/SelectLocation";
import EditTextWord from "@Component/elements/EditTextWord";
import { SalaryUnits } from "@Constants/salary-unit";

interface Props {
  feed: GetFeedsModel;
  onCloseEditFeed: (isClose: boolean) => void;
  openEditFeed: boolean;
  onEditSuccess?: () => void;
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
    setSalary(feed.salary);
    setAmountPeople(feed.amount);
    setDescription(feed.description);
    setTimeToStart(new Date(feed.timeToStart));
    setSalaryUnit(feed.salaryUnit);
    setJobCategoryId(feed.jobCate.id);
    setLocationData({
      provinceId: feed.provinceId,
      districtId: feed.districtId,
      wardId: feed.wardId,
    });
  }, [props.feed]);

  const [isChooseBrands, setIschooseBrands] = useState(false);
  const { setLoading } = useLoading();

  const [brand, setBrand] = useState<BrandsModel>();
  const [locationData, setLocationData] = useState<LocationDataModel>();
  const [jobType, setJobType] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salaryUnit, setSalaryUnit] = useState("");
  const [jobTitle, setJobTitle] = useState("");
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
    if (!locationData?.provinceId) {
      openNotification("error", "Thất bại", "Vui lòng chọn tỉnh!");
      return;
    }
    if (!locationData?.districtId) {
      openNotification("error", "Thất bại", "Vui lòng chọn huyện!");
      return;
    }
    if (!locationData?.wardId) {
      openNotification("error", "Thất bại", "Vui lòng chọn xã!");
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

    const data: UpdateFeedModel = {
      feedsId: props.feed.id,
      brandId: brand.brandId!,
      provinceId: locationData.provinceId.code!,
      districtId: locationData.districtId.code!,
      wardId: locationData.wardId.code!,
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
      workingTime: "",
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
      if (props.onEditSuccess) {
        props.onEditSuccess();
      }

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

                  <SelectLocation
                    defaultLocation={locationData}
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
                  c
                  <Radio.Group
                    onChange={(event) => setSalaryUnit(event.target.value)}
                    value={salaryUnit}
                  >
                    {SalaryUnits.map((item) => {
                      return (
                        <Radio
                          key={item.value}
                          style={{ display: "block" }}
                          value={item.value}
                        >
                          {item.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
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

                  <EditTextWord
                    onChange={(value) => setDescription(value)}
                    value={description}
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
