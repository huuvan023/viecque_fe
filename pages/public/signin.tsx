import React, { useState } from "react";
import Link from "next/link";
import Layout from "@Component/Layout/Layout";
import ImageAssets from "@Component/elements/ImageAssets";
import { authClient } from "@Axios/auth-client";
import { Form, Input } from "antd";
import { LoginModel } from "@Models/login.model";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import Auth from "@Component/Layout/Auth";

const Singin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const onFinish = ({ username, password }: LoginModel) => {
    setIsLoading(true);
    handleLogin({ username, password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function handleLogin({ username, password }: LoginModel) {
    try {
      const response = await authClient.login({
        username,
        password,
      });
      if (response.data.token) {
        router.push({
          pathname: Routes.home,
        });
      } else {
        setLoginError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <Layout isLoading={isLoading}>
      <section className="pt-100 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">Welcome back! </p>
                <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
              </div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-register text-start mt-20"
                action="#"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <div>
                    <label className="form-label" htmlFor="input-1">
                      Username or Email address *
                    </label>
                    <Input placeholder="username" />
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <div>
                    <label className="form-label" htmlFor="input-1">
                      Password *
                    </label>
                    <Input placeholder="password" type="password" />
                  </div>
                </Form.Item>
                {loginError ? (
                  <div className="error-login">
                    Tên đăng nhập/email hoặc mật khẩu không chính xác.
                  </div>
                ) : null}
                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input type="checkbox" />
                    <span className="text-small">Remenber me</span>
                    <span className="checkmark" />
                  </label>
                  <Link legacyBehavior href={Routes.resetPassword}>
                    <a className="text-muted">Forgot Password</a>
                  </Link>
                </div>
                <Form.Item>
                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                    name="login"
                  >
                    Login
                  </button>
                </Form.Item>
                <div className="text-muted text-center">
                  {"Don't have an Account?"}
                  <Link legacyBehavior href={Routes.signin}>
                    <a>Sign up</a>
                  </Link>
                </div>
              </Form>
            </div>
            <div className="img-1 d-none d-lg-block">
              <ImageAssets
                className="shape-1"
                src="assets/imgs/page/login-register/img-4.svg"
                alt="JobBox"
              />
            </div>
            <div className="img-2">
              <ImageAssets
                src="assets/imgs/page/login-register/img-3.svg"
                alt="JobBox"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Singin;
