import { authClient } from "./../axios/auth-client-axios";
import { LoginModel, UserProfile } from "@Models/index";
import { ENPOINT } from "@Axios/endpoint";
import useSwr from "swr";
import * as swr__internal from "swr/_internal";

export function useAuth(option?: Partial<swr__internal.PublicConfiguration>) {
  const { data, error, mutate } = useSwr(ENPOINT.get_user_info, {
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
    const response = await authClient.login(user);
    await mutate();
    callback(response);
  }

  async function logout(callback: Function) {
    await authClient.logout();
    mutate(null, false);
    callback();
  }

  const profile: UserProfile | any = data;

  return {
    profile,
    error,
    firstLoading,
    login,
    logout,
  };
}
