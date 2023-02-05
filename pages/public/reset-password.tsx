import React, { useEffect, useState } from "react";
import Layout from "@Component/Layout/Layout";
import ImageAssets from "@Component/elements/ImageAssets";
import { Form } from "antd";
import AppInput from "@Component/elements/Input";
import { useRouter } from "next/router";
import { apiCreateUserAxios } from "@Axios/user/api-create-user";
import { openNotification } from "@Utils/notification";
import { Routes } from "@Routes/routes";
import { useLoading } from "@Hooks/use-loading";
import NoAuthentication from "@Component/auth/NoAuth";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { setLoading } = useLoading();

  useEffect(() => {
    setEmail((router.query.email as string) || "");
    setLoading(false);
  }, [router]);

  const onFinish = () => {
    setLoading(true);
    onResetPassword();
  };
  const onResetPassword = async () => {
    try {
      const response = await apiCreateUserAxios.resetPassword(email);
      const data = response.data;

      openNotification(
        "success",
        "Thành công",
        "Vui lòng kiểm tra mật khẩu trong email!"
      );
      router.push({
        pathname: Routes.login,
        query: {
          email,
        },
      });
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <NoAuthentication>
      <Layout>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <p className="font-sm text-brand-2">Welcome back! </p>
                  <h2 className="mt-10 mb-5 text-brand-1">
                    Khôi phục mật khẩu
                  </h2>
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="login-register text-start mt-20"
                  action="#"
                >
                  <AppInput
                    label="Email"
                    required={true}
                    requiredMessage="Vui lòng điền Email!"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Gửi
                    </button>
                  </Form.Item>
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
    </NoAuthentication>
  );
};

export default ResetPassword;
