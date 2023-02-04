import { LoginModel } from "@Models/index";
import useSwr from "swr";
import * as swr__internal from "swr/_internal";
import axios from "axios";

export function useAuth(option?: Partial<swr__internal.PublicConfiguration>) {
  const { data, error, mutate } = useSwr("api/auth/checkAuth", {
    dedupingInterval: 1000, // 1s reload data
    revalidateOnFocus: true,
    onError(err) {
      // Unauthorized logout
      // token die
      logout(() => {});
    },
    ...option,
  });

  const firstLoading = data === undefined && error === undefined;

  async function login(user: LoginModel, callback: Function) {
    var data = JSON.stringify({
      username: user.username,
      password: user.password,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    await mutate();
    callback(response);
  }

  async function logout(callback: Function) {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/auth/logout",
      headers: {},
    };
    await axios(config);
    mutate(null, false);
    callback();
  }

  const profile: any = data;

  return {
    profile,
    error,
    firstLoading,
    login,
    logout,
  };
}
