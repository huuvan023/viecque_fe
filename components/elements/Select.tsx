import React from "react";
import { Select } from "antd";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const SelectComponent: React.FC = () => (
  <Select
    showSearch
    style={{ width: "100%" }}
    size="large"
    placeholder="Loại công việc"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    removeIcon
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: "congnhan",
        label: "công nhân",
      },
    ]}
  />
);

export default SelectComponent;
