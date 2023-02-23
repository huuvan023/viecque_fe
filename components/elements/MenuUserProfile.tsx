import React from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
  CodeSandboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@Hooks/use-auth";
import { useRouter } from "next/router";
import { Routes } from "@Routes/routes";
import { useLoading } from "@Hooks/use-loading";
import { useRole } from "@Hooks/use-role";
type Props = {};

export default function MenuUserProfile({}: Props) {
  const { setLoading } = useLoading();
  const { isRole } = useRole();
  const { logout, profile } = useAuth();
  const router = useRouter();

  async function onLogOut() {
    logout(() => {
      router.push(Routes.login);
      setLoading(true);
    });
  }
  async function onSettingUser() {
    if (Routes.userSetting === router.pathname) {
      return;
    }

    router.push(Routes.userSetting);
    setLoading(true);
  }

  async function onContact() {
    if (Routes.contact === router.pathname) {
      return;
    }
    router.push(Routes.contact);
    setLoading(true);
  }
  async function onCraetFeed() {
    if (Routes.createFeed === router.pathname) {
      return;
    }
    router.push(Routes.createFeed);
    setLoading(true);
  }
  async function onListFeeds() {
    if (Routes.userListFeeds === router.pathname) {
      return;
    }
    router.push(Routes.userListFeeds);
    setLoading(true);
  }
  async function onAdmin() {
    if (Routes.admin === router.pathname) {
      return;
    }
    router.push(Routes.admin);
    setLoading(true);
  }
  return (
    <>
      <div className="button-menu" onClick={onSettingUser}>
        <SettingOutlined />
        <a>Cài đặt tài khoản</a>
      </div>
      <div className="button-menu" onClick={onCraetFeed}>
        <AppstoreAddOutlined />
        <a>Tạo tin tuyển dụng</a>
      </div>
      <div className="button-menu" onClick={onListFeeds}>
        <UserOutlined />
        <a>Tin của bạn</a>
      </div>
      <div className="button-menu" onClick={onContact}>
        <MessageOutlined />
        <a>Liên hệ với chúng tôi</a>
      </div>
      {isRole === "ADMIN" ? (
        <div className="button-menu" onClick={onAdmin}>
          <CodeSandboxOutlined />
          <a>Quản trị viên</a>
        </div>
      ) : null}
      <div className="button-logout d-flex" onClick={onLogOut}>
        <LogoutOutlined />
        <a>Logout</a>
      </div>
    </>
  );
}
