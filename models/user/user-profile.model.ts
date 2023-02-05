import { BrandsModel } from "./brands.model";
export interface UserProfileModel {
  userId: string;
  email: string;
  phoneNumber: string[];
  fullName: string;
  brands: BrandsModel[];
}
