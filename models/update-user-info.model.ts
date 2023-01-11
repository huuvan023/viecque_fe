import { FormModel } from "./form-model";

export interface NewUserInfoModel {
  fullName: string;
  listPhoneNumbers: string[];
}
export interface UpdateUserInfoModel extends FormModel<any> {}
