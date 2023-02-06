import { BrandsModel } from "./brands.model";
export interface UserProfileModel {
  userId: string;
  email: string;
  phoneNumber: string[];
  fullName: string;
  brands: BrandsModel[];
}

export interface UpdateUserProfileModel {
  fullName: string;
  listPhoneNumbers: string[];
}
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}
