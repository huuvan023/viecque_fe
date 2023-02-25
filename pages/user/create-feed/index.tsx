import { apiPublicAxios } from "@Axios/public/api-public";
import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import AppLocation from "@Component/Layout/AppLocation";
import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import StepCreateFeed from "@Component/screen-components/create-feeds-components/Steps";
import UserBrands from "@Component/screen-components/user-components/user-brands";
import { Jobtype } from "@Constants/jobtype";
import { useCreateFeed } from "@Hooks/use-create-feed";
import { useLoading } from "@Hooks/use-loading";

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

const CreateFeed = () => {
  const [isChooseBrands, setIschooseBrands] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
  const { setLoading } = useLoading();
  const { setCreateFeed } = useCreateFeed();
  const router = useRouter();

  const [brand, setBrand] = useState<BrandsModel>();
  const [locationData, setLocationData] = useState<LocationDataModel>();
  const [jobType, setJobType] = useState<number>();
  const [salaryUnit, setSalaryUnit] = useState("");
  const [jobCategoryList, setJobCategoryList] = useState<JobCategoryModel[]>(
    []
  );
  const [timeToStart, setTimeToStart] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState("");
  const [salary, setSalary] = useState(50000);
  const [amountPeople, setAmountPeople] = useState(1);
  useEffect(() => {
    (async () => {
      getDataUser();
      getJobCategoryList();
      setLoading(false);
    })();
  }, []);

  const getDataUser = async () => {
    try {
      const response = await apiUserProfileAxios.getUserProfile();
      setUserProfile(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
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
    workingTime: string;
    phoneNumber: string;
  }) => {
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

    const data: CreateFeedModel = {
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
      ...dataJob,
    };
    setCreateFeed(data);
    setLoading(true);
    router.push({
      pathname: Routes.createFeediew,
    });
  };

  const onFinish = async (dataJob: {
    detailsAddress: string;
    jobTitle: string;
    position: string;
    workingTime: string;
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
                            <Image width={50} src={brand?.resourceUrl} />
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
                  {/* <div className="box-size">
                    <label className="form-label" htmlFor="input-1">
                      Chọn số điện thoại <span style={{ color: "red" }}>*</span>
                    </label>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      placeholder="Vui lòng chọn số điện thoại"
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setNumberPhone(value);
                      }}
                      options={userProfile?.phoneNumber.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </div> */}
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
                    <Select
                      // defaultValue="lucy"
                      placeholder="Vui lòng chọn loại thời gian làm việc"
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setJobType(value);
                      }}
                      options={Jobtype}
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Thời gian làm việc trong ngày"
                      placeholder="8h sáng - 8h tối"
                      name="workingTime"
                      requiredMessage="Vui lòng điền thời gian làm việc trong ngày"
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
                    <textarea
                      name="description"
                      placeholder="Mô tả công việc"
                      rows={4}
                      cols={50}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
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
