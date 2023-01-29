import { FormModel } from "./form-model";
export interface WardsDataModel {
  name: string;
  code: number;
  provinceCode: number;
  districtCode: number;
}

export interface WardsModel extends FormModel<WardsDataModel> {}
