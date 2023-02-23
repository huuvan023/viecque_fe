import AppInput from "@Component/elements/Input";
import { Collapse } from "antd";
import React from "react";
import SliderComponent from "@Component/elements/Slider";
import SelectLocation from "@Component/elements/SelectLocation";
import SelectComponent from "@Component/elements/Select";
import SearchComponent from "@Component/elements/Search";

interface Props {
  onSearch: (value: string) => void;
}
const SearchBox = (props: Props) => {
  const { Panel } = Collapse;
  return (
    <>
      <SearchComponent onSearch={props.onSearch} />
      <Collapse accordion>
        <Panel header="Bộ lọc" key="1">
          <SelectLocation />
          <label>Mức lương</label>
          <SliderComponent />
          <SelectComponent />
        </Panel>
      </Collapse>
    </>
  );
};

export default SearchBox;
