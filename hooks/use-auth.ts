import { LoginModel } from "@Models/index";
import useSwr from "swr";
import * as swr__internal from "swr/_internal";
import { authClient } from "@Axios/auth-client-axios";
import { ENPOINT } from "@Axios/endpoint";
import { useRouter } from "next/router";
import { useRole } from "./use-role";

export function useAuth(option?: Partial<swr__internal.PublicConfiguration>) {
  const { setRole } = useRole();
  const { data, error, mutate } = useSwr(ENPOINT.checkAuth, {
    dedupingInterval: 1000, // 1s reload data
    revalidateOnFocus: true,
    onSuccess(data) {
      setRole(data?.data?.data?.userRole || "");
    },
    onError(err) {
      // Unauthorized logout
      // token die
      logout(() => {});
    },
    ...option,
  });

  const firstLoading = data === undefined && error === undefined;

  async function login(user: LoginModel, callback: Function) {
    try {
      const response = await authClient.login(user);
      await mutate();
      callback(response);
    } catch (error) {
      callback(error);
    }
  }

  async function logout(callback: Function) {
    await authClient.logout();
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
