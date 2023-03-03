import React, { useEffect, useState } from "react";
import { apiPublicAxios } from "@Axios/public/api-public";
import { openNotification } from "@Utils/notification";
import { DistrictsModel, ProvinceModel, WardsModel } from "@Models/index";
import { Select } from "antd";

interface Props {}
const SelectLocation = (props: Props) => {
  const [province, setProvince] = useState<ProvinceModel[]>([]);
  const [districts, setDistricts] = useState<DistrictsModel[]>([]);
  const [wards, setWards] = useState<WardsModel[]>([]);
  const [provinceCurrent, setProvinceCurrent] = useState<{
    value: number;
    label: string;
  }>();
  const [districtsCurrent, setDistrictsCurrent] = useState<{
    value: number;
    label: string;
  }>();
  const [wardsCurrent, setWardsCurrent] = useState<{
    value: number;
    label: string;
  }>();

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <>
      <Select
        showSearch
        size="large"
        style={{ width: "100%" }}
        placeholder="Chọn tỉnh thành"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={(value, option: any) => {
          setProvinceCurrent(option);
        }}
        value={undefined}
        options={province.map((item) => ({
          value: item.code,
          label: item.name,
        }))}
      />
      {provinceCurrent ? (
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="Chọn huyện"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          onChange={(value, label) => {
            console.log(label, value);
          }}
          value={undefined}
          options={province.map((item) => ({
            value: item.code,
            label: item.name,
          }))}
        />
      ) : null}
      {districtsCurrent && provinceCurrent ? (
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="Chọn xã"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          value={undefined}
          options={province.map((item) => ({
            value: item.code,
            label: item.name,
          }))}
        />
      ) : null}
    </>
  );
};

export default SelectLocation;
