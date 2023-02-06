import { UpdateUserProfileModel } from "./../../models/user/user-profile.model";
import { ResponseModel, UserProfileModel, UpdatePassword } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiUserProfileAxios = {
  getUserProfile(): Promise<AxiosResponse<ResponseModel<UserProfileModel>>> {
    return axiosClient.get(ENPOINT.user);
  },
  updateUserProfle(
    body: UpdateUserProfileModel
  ): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.put(`${ENPOINT.user}?keyUpdate=INFOS`, body);
  },

  updatePassword(
    body: UpdatePassword
  ): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.put(`${ENPOINT.user}?keyUpdate=PASSWORD`, body);
  },
};
