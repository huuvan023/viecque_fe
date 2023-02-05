import { RegisterModel, ResponseModel, VerifyUserModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiUserAxios = {
  register(data: RegisterModel): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.post(ENPOINT.registor, data);
  },

  resendVerifyCode(email: string) {
    return axiosClient.get(`${ENPOINT.resend_verify_code}?email=${email}`);
  },

  resetPassword(email: string) {
    return axiosClient.get(`${ENPOINT.reset_password}?email=${email}`);
  },

  veryUser(data: VerifyUserModel): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.post(ENPOINT.verify, data);
  },
};
