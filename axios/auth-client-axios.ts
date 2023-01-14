import { LoginModel, RegisterModel } from "@Models/index";
import axiosClient from "./axios";
import { ENPOINT } from "./endpoint";

export const authClient = {
  login(data: LoginModel) {
    return axiosClient.post(ENPOINT.login, data);
  },

  regisrer(data: RegisterModel) {
    return axiosClient.post(ENPOINT.registor, data);
  },

  logout() {
    return axiosClient.post(ENPOINT.logout);
  },
};
