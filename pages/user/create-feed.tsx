import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
import AppLocation from "@Component/Layout/AppLocation";
import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import UserBrands from "@Component/screen-components/user-components/user-brands";
import { useLoading } from "@Hooks/use-loading";

import {
  BrandsModel,
  LocationDataModel,
  UserProfileModel,
} from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Button, Col, DatePicker, Form, Image, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const CreateFeed = () => {
  const [isChooseBrands, setIschooseBrands] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
  const { setLoading } = useLoading();

  const [brand, setBrand] = useState<BrandsModel>();
  const [numberPhone, setNumberPhone] = useState();
  const [locationData, setLocationData] = useState<LocationDataModel>();
  const [jobType, setJobType] = useState("");
  const [salaryUnit, setSalaryUnit] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState("");
  const [timeToStart, setTimeToStart] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      await getDataUser();
      setLoading(false);
    })();
  }, []);

  const getDataUser = async () => {
    try {
      const response = await apiUserProfileAxios.getUserProfile();
      setUserProfile(response.data.data);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const onCreateFeed = async () => {
    if (!brand) {
      openNotification("error", "Thất bại", "Vui lòng chọn thương hiệu!");
      return;
    }
    if (!numberPhone) {
      openNotification("error", "Thất bại", "Vui lòng chọn số điện thoại!");
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

    const data = {
      brandId: brand?.brandId,
      phoneNumber: numberPhone,
      provinceId: locationData.provinceId,
      districtId: locationData.districtId,
      wardId: locationData.wardId,
      jobType: jobType,
      salaryUnit: salaryUnit,
      timeToStart: timeToStart,
      jobCategoryId: jobCategoryId,
      description: description,

      // detailsAddress: "abc xyz",
      // jobTitle: "ví dụ kĩ sư",
      // amountPeople: "1",
      // salary: "10000",
      // position: "Vị trí abc",
      // experience: "1",
    };
    console.log(data);
  };

  return (
    <Authentication>
      <Layout>
        <div className="container user-profile-screen">
          <div className="row login-register-cover">
            <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Tạo tin tuyển dụng</h2>
                <Form className="login-register text-start mt-20" action="#">
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
                      Chọn thương hiệu
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

                    <ChooseBrands
                      isOpenBrands={isChooseBrands}
                      onCancel={() => setIschooseBrands(false)}
                      chooseBrand={(brand: BrandsModel) => {
                        setBrand(brand);
                      }}
                    />
                    <Button
                      type="dashed"
                      size="large"
                      style={{ width: "100%" }}
                      onClick={() => setIschooseBrands(true)}
                    >
                      Chọn Thương hiệu
                    </Button>
                  </div>
                  <div className="box-size">
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
                      requiredMessage="Vui lòng điền vị trí chi tiết"
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
                      options={[
                        {
                          label: "Toàn thời gian",
                          value: 1,
                        },
                        {
                          label: "Bán thời gian",
                          value: 2,
                        },
                      ]}
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
                      options={[
                        {
                          value: "Nhân viên quán ăn",
                          label: "Nhân viên quán ăn",
                        },
                      ]}
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Số người cần tuyển"
                      placeholder="Số người cần tuyển"
                      name="?"
                      type="number"
                      requiredMessage="Vui lòng điền số người cần tuyển"
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Mức lương (VNĐ)"
                      placeholder="Mức lương (VNĐ)"
                      name="?"
                      type="number"
                      requiredMessage="Vui lòng điền mức lương"
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
                        setTimeToStart(dateString);
                      }}
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Số năm kinh nghiệm"
                      placeholder="Số năm kinh nghiệm"
                      name="?"
                      type="number"
                      requiredMessage="Vui lòng điền số năm kinh nghiệm"
                    />
                  </div>
                  <div className="box-size">
                    <AppInput
                      required={true}
                      label="Vị trí tuyển dụng"
                      placeholder="Vị trí tuyển dụng"
                      name="?"
                      requiredMessage="Vui lòng điền vị trí tuyển dụng"
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
                    <AppButton
                      textBtn="Lưu và tiếp tục"
                      onClick={onCreateFeed}
                      type="submit"
                    />
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

interface ChooseBrandsModel {
  isOpenBrands: boolean;
  onCancel: Function;
  chooseBrand: (e: BrandsModel) => void;
}
const ChooseBrands = ({
  isOpenBrands,
  onCancel,
  chooseBrand,
}: ChooseBrandsModel) => {
  const onSave = () => {};
  return (
    <>
      <Modal
        open={isOpenBrands}
        onCancel={() => onCancel()}
        onOk={onSave}
        okText="Lưu"
        cancelText="Hủy"
      >
        <UserBrands
          onChooseBrand={(brandId: BrandsModel) => {
            onCancel();
            chooseBrand(brandId);
          }}
        />
      </Modal>
    </>
  );
};
