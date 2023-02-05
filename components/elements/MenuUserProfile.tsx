import React, { useContext } from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useAuth } from "@Hooks/use-auth";
import { useRouter } from "next/router";
import GlobalStateContext from "@Store/Context";
import { Routes } from "@Routes/routes";
import { SET_LOADING } from "@Store/constants";
import Link from "next/link";
import { useLoading } from "@Hooks/use-loading";
type Props = {};

export default function MenuUserProfile({}: Props) {
  const { setLoading } = useLoading();
  const { logout, profile } = useAuth();
  const router = useRouter();

  async function onLogOut() {
    logout(() => {
      router.push(Routes.login);
      setLoading(true);
    });
  }
  async function onSettingUser() {}

  async function onContact() {
    if (Routes.contact === router.pathname) {
      return;
    }

    router.push(Routes.contact);
    setLoading(true);
  }

  return (
    <>
      <div className="button-menu" onClick={onSettingUser}>
        <SettingOutlined />
        <a>Cài đặt tài khoản</a>
      </div>
      <div className="button-menu" onClick={onContact}>
        <MessageOutlined />
        <a>Liên hệ với chúng tôi</a>
      </div>
      <div className="button-logout d-flex" onClick={onLogOut}>
        <LogoutOutlined />
        <a>Logout</a>
      </div>
    </>
  );
}
