import { apiPublicAxios } from "@Axios/public/api-public";
import { LocationDataModel } from "@Models/index";
import React, { useEffect, useState } from "react";

const GetLocationString = (data: LocationDataModel) => {
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");
  useEffect(() => {
    (() => {
      getProvince();
      getDistricts();
      getWards();
    })();
  }, [data]);

  const getProvince = async () => {
    try {
      const response = await apiPublicAxios.getProvinces();
      setProvince(
        response.data.data.find((item) => item.code === data.provinceId)
          ?.name ?? "--"
      );
    } catch (error) {}
  };
  const getDistricts = async () => {
    try {
      const response = await apiPublicAxios.getDistricts({
        provinceCode: data.provinceId!,
      });
      setDistricts(
        response.data.data.find((item) => item.code === data.districtId)
          ?.name ?? "--"
      );
    } catch (error) {}
  };
  const getWards = async () => {
    try {
      const response = await apiPublicAxios.getWards({
        provinceCode: data.provinceId!,
        districtCode: data.districtId!,
      });
      setWards(
        response.data.data.find((item) => item.code === data.wardId)?.name ??
          "--"
      );
    } catch (error) {}
  };

  return (
    <div>
      {province} - {districts} - {wards}
    </div>
  );
};
export default GetLocationString;
