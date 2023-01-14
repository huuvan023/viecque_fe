import {
  GetUserInfoModel,
  NewUserInfoModel,
  NewUserPasswordModel,
  RegisterModel,
  UpdateUserInfoModel,
  UpdateUserPasswordModel,
  VerifyUserModel,
} from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiUserAxios = {
  getUserInfo(): Promise<AxiosResponse<GetUserInfoModel>> {
    return axiosClient.get(ENPOINT.get_user_info);
  },

  updateUserInfo(
    newInfo: NewUserInfoModel
  ): Promise<AxiosResponse<UpdateUserInfoModel>> {
    return axiosClient.put(`${ENPOINT.update_user}?keyUpdate=INFOS`, newInfo);
  },

  updateUserPassword(
    newPassword: NewUserPasswordModel
  ): Promise<AxiosResponse<UpdateUserPasswordModel>> {
    return axiosClient.put(
      `${ENPOINT.update_user}?keyUpdate=INFOS`,
      newPassword
    );
  },

  register(data: RegisterModel) {
    return axiosClient.post(ENPOINT.registor, data);
  },
  resendVerifyCode(email: string) {
    return axiosClient.get(`${ENPOINT.resend_verify_code}?email=${email}`);
  },
  // /public/resend-verify-code?email=jabil58648@vingood.com
  veryUser(data: VerifyUserModel) {
    return axiosClient.post(ENPOINT.verify, data);
  },
};
