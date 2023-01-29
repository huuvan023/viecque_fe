import { FormModel } from "./form-model";
export interface GetUserInfoDataModel {
  userId: string;
  email: string;
  phoneNumber: string[];
  fullName: string;
  brands: any;
}
export interface GetUserInfoModel extends FormModel<GetUserInfoDataModel> {}
