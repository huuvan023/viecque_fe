import React, { useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import GlobalStateContext from "@Store/Context";
import { useAuth } from "@Hooks/use-auth";
import { Routes } from "@Routes/routes";
import { SET_LOADING } from "@Store/constants";
import AvatarUser from "@Component/elements/AvatarUser";
import MenuUserProfile from "@Component/elements/MenuUserProfile";
type Props = {
  isAuth: boolean;
};

export default function UserProfileMobile({ isAuth = false }: Props) {
  const { logout, profile } = useAuth();
  const router = useRouter();
  const [state, dispatch] = useContext(GlobalStateContext);

  async function onLogOut() {
    logout(() => {
      router.push(Routes.login);
    });
  }
  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };
  return (
    <>
      {isAuth ? (
        <div className="profile-mobile-menu">
          <div className="d-flex align-items-center justify-content-between">
            <AvatarUser />
            {profile?.data?.data?.fullName}
          </div>

          <div style={{ marginTop: "10px" }}>
            <MenuUserProfile />
          </div>
        </div>
      ) : (
        <div className="profile-mobile-menu">
          <div
            className="button-logout d-flex"
            onClick={() => {
              if (router.asPath === Routes.login) {
                return;
              }
              handleLoading(true);
              router.push(Routes.login);
            }}
          >
            <a>Đăng nhập</a>
          </div>
          <div
            style={{ marginTop: "10px" }}
            className="button-menu"
            onClick={() => {
              if (router.asPath === Routes.registor) {
                return;
              }
              handleLoading(true);
              router.push(Routes.registor);
            }}
          >
            <a>Đăng ký</a>
          </div>
        </div>
      )}
    </>
  );
}
