import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { apiPublicAxios } from "@Axios/public/api-public";
import { BaseOptionType } from "antd/es/cascader";
import { openNotification } from "@Utils/notification";
import { LocationDataModel } from "@Models/index";
interface Option extends BaseOptionType {
  label: React.ReactNode;
  value?: string | number | null;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
  code?: number;
  provinceCode?: number;
  districtCode?: number;
  wardsCode?: number;
}

interface Props {
  handleLocationData: (locationData: LocationDataModel) => void;
  changeOnSelect?: boolean;
}
const AppLocation = ({ handleLocationData, changeOnSelect }: Props) => {
  useEffect(() => {
    (async () => {
      try {
        const response = await apiPublicAxios.getProvinces();
        const dataProvinces: Option[] = response.data?.data?.map((item) => ({
          value: item.code,
          code: item.code,
          label: item.name,
          isLeaf: false,
        }));
        setOptions(dataProvinces);
      } catch (error) {
        openNotification(
          "error",
          "Thất bại",
          "Lấy thông tin provinces thất bại!"
        );
      }
    })();
  }, []);

  const [options, setOptions] = useState<Option[]>([]);

  const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
    const locationData: LocationDataModel = {};
    value?.forEach((item, index) => {
      if (index === 0) {
        locationData.provinceId = +item;
      }
      if (index === 1) {
        locationData.districtId = +item;
      }
      if (index === 2) {
        locationData.wardId = +item;
      }
    });
    handleLocationData(locationData);
  };

  const loadDatas = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    if (selectedOptions.length === 1) {
      const code = targetOption.code;
      const response = await apiPublicAxios.getDistricts({
        provinceCode: +code!,
      });
      targetOption.loading = false;
      const targetOptionData = response.data?.data?.map((item) => ({
        value: item.code,
        label: item.name,
        code: item.code,
        provinceCode: item.provinceCode,
        districtCode: item.code,
        isLeaf: false,
      }));
      targetOption.children = targetOptionData;
      setOptions([...options]);
    }
    if (selectedOptions.length === 2) {
      const districtCode = targetOption.districtCode;
      const provinceCode = targetOption.provinceCode;
      const response = await apiPublicAxios.getWards({
        provinceCode: +provinceCode!,
        districtCode: +districtCode!,
      });
      targetOption.loading = false;
      const targetOptionData = response.data?.data?.map((item) => ({
        label: item.name,
        value: item.code,
        code: item.code,
        provinceCode: item.provinceCode,
        districtCode: item.districtCode,
        wardsCode: item.code,
        isLeaf: true,
      }));
      targetOption.children = targetOptionData;
      setOptions([...options]);
    }
  };

  return (
    <Cascader
      size="large"
      placement="topLeft"
      placeholder="Chọn vị trí"
      style={{ width: "100%" }}
      options={options}
      loadData={loadDatas}
      onChange={onChange}
      changeOnSelect={changeOnSelect}
    />
  );
};

export default AppLocation;
