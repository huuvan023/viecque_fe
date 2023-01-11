import {
  GetUserInfoModel,
  NewUserInfoModel,
  NewUserPasswordModel,
  UpdateUserInfoModel,
  UpdateUserPasswordModel,
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
};
