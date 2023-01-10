import { LoginModel } from "@Models/index";
import axiosClient from "./axios";
import { ENPOINT } from "./endpoint";

export const authClient = {
  login({ username, password }: LoginModel) {
    return axiosClient.post(ENPOINT.login, { username, password });
  },
  logout() {
    return axiosClient.post(ENPOINT.logout);
  },
};
