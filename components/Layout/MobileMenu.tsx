import Link from "next/link";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useState } from "react";
import { menuBar } from "../@config/menu_bar";

interface Props {
  openClass: string;
}
const MobileMenu = (props: Props) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: 0,
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
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-search mobile-header-border mb-30">
                <form action="#">
                  <input type="text" placeholder="Search…" />
                  <i className="fi-rr-search" />
                </form>
              </div>
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
                  <ul className="mobile-menu font-heading">
                    {menuBar.map((item, index) => {
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
