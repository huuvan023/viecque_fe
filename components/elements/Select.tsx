import React, { lazy, useEffect, useState } from "react";
import { Select } from "antd";
import { apiPublicAxios } from "@Axios/public/api-public";
import { openNotification } from "@Utils/notification";
import { JobCategoryModel } from "@Models/index";
import { removeVietnameseTones } from "@Utils/remove-vietnamese-tones";

interface Props {
  onSelectJobCate: (value: string) => void;
  valueDefault?: string;
}
const ListCategoryJob = ({ onSelectJobCate, valueDefault }: Props) => {
  useEffect(() => {
    getJobCategoryList();
  }, []);

  const getJobCategoryList = async () => {
    try {
      const response = await apiPublicAxios.getJobCate();
      setJobCategoryList(response?.data?.data);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };
  const [jobCategoryList, setJobCategoryList] = useState<JobCategoryModel[]>(
    []
  );
  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      size="large"
      placeholder="Loại công việc"
      optionFilterProp="children"
      onChange={onSelectJobCate}
      removeIcon
      value={valueDefault}
      filterOption={(input, option) =>
        removeVietnameseTones(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      options={jobCategoryList.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
    />
  );
};

export default ListCategoryJob;
