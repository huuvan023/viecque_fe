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
import { Button, Col, Form, Image, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const CreateFeed = () => {
  const [isChooseBrands, setIschooseBrands] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);

  const [brand, setBrand] = useState<BrandsModel>();
  const [numberPhone, setNumberPhone] = useState();
  const [locationData, setLocationData] = useState<LocationDataModel>();

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
  const { setLoading } = useLoading();

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
                      name="?"
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
                      // defaultValue="lucy"
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
                      handleLocationData={(locationData) =>
                        setLocationData(locationData)
                      }
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
                        setNumberPhone(value);
                      }}
                      options={[
                        {
                          label: "Toàn thời gian",
                          value: "Toàn thời gian",
                        },
                        {
                          label: "Bán thời gian",
                          value: "Bán thời gian",
                        },
                        {
                          label: "Thời vụ",
                          value: "Thời vụ",
                        },
                      ]}
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

                  {/* <div>chọn công ty</div>
                  <div> địa điểm</div>{" "}
                  <AppInput
                    required={true}
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    name="?"
                    requiredMessage="Vui lòng điền số điện thoại"
                  />
                  <AppInput
                    required={true}
                    label="Email"
                    placeholder="Email"
                    name="?"
                    requiredMessage="Vui lòng điền email"
                  />
                  <AppInput
                    required={true}
                    label="Thù lao"
                    placeholder="Thù lao"
                    name="?"
                    requiredMessage="Vui lòng điền thù lao"
                  />
                  <AppInput
                    required={true}
                    label="Ngành"
                    placeholder="Ngành"
                    name="?"
                    requiredMessage="Vui lòng điền ngành"
                  />
                  <AppInput
                    required={true}
                    label="Trình độ"
                    placeholder="Trình độ"
                    name="?"
                    requiredMessage="Vui lòng điền trình độ"
                  />
                  <AppInput
                    required={true}
                    label="Kinh nghiệm"
                    placeholder="Kinh nghiệm"
                    name="?"
                    requiredMessage="Vui lòng điền kinh nghiệm"
                  />
                  <AppInput
                    required={true}
                    label="Loại công việc"
                    placeholder="Loại công việc"
                    name="?"
                    requiredMessage="Vui lòng điền loại công việc"
                  />
                  <AppInput
                    required={true}
                    label="Hạn chót ứng tuyển"
                    placeholder="Hạn chót ứng tuyển"
                    name="?"
                    requiredMessage="Vui lòng điền hạn chót ứng tuyển"
                  />
                  <div>
                    <label className="form-label" htmlFor="input-1">
                      Mô tả công việc
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Mô tả công việc"
                      rows={4}
                      cols={50}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="input-1">
                      Yêu cầu công việc
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Yêu cầu công việc"
                      rows={4}
                      cols={50}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="input-1">
                      Quyền lợi
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Quyền lợi"
                      rows={4}
                      cols={50}
                    />
                  </div> */}
                  <div className="text-right">
                    <AppButton
                      textBtn="Lưu và tiếp tục"
                      onClick={() => {
                        console.log(numberPhone, locationData);
                      }}
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
