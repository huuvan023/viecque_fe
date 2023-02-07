import Layout from "@Component/Layout/Layout";
import Authentication from "@Component/auth/Auth";
import AppButton from "@Component/elements/AppButton";
import AppInput from "@Component/elements/Input";
import { useLoading } from "@Hooks/use-loading";
import { Form } from "antd";
import React, { useEffect, useContext } from "react";

const CreateFeed = () => {
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Authentication>
      <Layout>
        <div className="container user-profile-screen">
          <div className="row login-register-cover">
            <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Tạo tin tuyển dụng</h2>
                <Form className="login-register text-start mt-20" action="#">
                  <AppInput
                    required={true}
                    label="Chức danh"
                    placeholder="Chức danh"
                    name="?"
                    requiredMessage="Vui lòng điền chức danh"
                  />
                  <div>chọn công ty</div>
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
                  </div>
                  <div className="text-right">
                    <AppButton
                      textBtn="Lưu và tiếp tục"
                      onClick={() => {}}
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
