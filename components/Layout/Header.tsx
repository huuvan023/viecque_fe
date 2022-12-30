/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { menuBar } from "../@config/menu_bar";
import Logo from "./Logo";
const Header = ({ handleOpen, handleRemove, openClass }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const [scroll, setScroll] = useState(0);

  const scrollEvent = () => {
    const scrollCheck = window.scrollY;
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollEvent);
  });

  return (
    <>
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
                  {menuBar.map((item, index) => {
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
                <Link legacyBehavior href="page-register">
                  <a className="text-link-bd-btom hover-up">Register</a>
                </Link>

                <Link legacyBehavior href="page-signin">
                  <a className="btn btn-default btn-shadow ml-40 hover-up">
                    Sign in
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
