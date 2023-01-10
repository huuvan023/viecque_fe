import { FormModel } from "./form-model";

export interface ProvincesDataModel {
  name: string;
  code: number;
}

export interface ProvincesModel extends FormModel<ProvincesDataModel> {}
