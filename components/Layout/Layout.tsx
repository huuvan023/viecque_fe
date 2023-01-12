import React, { useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { Spin } from "antd";
import { useAuth } from "hooks/use-auth";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}
const Layout = ({ children, isLoading = false }: Props) => {
  const [openClass, setOpenClass] = useState("");
  const { profile, firstLoading } = useAuth();
  const handleOpen = () => {
    document.body.classList.add("mobile-menu-active");
    setOpenClass("sidebar-visible");
  };

  const handleRemove = () => {
    if (openClass === "sidebar-visible") {
      setOpenClass("");
      document.body.classList.remove("mobile-menu-active");
    }
  };
  if (firstLoading) {
    return (
      <Spin
        tip="Đang tải..."
        size="large"
        style={{ position: "fixed", top: "25%" }}
        spinning={true}
      ></Spin>
    );
  }
  return (
    <>
      <div className="body-overlay-1" onClick={handleRemove} />
      <Header
        handleOpen={handleOpen}
        handleRemove={handleRemove}
        openClass={openClass}
        isAuth={profile?.data ? true : false}
      />
      <MobileMenu openClass={openClass} />
      <main className="main">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Layout;
