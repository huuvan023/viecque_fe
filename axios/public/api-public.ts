import {
  ProvinceModel,
  ResponseModel,
  DistrictsModel,
  WardsModel,
  JobCategoryModel,
  GetFeedsModel,
} from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiPublicAxios = {
  getProvinces(): Promise<AxiosResponse<ResponseModel<ProvinceModel[]>>> {
    return axiosClient.get(ENPOINT.provinces);
  },

  getDistricts({
    provinceCode,
  }: {
    provinceCode: number;
  }): Promise<AxiosResponse<ResponseModel<DistrictsModel[]>>> {
    return axiosClient.get(`${ENPOINT.districts}?provinceCode=${provinceCode}`);
  },

  getWards({
    provinceCode,
    districtCode,
  }: {
    provinceCode: number;
    districtCode: number;
  }): Promise<AxiosResponse<ResponseModel<WardsModel[]>>> {
    return axiosClient.get(
      `${ENPOINT.wards}?provinceCode=${provinceCode}&districtCode=${districtCode}`
    );
  },

  getJobCate(): Promise<AxiosResponse<ResponseModel<JobCategoryModel[]>>> {
    return axiosClient.get(ENPOINT.getJobCate);
  },

  getFeedsById(
    id: string
  ): Promise<AxiosResponse<ResponseModel<GetFeedsModel>>> {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: ENPOINT.getFeedById,
      headers: {
        accept: "application/json",
        feedsId: id,
      },
    };
    return axiosClient(config);
  },
};
