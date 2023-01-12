import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { menuRoutes, Routes } from "routes/index";
import { useAuth } from "hooks/use-auth";
import { RoutesConst } from "@Constants/routes-const";

const Header = ({ handleOpen, handleRemove, openClass, isAuth }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const [scroll, setScroll] = useState(0);
  const { logout } = useAuth();
  const scrollEvent = () => {
    const scrollCheck = window.scrollY;
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck);
    }
  };
  async function onLogOut() {
    logout(() => {
      router.push(Routes.signin);
    });
  }
  useEffect(() => {
    document.addEventListener("scroll", scrollEvent);
  });

  return (
    <>
      {/* <PageHead /> */}
      <header
        className={scroll ? "header sticky-bar stick" : "header sticky-bar"}
      >
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Logo />
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  {menuRoutes.map((item, index) => {
                    if (item.routesType === RoutesConst.private && !isAuth) {
                      return;
                    }
                    return (
                      <li
                        key={index}
                        className={
                          item.children && item.children.length > 0
                            ? "has-children"
                            : ""
                        }
                      >
                        <Link legacyBehavior href={item.path}>
                          <a className={pathname === item.path ? "active" : ""}>
                            {item.label}
                          </a>
                        </Link>
                        {item.children && item.children.length > 0 ? (
                          <ul className="sub-menu">
                            {item.children.map(
                              (itemChildren, indexChildren) => {
                                return (
                                  <li key={indexChildren}>
                                    <Link
                                      legacyBehavior
                                      href={itemChildren.path}
                                    >
                                      <a
                                        className={
                                          pathname === itemChildren.path
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        {itemChildren.label}
                                      </a>
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div
                className={`burger-icon burger-icon-white ${
                  openClass && "burger-close"
                }`}
                onClick={() => {
                  handleOpen();
                  handleRemove();
                }}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
            <div className="header-right">
              <div className="block-signin">
                {!isAuth ? (
                  <>
                    <Link legacyBehavior href={Routes.registor}>
                      <a className="text-link-bd-btom hover-up">Register</a>
                    </Link>

                    <Link legacyBehavior href={Routes.signin}>
                      <a className="btn btn-default btn-shadow ml-40 hover-up">
                        Sign in
                      </a>
                    </Link>
                  </>
                ) : (
                  <a
                    className="btn btn-default btn-shadow ml-40 hover-up"
                    onClick={onLogOut}
                  >
                    Logout
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
