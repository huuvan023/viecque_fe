import React, { useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { Spin } from "antd";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}
const Layout = ({ children, isLoading = false }: Props) => {
  const [openClass, setOpenClass] = useState("");

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
  return (
    <>
      <Spin
        tip="Đang tải..."
        size="large"
        style={{ position: "fixed", top: "25%" }}
        spinning={isLoading}
      >
        <div className="body-overlay-1" onClick={handleRemove} />
        <Header
          handleOpen={handleOpen}
          handleRemove={handleRemove}
          openClass={openClass}
        />
        <MobileMenu openClass={openClass} />
        <main className="main">{children}</main>
        <Footer />
        <BackToTop />
      </Spin>
    </>
  );
};

export default Layout;
