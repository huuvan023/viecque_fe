import { RegisterModel, ResponseModel, VerifyUserModel } from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";

export const apiPaymentAxios = {
  momo({
    feedsId,
    description,
  }: {
    feedsId: string;
    description: string;
  }): Promise<AxiosResponse<ResponseModel<null>>> {
    return axiosClient.post(ENPOINT.paymentMomo, {
      orderInfo: description,
      items: [
        {
          id: 0,
          description: 1,
          quantity: 1,
        },
      ],
      extraData: {
        feedsId: feedsId,
      },
    });
  },
};
