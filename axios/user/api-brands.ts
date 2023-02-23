import { BrandsModel, ResponseModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";
import FormData from "form-data";

export const apiBrandsAxios = {
  createBrand(
    data: FormData
  ): Promise<AxiosResponse<ResponseModel<BrandsModel>>> {
    var config = {
      method: "post",
      url: ENPOINT.brands,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    return axiosClient(config);
  },
  updateBrand(data: FormData): Promise<AxiosResponse<ResponseModel<null>>> {
    var config = {
      method: "put",
      url: ENPOINT.brands,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    return axiosClient(config);
  },
  getBrandById(
    id: string
  ): Promise<AxiosResponse<ResponseModel<BrandsModel[]>>> {
    return axiosClient.get(`${ENPOINT.brands}?brandId=${id}`);
  },
};
