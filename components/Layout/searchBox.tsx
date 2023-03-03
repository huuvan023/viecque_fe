import { Button, Collapse, DatePicker, Select, Popover } from "antd";
import React from "react";
import SliderComponent from "@Component/elements/Slider";
import SearchComponent from "@Component/elements/Search";
import ListCategoryJob from "@Component/elements/Select";
import AppLocation from "./AppLocation";
import { Jobtype } from "@Constants/jobtype";
const { RangePicker } = DatePicker;
import { FilterOutlined } from "@ant-design/icons";
import ImageAssets from "@Component/elements/ImageAssets";
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
      <div className="d-flex">
        <SearchComponent onSearch={props.onSearch} />

        <Popover
          placement="bottomRight"
          title={<span>Bộ lọc</span>}
          content={
            <div>
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
            </div>
          }
          trigger="click"
        >
          <Button
            className="d-flex align-items-center justify-content-center"
            type="dashed"
            style={{ height: "100%" }}
          >
            {/* <FilterOutlined /> */}
            {/* filter-icon.svg */}
            <ImageAssets
              width={20}
              height={30}
              src="assets/imgs/icon/filter-icon.svg"
              alt="logo"
            />
          </Button>
        </Popover>
      </div>
    </>
  );
};

export default SearchBox;
