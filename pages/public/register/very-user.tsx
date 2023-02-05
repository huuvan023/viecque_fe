import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageAssets from "@Component/elements/ImageAssets";
import Layout from "@Component/Layout/Layout";
import { Routes } from "@Routes/index";
import { Form } from "antd";
import AppInput from "@Component/elements/Input";
import { useRouter } from "next/router";
import { VerifyUserModel } from "@Models/index";
import { apiUserAxios } from "@Axios/user/api-user";
import { openNotification } from "@Utils/notification";
import { GetServerSidePropsContext } from "next";
import { parserTokenByCookie } from "@Utils/perserCookie";
import { useLoading } from "@Hooks/use-loading";

interface Props {
  token: string;
}
const Register = ({ token }: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isResendCode, setIsResendCode] = useState(true);
  const [second, setSecond] = useState(120);
  const { setLoading } = useLoading();
  useEffect(() => {
    setEmail((router.query.email as string) || "");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const secondCount = setInterval(() => {
      setSecond((count) => {
        if (count === 0) {
          clearInterval(secondCount);
          setIsResendCode(true);
          return 0;
        }
        return (count -= 1);
      });
    }, 1000);
    return () => {
      clearInterval(secondCount);
    };
  }, []);

  const onFinish = (data: VerifyUserModel) => {
    setLoading(true);
    onVeryEmail({ ...data, email });
  };

  const onVeryEmail = async (dataVeryUesr: VerifyUserModel) => {
    try {
      const response = await apiUserAxios.veryUser(dataVeryUesr);
      const data = await response.data;
      openNotification(
        "success",
        "Thành công",
        "Xác nhận tài khoản thành công!"
      );
      setLoading(false);
      router.push({
        pathname: Routes.login,
        query: {
          email,
        },
      });
    } catch (error: any) {
      openNotification(
        "error",
        "Thất bại",
        "Thất bại, vui lòng kiểm tra lại email!"
      );
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onResendVeryCode = async () => {
    if (isResendCode) {
      try {
        const response = await apiUserAxios.resendVerifyCode(email);
        const data = await response.data;
        openNotification(
          "success",
          "Thành công",
          "Vui lòng kiểm tra lại email!"
        );
      } catch (error: any) {
        const message = error.response.data.message;
        setIsResendCode(false);
        openNotification("error", "Thất bại", message);
      }
    }
  };

  return (
    <>
      <Layout>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <h2 className="mt-10 mb-5 text-brand-1">
                    Xác nhận email đăng ký
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
                  <AppInput
                    label="Mã xác nhận"
                    required={true}
                    requiredMessage="Vui lòng điền Mã xác nhận!"
                    placeholder="Mã xác nhận"
                    name="verificationCode"
                  />
                  <Form.Item>
                    <div className="box-resendCode">
                      <a
                        className="resendCode"
                        style={{ cursor: !isResendCode ? "not-allowed" : "allowed" }}
                        onClick={onResendVeryCode}
                      >
                        Gửi lại mã xác nhận
                      </a>
                      {!isResendCode ? (
                        <span>Vui lòng chờ : {second} giây</span>
                      ) : null}
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      name="login"
                    >
                      Xác nhận
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
    </>
  );
};

export default Register;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: Props }> {
  const token = parserTokenByCookie(context.req?.headers?.cookie!);

  return {
    props: {
      token,
    },
  };
}
