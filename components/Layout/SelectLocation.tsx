import React, { useEffect, useState } from "react";
import { apiPublicAxios } from "@Axios/public/api-public";
import { openNotification } from "@Utils/notification";
import {
  DistrictsModel,
  LocationDataModel,
  ProvinceModel,
  WardsModel,
} from "@Models/index";
import { Select } from "antd";
import { removeVietnameseTones } from "@Utils/remove-vietnamese-tones";
interface Props {
  defaultLocation?: LocationDataModel;
  handleLocationData: (locationData: LocationDataModel) => void;
}
const SelectLocation = ({ handleLocationData, defaultLocation }: Props) => {
  const [province, setProvince] = useState<ProvinceModel[]>([]);
  const [districts, setDistricts] = useState<DistrictsModel[]>([]);
  const [wards, setWards] = useState<WardsModel[]>([]);
  const [provinceCurrent, setProvinceCurrent] = useState<{
    label: any;
    value: any;
    data: ProvinceModel;
  } | null>();
  const [districtsCurrent, setDistrictsCurrent] = useState<{
    label: any;
    value: any;
    data: DistrictsModel;
  } | null>();
  const [wardsCurrent, setWardsCurrent] = useState<{
    label: any;
    value: any;
    data: WardsModel;
  } | null>();
  const [provinceCurrentDefault, setProvinceCurrentDefault] = useState<{
    label: any;
    value: any;
    data: ProvinceModel;
  } | null>();
  const [districtsCurrentDefault, setDistrictsCurrentDefault] = useState<{
    label: any;
    value: any;
    data: DistrictsModel;
  } | null>();
  const [wardsCurrentDefault, setWardsCurrentDefault] = useState<{
    label: any;
    value: any;
    data: WardsModel;
  } | null>();

  useEffect(() => {
    (() => {
      getProvince();
    })();
  }, []);
  useEffect(() => {
    if (defaultLocation?.provinceId) {
      setProvinceCurrentDefault({
        label: defaultLocation?.provinceId?.name,
        value: defaultLocation?.provinceId?.code,
        data: defaultLocation?.provinceId,
      });
      if (defaultLocation?.districtId) {
        setDistrictsCurrentDefault({
          label: defaultLocation?.districtId?.name,
          value: defaultLocation?.districtId?.code,
          data: defaultLocation?.districtId,
        });
        getDistricts(defaultLocation.provinceId!);
        if (defaultLocation?.wardId) {
          setWardsCurrentDefault({
            label: defaultLocation?.wardId?.name,
            value: defaultLocation?.wardId?.code,
            data: defaultLocation?.wardId,
          });
          getWards(defaultLocation.districtId!);
        }
      }
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (provinceCurrent?.data || districtsCurrent?.data || wardsCurrent?.data) {
      handleLocationData({
        provinceId: provinceCurrent?.data,
        districtId: districtsCurrent?.data,
        wardId: wardsCurrent?.data,
      });
    }
  }, [provinceCurrent, districtsCurrent, wardsCurrent]);

  const getProvince = async () => {
    try {
      const response = await apiPublicAxios.getProvinces();
      setProvince(response.data?.data ?? []);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        "Lấy thông tin provinces thất bại!"
      );
    }
  };
  const getDistricts = async (province: ProvinceModel) => {
    try {
      const response = await apiPublicAxios.getDistricts({
        provinceCode: province.code,
      });
      setDistricts(response.data?.data ?? []);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        "Lấy thông tin districts thất bại!"
      );
    }
  };
  const getWards = async (districts: DistrictsModel) => {
    try {
      const response = await apiPublicAxios.getWards({
        provinceCode: districts.provinceCode,
        districtCode: districts.code,
      });
      setWards(response.data?.data ?? []);
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        "Lấy thông tin districts thất bại!"
      );
    }
  };

  return (
    <>
      <Select
        showSearch
        size="large"
        style={{ width: "100%" }}
        placeholder="Chọn tỉnh thành"
        optionFilterProp="children"
        filterOption={(input, option) =>
          removeVietnameseTones(option?.label ?? "").includes(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        value={provinceCurrent ?? provinceCurrentDefault}
        onChange={(value, option: any) => {
          setDistrictsCurrent(null);
          setDistrictsCurrentDefault(null);
          setWardsCurrentDefault(null);
          setWardsCurrent(null);
          setProvinceCurrent(option);
          getDistricts(option.data);
        }}
        options={province.map((item) => ({
          label: item.name,
          value: item.code,
          data: item,
        }))}
      />
      {provinceCurrent || defaultLocation?.provinceId ? (
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="Chọn huyện"
          optionFilterProp="children"
          filterOption={(input, option) =>
            removeVietnameseTones(option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          onChange={(value, option: any) => {
            setDistrictsCurrent(option);
            setWardsCurrent(null);
            setWardsCurrentDefault(null);
            getWards(option.data);
          }}
          value={districtsCurrent ?? districtsCurrentDefault}
          options={districts.map((item) => ({
            value: item.code,
            label: item.name,
            data: item,
          }))}
        />
      ) : null}
      {(districtsCurrent && provinceCurrent) ||
      defaultLocation?.provinceId ||
      defaultLocation?.districtId ? (
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="Chọn xã"
          optionFilterProp="children"
          filterOption={(input, option) =>
            removeVietnameseTones(option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          value={wardsCurrent ?? wardsCurrentDefault}
          onChange={(value, option: any) => {
            setWardsCurrent(option);
          }}
          options={wards.map((item) => ({
            value: item.code,
            label: item.name,
            data: item,
          }))}
        />
      ) : null}
    </>
  );
};

export default SelectLocation;
