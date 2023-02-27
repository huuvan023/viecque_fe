import {
  CreateFeedModel,
  GetFeedsModel,
  PaginationModel,
  ResponseModel,
  UpdateFeedModel,
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
  updateFeeds(
    data: UpdateFeedModel
  ): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.put(ENPOINT.createFeed, data);
  },

  getRecruiterFeeds(
    page: PaginationModel
  ): Promise<AxiosResponse<ResponseModel<GetFeedsModel[]>>> {
    return axiosClient.get(
      `${ENPOINT.getRecruiterFeed}?page=${page.page}&pageSize=${page.pageSize}`
    );
  },

  getRecruiterNotPaidFeeds(
    page: PaginationModel
  ): Promise<AxiosResponse<ResponseModel<GetFeedsModel[]>>> {
    return axiosClient.get(
      `${ENPOINT.getRecruiterNotPaidFeeds}?page=${page.page}&pageSize=${page.pageSize}`
    );
  },

  getRecruiterReportedFeeds(
    page: PaginationModel
  ): Promise<AxiosResponse<ResponseModel<GetFeedsModel[]>>> {
    return axiosClient.get(
      `${ENPOINT.getRecruiterReportedFeeds}?page=${page.page}&pageSize=${page.pageSize}`
    );
  },
};
