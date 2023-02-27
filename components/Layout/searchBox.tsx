import { Collapse, DatePicker, Select } from "antd";
import React from "react";
import SliderComponent from "@Component/elements/Slider";
import SelectLocation from "@Component/elements/SelectLocation";
import SearchComponent from "@Component/elements/Search";
import ListCategoryJob from "@Component/elements/Select";
import AppLocation from "./AppLocation";
import { Jobtype } from "@Constants/jobtype";
const { RangePicker } = DatePicker;

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
          <div
            style={{
              width: "100%",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <RangePicker style={{ width: "100%" }} size="large" />
          </div>
          <Select
            // defaultValue="lucy"
            placeholder="Vui lòng chọn loại thời gian làm việc"
            size="large"
            style={{ width: "100%" }}
            // value={}
            options={Jobtype}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default SearchBox;
