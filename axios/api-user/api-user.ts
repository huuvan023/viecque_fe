import { GetUserInfoModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiUserAxios = {
  getUserInfo(): Promise<AxiosResponse<GetUserInfoModel>> {
    return axiosClient.get(ENPOINT.get_user_info);
  },
};
