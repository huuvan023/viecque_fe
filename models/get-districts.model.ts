import { FormModel } from "./form-model";
export interface DistrictsDataModel {
  name: string;
  code: number;
  provinceCode: number;
}
export interface DistrictsModel extends FormModel<DistrictsDataModel> {}
