import Auth from "@Component/Layout/Auth";
import Link from "next/link";
import React, { useState } from "react";
import ImageAssets from "@Component/elements/ImageAssets";
import Layout from "@Component/Layout/Layout";
import { Routes } from "@Routes/index";
import { Form, Input } from "antd";
import AppInput from "@Component/elements/Input";
import { RegisterModel } from "@Models/register.model";
import { apiUserAxios } from "@Axios/api-user/api-user";
import { useRouter } from "next/router";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxMessage, setCheckboxMessage] = useState("");
  const router = useRouter();
  const onFinish = (data: RegisterModel) => {
    if (checkbox) {
      setisLoading(true);
      handleRegister(data);
    } else {
      setCheckboxMessage("Vui lòng chấp nhận điều khoản và dịch vụ");
    }
  };
  async function handleRegister(register: RegisterModel) {
    try {
      const response = await apiUserAxios.register(register);
      const data = await response.data;
      setMessageErr("");
      router.push({
        pathname: Routes.veryUser,
        query: {
          email: register.username,
        },
      });
      // setisLoading(false);
    } catch (error: any) {
      setMessageErr(error.response.data.message);
      setisLoading(false);
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Auth>
      <Layout isLoading={isLoading}>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <h2 className="mt-10 mb-5 text-brand-1">
                    Start for free Today
                  </h2>
                </div>

                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="login-register text-start mt-20"
                  action="#"
                >
                  <AppInput
                    type="email"
                    label="Email"
                    required={true}
                    requiredMessage="Vui lòng điền email!"
                    placeholder="Email"
                    name="username"
                    messageErr={messageErr}
                  />

                  <AppInput
                    label="Password"
                    required={true}
                    requiredMessage="Vui lòng điền password!"
                    placeholder="Password"
                    name="password"
                  />
                  <AppInput
                    label="Số điện thoại"
                    required={true}
                    requiredMessage="Vui lòng điền số điện thoại!"
                    placeholder="Số điện thoại"
                    name="phoneNumber"
                  />
                  <AppInput
                    label="Họ và tên"
                    required={true}
                    requiredMessage="Vui lòng điền số họ và tên!"
                    placeholder="Họ và tên"
                    name="fullName"
                  />
                  <Form.Item name="check">
                    <div className="login_footer form-group d-flex justify-content-between">
                      <label className="cb-container">
                        <Input
                          type="checkbox"
                          onChange={() => {
                            setCheckbox((check) => !check);
                            setCheckboxMessage("");
                          }}
                        />
                        <span className="text-small">
                          Chấp nhận điều khoản và dịch vụ
                        </span>
                        <div style={{ color: "red" }}>{checkboxMessage}</div>
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Đăng ký
                    </button>
                  </Form.Item>
                  <div className="text-muted text-center">
                    Bạn đã có tài khoản?
                    <Link legacyBehavior href={Routes.login}>
                      <a>Đăng nhập</a>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className="img-1 d-none d-lg-block">
                <ImageAssets
                  className="shape-1"
                  src="assets/imgs/page/login-register/img-1.svg"
                  alt="JobBox"
                />
              </div>
              <div className="img-2">
                <ImageAssets
                  src="assets/imgs/page/login-register/img-2.svg"
                  alt="JobBox"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Auth>
  );
};

export default Register;
