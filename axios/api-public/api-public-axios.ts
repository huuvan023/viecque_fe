import { DistrictsModel, ProvincesModel, WardsModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiPublicAxios = {
  getProvinces(): Promise<AxiosResponse<ProvincesModel>> {
    return axiosClient.get(ENPOINT.get_provinces);
  },

  getDistricts({
    provinceCode,
  }: {
    provinceCode: number;
  }): Promise<AxiosResponse<DistrictsModel>> {
    return axiosClient.get(
      `${ENPOINT.get_districts}?provinceCode=${provinceCode}`
    );
  },
  getWards({
    provinceCode,
    districtCode,
  }: {
    provinceCode: number;
    districtCode: number;
  }): Promise<AxiosResponse<WardsModel>> {
    return axiosClient.get(
      `${ENPOINT.get_wards}?provinceCode=${provinceCode}&districtCode=${districtCode}`
    );
  },
};
