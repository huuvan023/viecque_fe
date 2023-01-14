import Auth from "@Component/Layout/Auth";
import Link from "next/link";
import React, { useState } from "react";
import ImageAssets from "@Component/elements/ImageAssets";
import Layout from "@Component/Layout/Layout";
import { Routes } from "@Routes/index";
import { Form, Input } from "antd";
import AppInput from "@Component/elements/Input";
import { RegisterModel } from "@Models/register.model";
import { authClient } from "@Axios/auth-client-axios";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const onFinish = (data: RegisterModel) => {
    setisLoading(true);
    handleLogin(data);
  };
  async function handleLogin(register: RegisterModel) {
    try {
      const response = await authClient.regisrer(register);
      const data = await response.data;
      setMessageErr("");
      console.log(data);
    } catch (error: any) {
      setMessageErr(error.response.data.message);
    }
    setisLoading(false);
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
                  />
                  <span style={{ color: "red" }}>{messageErr}</span>
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

                  <div className="login_footer form-group d-flex justify-content-between">
                    <label className="cb-container">
                      <Input type="checkbox" />
                      <span className="text-small">
                        Chấp nhận điều khoản và dịch vụ
                      </span>
                      <span className="checkmark" />
                    </label>
                  </div>
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
                    <Link legacyBehavior href={Routes.signin}>
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
