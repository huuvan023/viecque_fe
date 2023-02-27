import { Collapse } from "antd";
import React from "react";
import SliderComponent from "@Component/elements/Slider";
import SelectLocation from "@Component/elements/SelectLocation";
import SearchComponent from "@Component/elements/Search";
import ListCategoryJob from "@Component/elements/Select";
import AppLocation from "./AppLocation";

interface Props {
  onSearch: (value: string) => void;
  onSalary: (value: [number, number]) => void;
  defaultValueSalary: [number, number];
  onSelectJobCate: (value: string) => void;
  defaultValueJobCate?: string;
}
const SearchBox = (props: Props) => {
  const { Panel } = Collapse;
  return (
    <>
      <SearchComponent onSearch={props.onSearch} />
      <Collapse accordion>
        <Panel header="Bộ lọc" key="1">
          {/* <SelectLocation /> */}
          <AppLocation
            changeOnSelect={false}
            handleLocationData={(locationData) => console.log(locationData)}
          />
          <label>Mức lương</label>
          <SliderComponent
            onChange={props.onSalary}
            defaultValue={props.defaultValueSalary}
          />
          <ListCategoryJob
            valueDefault={props.defaultValueJobCate}
            onSelectJobCate={props.onSelectJobCate}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default SearchBox;
