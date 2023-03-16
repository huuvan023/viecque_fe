/* eslint-disable jsx-a11y/alt-text */
import { apiPublicAxios } from "@Axios/public/api-public";
import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import StepCreateFeed from "@Component/screen-components/create-feeds-components/Steps";
import UserBrands from "@Component/screen-components/user-components/user-brands";
import { Jobtype } from "@Constants/jobtype";
import { useCreateFeed } from "@Hooks/use-create-feed";
import { useLoading } from "@Hooks/use-loading";
import "react-quill/dist/quill.snow.css";
import {
  BrandsModel,
  CreateFeedModel,
  JobCategoryModel,
  LocationDataModel,
  UserProfileModel,
} from "@Models/index";
import { Routes } from "@Routes/routes";
import { openNotification } from "@Utils/notification";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SelectLocation from "@Component/Layout/SelectLocation";
import EditTextWord from "@Component/elements/EditTextWord";
import { apiFeedsAxios } from "@Axios/user/api-feeds";

const CreateFeed = () => {
  const [isChooseBrands, setIschooseBrands] = useState(false);
  const { setLoading } = useLoading();
  const { setCreateFeed } = useCreateFeed();
  const router = useRouter();

  const [brand, setBrand] = useState<BrandsModel>();
  const [locationData, setLocationData] = useState<LocationDataModel>();
  const [jobType, setJobType] = useState<string>();
  const [salaryUnit, setSalaryUnit] = useState("");
  const [jobCategoryList, setJobCategoryList] = useState<JobCategoryModel[]>(
    []
  );
  const [timeToStart, setTimeToStart] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [salary, setSalary] = useState(50000);
  const [amountPeople, setAmountPeople] = useState(1);
  useEffect(() => {
    (async () => {
      getJobCategoryList();
      setLoading(false);
    })();
  }, []);

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

  const onCreateFeed = async (dataJob: {
    detailsAddress: string;
    jobTitle: string;
    position: string;
    phoneNumber: string;
  }) => {
    // if (!brand) {
    //   openNotification("error", "Thất bại", "Vui lòng chọn thương hiệu!");
    //   return;
    // }

    // if (!locationData?.provinceId) {
    //   openNotification("error", "Thất bại", "Vui lòng chọn tỉnh!");
    //   return;
    // }
    // if (!locationData?.districtId) {
    //   openNotification("error", "Thất bại", "Vui lòng chọn huyện!");
    //   return;
    // }
    // if (!locationData?.wardId) {
    //   openNotification("error", "Thất bại", "Vui lòng chọn xã!");
    //   return;
    // }
    // if (!jobType) {
    //   openNotification(
    //     "error",
    //     "Thất bại",
    //     "Vui lòng chọn loại thời gian làm việc!"
    //   );
    //   return;
    // }
    // if (!jobCategoryId) {
    //   openNotification("error", "Thất bại", "Vui lòng danh mục công việc!");
    //   return;
    // }
    if (!salaryUnit) {
      openNotification("error", "Thất bại", "Vui lòng chọn chế độ trả lương!");
      return;
    }
    // if (!timeToStart) {
    //   openNotification("error", "Thất bại", "Vui lòng chọn thời gian bắt đầu!");
    //   return;
    // }
    // if (!description) {
    //   openNotification("error", "Thất bại", "Vui lòng điền mô tả công việc!");
    //   return;
    // }
    // if (!workingTime) {
    //   openNotification(
    //     "error",
    //     "Thất bại",
    //     "Vui lòng điền thời gian làm việc trong ngày!"
    //   );
    //   return;
    // }

    const data: CreateFeedModel = {
      brandId: brand?.brandId,
      provinceId: locationData?.provinceId?.code,
      districtId: locationData?.districtId?.code,
      wardId: locationData?.wardId?.code,
      jobType: jobType!,
      salaryUnit: salaryUnit,
      timeToStart: timeToStart,
      jobCategoryId: jobCategoryId,
      description: description,
      salary: salary.toString(),
      amountPeople: amountPeople.toString(),
      workingTime: workingTime,
      ...dataJob,
    };
    onSaveFeed(data);
  };

  const onSaveFeed = async (feed: CreateFeedModel) => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await apiFeedsAxios.createFeeds(feed);
      openNotification("success", "Thành công", "Tạo tin thành công");
      const dataFeed = response.data?.data;
      if (dataFeed) {
        setCreateFeed({ ...feed, id: dataFeed.id });
        router.push({
          pathname: Routes.createFeedView,
        });
      }
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };
  const onFinish = async (dataJob: {
    detailsAddress: string;
    jobTitle: string;
    position: string;

    phoneNumber: string;
  }) => {
    onCreateFeed(dataJob);
  };

  const onFinishFailed = (errorInfo: any) => {
    openNotification("error", "Thất bại", "Vui lòng điền đủ thông tin");
  };

  return (
    <Authentication>
      <Layout>
        <div className="container user-profile-screen">
          <div className="row login-register-cover">
            <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Tạo tin tuyển dụng</h2>
                <StepCreateFeed currentStep={0} />
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
                            <p className="text-overflow">
                              {brand?.description}
                            </p>
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
                      requiredMessage="Vui lòng điền vị trí chi tiết"
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      name="phoneNumber"
                      requiredMessage="Vui lòng nhập số điện thoại"
                    />
                  </div>
                  <div className="box-size">
                    <label className="form-label" htmlFor="input-1">
                      Chọn loại thời gian làm việc
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* <Select
                      // defaultValue="lucy"
                      placeholder="Vui lòng chọn loại thời gian làm việc"
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setJobType(value);
                      }}
                      options={Jobtype}
                    /> */}
                    <Checkbox.Group
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setJobType(value.join(","));
                      }}
                    >
                      <Row>
                        <Col>
                          <Checkbox value="1">Bao ăn</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="2">Bao ở</Checkbox>
                        </Col>
                      </Row>
                      {}
                    </Checkbox.Group>
                  </div>
                  <div className="box-size">
                    <label className="form-label" htmlFor="input-1">
                      Thời gian làm việc trong ngày
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <EditTextWord
                      onChange={(value) => setWorkingTime(value)}
                      value={workingTime}
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
                      onChange={(value: string) => {
                        setJobCategoryId(value);
                      }}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
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
                      onChange={(value: string) => {
                        setSalaryUnit(value);
                      }}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: "Trả lương theo giờ",
                          label: "Trả lương theo giờ",
                        },
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
                    <AppButton textBtn="Tiếp tục" type="submit" />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
};

export default CreateFeed;
