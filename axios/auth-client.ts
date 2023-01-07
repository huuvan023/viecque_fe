import { LoginModel } from "@Models/index";
import axiosClient from "./axios-client";
import { ENPOINT } from "./endpoint";

export const authClient = {
  login(loginModel: LoginModel) {
    return axiosClient.post(ENPOINT.login, loginModel);
  },
  logout() {
    return axiosClient.post("/public/logout");
  },
};
