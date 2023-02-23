import { ResponseModel, GetFeedsModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiAdminAxios = {
  createCate(name: string): Promise<AxiosResponse<ResponseModel<null>>> {
    const data = JSON.stringify({
      name,
    });
    var config = {
      method: "post",
      url: ENPOINT.createCate,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axiosClient(config);
  },
  removeCate(id: string): Promise<AxiosResponse<ResponseModel<null>>> {
    // const header =
    var config = {
      method: "delete",
      url: ENPOINT.deleteCate,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        id: id,
      },
    };
    return axiosClient(config);
  },

  getAllUser(): Promise<AxiosResponse<ResponseModel<any>>> {
    return axiosClient.get(ENPOINT.allUser);
  },
  getAllFeeds({
    userIds,
    dateRange,
    statuses,
    provinceId,
    districtId,
    wardId,
    page,
    pageSize,
  }: {
    userIds?: any[];
    dateRange?: any[];
    statuses?: any[];
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    page: number;
    pageSize: number;
  }): Promise<AxiosResponse<ResponseModel<GetFeedsModel[]>>> {
    return axiosClient.get(
      `${ENPOINT.allFeedsAdmin}?page=${page}&pageSize=${pageSize}&districtId=${districtId}&wardId=${wardId}&provinceId=${provinceId}&statuses=${statuses}&dateRange=${dateRange}&userIds=${userIds}`
    );
  },

  declineFeed(id: string) {
    return axiosClient.get(`${ENPOINT.declineFeed}?feedsId=${id}`);
  },
};
