import React, { useContext, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@Hooks/use-auth";
import Loading from "@Component/elements/Loading";
import GlobalStateContext from "@Store/Context";
import { useLoading } from "@Hooks/use-loading";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const { isLoading } = useLoading();
  const [openClass, setOpenClass] = useState("");
  const { profile, firstLoading } = useAuth();
  const handleOpen = () => {
    document.body.classList.add("mobile-menu-active");
    setOpenClass("sidebar-visible");
  };

  const handleRemove = () => {
    if (openClass === "sidebar-visible") {
      setOpenClass("");
    }
    document.body.classList.remove("mobile-menu-active");
  };

  return (
    <div
      onClick={() => {
        handleRemove();
      }}
    >
      {isLoading ? <Loading /> : null}
      {firstLoading ? <Loading /> : null}
      <div className="body-overlay-1" onClick={handleRemove} />
      <Header
        handleOpen={handleOpen}
        handleRemove={handleRemove}
        openClass={openClass}
        isAuth={profile?.data ? true : false}
      />
      <MobileMenu
        handleOpen={handleOpen}
        handleRemove={handleRemove}
        openClass={openClass}
        isAuth={profile?.data ? true : false}
      />
      <main className="main">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
