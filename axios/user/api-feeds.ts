import {
  CreateFeedModel,
  RegisterModel,
  ResponseModel,
  VerifyUserModel,
} from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiFeedsAxios = {
  createFeeds(
    data: CreateFeedModel
  ): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.post(ENPOINT.createFeed, data);
  },
};
