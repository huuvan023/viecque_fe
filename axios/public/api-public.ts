import {
  ProvinceModel,
  ResponseModel,
  DistrictsModel,
  WardsModel,
  JobCategoryModel,
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

  // getFeeds() {
  //   var data = JSON.stringify({
  //     page: 1,
  //     pageSize: 2,
  //     keyword: "",
  //     dateRange: ["1676598060000", "1676598190000"],
  //     jobType: 1,
  //     salaryRange: [10, 100000],
  //     provinceId: 10,
  //     districtId: 84,
  //     wardId: null,
  //     jobCate: "",
  //   });

  //   var config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:3000/api/public/filter-feeds",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //   return axiosClient(config);
  // },
};
