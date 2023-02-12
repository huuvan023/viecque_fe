export interface ProvinceModel {
  name: string;
  code: number;
}
export interface DistrictsModel {
  name: string;
  code: number;
  provinceCode: number;
}
export interface WardsModel {
  name: string;
  code: number;
  provinceCode: number;
  districtCode: number;
}


export interface LocationDataModel{
  
    provinceId?: number;
    districtId?: number;
    wardId?: number;
   
}