import {
  ProvinceModel,
  DistrictsModel,
  WardsModel,
  JobCategoryModel,
  BrandsModel,
} from "@Models/index";

export interface CreateFeedModel {
  brandId: string;
  phoneNumber: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  detailsAddress: string;
  jobTitle: string;
  jobType: string;
  jobCategoryId: string;
  description: string;
  amountPeople: string;
  salary: string;
  salaryUnit: string;
  timeToStart: Date;
  workingTime: string;
}
export interface UpdateFeedModel extends CreateFeedModel {
  feedsId: string;
}
export interface GetFeedsModel {
  id: string;
  createdBy: string;
  timeCreated: Date;
  branding: BrandsModel;
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
  timeToStart: Date;
  jobCate: JobCategoryModel;
  workingTime: string;
}
