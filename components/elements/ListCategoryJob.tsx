import React, { lazy, useEffect, useState } from "react";
import { Select } from "antd";
import { apiPublicAxios } from "@Axios/public/api-public";
import { openNotification } from "@Utils/notification";
import { JobCategoryModel } from "@Models/index";
import { removeVietnameseTones } from "@Utils/remove-vietnamese-tones";

interface Props {
  onSelectJobCate: (value: string) => void;
  valueDefault?: string;
  className?: string;
}
const ListCategoryJob = ({
  onSelectJobCate,
  valueDefault,
  className,
}: Props) => {
  const [jobCategoryList, setJobCategoryList] = useState<JobCategoryModel[]>(
    []
  );
  const [defaultCateJob, setDefaultCateJob] = useState({
    value: "",
    label: "",
  });
  useEffect(() => {
    getJobCategoryList();
  }, []);
  useEffect(() => {
    const newDefaultCateJob = jobCategoryList.find(
      (item) => item.id === valueDefault
    );
    setDefaultCateJob({
      value: newDefaultCateJob?.id ?? "",
      label: newDefaultCateJob?.name ?? "",
    });
  }, [valueDefault, jobCategoryList]);

  const getJobCategoryList = async () => {
    try {
      const response = await apiPublicAxios.getJobCate();
      setJobCategoryList(response?.data?.data);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };

  return (
    <Select
      className={className}
      showSearch
      style={{ width: "100%" }}
      size="large"
      placeholder="Loại công việc"
      optionFilterProp="children"
      onChange={onSelectJobCate}
      removeIcon
      value={defaultCateJob.value || undefined}
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
