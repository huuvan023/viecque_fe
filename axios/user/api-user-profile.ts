import {
  RegisterModel,
  ResponseModel,
  UserProfileModel,
  VerifyUserModel,
} from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiUserProfileAxios = {
  getUserProfile(): Promise<AxiosResponse<ResponseModel<UserProfileModel>>> {
    return axiosClient.get(ENPOINT.user);
  },
};
