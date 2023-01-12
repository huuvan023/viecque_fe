import React, { useContext, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { useAuth } from "hooks/use-auth";
import Loading from "@Component/elements/Loading";
import GlobalStateContext from "@Store/Context";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}
const Layout = ({ children, isLoading = true }: Props) => {
  const [state, dispatch] = useContext(GlobalStateContext);
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
    return <Loading />;
  }
  return (
    <>
      {isLoading ? <>{state.isLoading ? <Loading /> : null}</> : null}
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
