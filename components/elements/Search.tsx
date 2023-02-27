import React from "react";
import { AutoComplete, Input } from "antd";

interface Props {
  onSearch: (value: string) => void;
}
const SearchComponent = (props: Props) => {
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: "100%", marginBottom: "10px" }}
    >
      <Input.Search
        size="large"
        placeholder="Tìm kiếm"
        enterButton
        onSearch={(value) => props.onSearch(value)}
      />
    </AutoComplete>
  );
};

export default SearchComponent;
