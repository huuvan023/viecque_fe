import Link from "next/link";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useContext, useEffect, useState } from "react";
import { menuRoutes } from "../../routes/menu_routes";
import { Routes } from "@Routes/index";
import { useRouter } from "next/router";
import { SET_LOADING } from "@Store/constants";
import GlobalStateContext from "@Store/Context";
import { useAuth } from "@Hooks/use-auth";
import { RoutesConst } from "@Constants/routes-const";
import UserProfileMobile from "./UserProfileMobbile";
import { useLoading } from "@Hooks/use-loading";

interface Props {
  openClass: string;
  isAuth: boolean;
  handleOpen: Function;
  handleRemove: Function;
}
const MobileMenu = (props: Props) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: 0,
  });
  const { setLoading } = useLoading();
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
  const handleToggle = (key: number) => {
    if (isActive.key === key) {
      setIsActive({
        ...isActive,
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${props.openClass}`}
      >
        <div className="mobile-header-wrapper-inner">
          <div
            className={`burger-icon burger-icon-white ${
              props.openClass && "burger-close"
            }`}
            onClick={() => {
              props.handleOpen();
              props.handleRemove();
            }}
          >
            <span className="burger-icon-top" />
            <span className="burger-icon-mid" />
            <span className="burger-icon-bottom" />
          </div>
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}

                <nav
                  onClick={() => {
                    props.handleOpen();
                    props.handleRemove();
                  }}
                >
                  <ul className="mobile-menu font-heading">
                    {menuRoutes.map((item, index) => {
                      if (
                        item.routesType === RoutesConst.private &&
                        !props.isAuth
                      ) {
                        return;
                      }
                      return (
                        <li
                          key={index}
                          className={
                            isActive.key == index
                              ? "has-children active"
                              : "has-children"
                          }
                        >
                          {item.children && item.children.length > 0 ? (
                            <span
                              onClick={() => handleToggle(index)}
                              className="menu-expand"
                            >
                              <i className="fi-rr-angle-small-down"></i>
                            </span>
                          ) : null}

                          <Link legacyBehavior href={item.path}>
                            <a className="active">{item.label}</a>
                          </Link>
                          {item.children && item.children.length > 0 ? (
                            <ul
                              className={
                                isActive.key == index
                                  ? "sub-menu d-block"
                                  : "sub-menu d-none"
                              }
                            >
                              {item.children.map(
                                (itemChildren, indexChildren) => {
                                  if (
                                    itemChildren.routesType ===
                                      RoutesConst.private &&
                                    !props.isAuth
                                  ) {
                                    return;
                                  }
                                  return (
                                    <li key={indexChildren}>
                                      <Link
                                        legacyBehavior
                                        href={itemChildren.path}
                                      >
                                        <a>{itemChildren.label}</a>
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
                  <div>
                    <UserProfileMobile isAuth={props.isAuth} />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
