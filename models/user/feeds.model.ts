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
  jobType: number;
  jobCategoryId: string;
  description: string;
  amountPeople: string;
  salary: string;
  salaryUnit: string;
  timeToStart: Date;
  workingTime: string;
}
export interface GetFeedsModel {
  id: string;
  createdBy: string;
  timeCreated: "2023-02-25 17:31";
  branding: BrandsModel;
  phoneNumber: "0372746758";
  provinceId: ProvinceModel;
  districtId: DistrictsModel;
  wardId: WardsModel;
  detailsAddress: string;
  jobTitle: string;
  jobType: string;
  feedsStatus: "ACTIVE";
  description: string;
  amount: 1;
  salary: 100000;
  salaryUnit: string;
  timeToStart: Date;
  jobCate: JobCategoryModel;
  workingTime: string;
}
