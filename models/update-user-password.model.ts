import { FormModel } from "./form-model";
export interface NewUserPasswordModel {
  oldPassword: string;
  newPassword: string;
}
export interface UpdateUserPasswordModel extends FormModel<any> {}
