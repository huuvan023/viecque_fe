import {
  ProvinceModel,
  DistrictsModel,
  WardsModel,
  JobCategoryModel,
} from "@Models/index";

export interface CreateFeedModel {
  brandId: string;
  phoneNumber: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  detailsAddress: string;
  jobTitle: string;
  jobType: number;
  jobCategoryId: string;
  description: string;
  amountPeople: string;
  salary: string;
  salaryUnit: string;
  timeToStart: Date;
  position: string;
  experience: string;
}
export interface GetFeedsModel {
  id: string;
  userId: string;
  timeCreated: string;
  brandId: string;
  phoneNumber: string;
  provinceId: ProvinceModel;
  districtId: DistrictsModel;
  wardId: WardsModel;
  detailsAddress: string;
  jobTitle: string;
  jobType: string;
  feedsStatus: string;
  description: string;
  amount: number;
  salary: number;
  salaryUnit: string;
  timeToStart: string;
  jobCate: JobCategoryModel;
  position: string;
  experience: string;
}
