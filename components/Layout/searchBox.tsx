import { Select, Popover, Button } from "antd";
import React from "react";
import SliderComponent from "@Component/elements/Slider";
import SearchComponent from "@Component/elements/Search";
import ListCategoryJob from "@Component/elements/ListCategoryJob";
import { Jobtype } from "@Constants/jobtype";
import ImageAssets from "@Component/elements/ImageAssets";
import SelectLocation from "./SelectLocation";
import ListJobType from "@Component/elements/ListJobType";
import ListDateType from "@Component/elements/ListDateType";
import { LocationDataModel } from "@Models/index";

interface Props {
  onClearFilter: () => void;
  onSearch: (value: string) => void;
  onSalary: (value: [number, number]) => void;
  defaultValueSalary: [number, number];
  onSelectJobCate: (value: string) => void;
  defaultValueJobCate?: string;
  onSelectJobType: (value: string) => void;
  defaultValueJobType?: string;
  onSelectDateType: (value: string) => void;
  defaultValueDateType?: string;
  defaultLocation?: LocationDataModel;
  handleLocationData: (locationData: LocationDataModel) => void;
}
const SearchBox = (props: Props) => {
  return (
    <div className="d-flex">
      <SearchComponent onSearch={props.onSearch} />

      <Popover
        placement="bottomRight"
        title={<span>Bộ lọc</span>}
        content={
          <div>
            <SelectLocation
              defaultLocation={props.defaultLocation}
              handleLocationData={props.handleLocationData}
            />
            <label>Mức lương</label>
            <SliderComponent
              onChange={props.onSalary}
              defaultValue={props.defaultValueSalary}
            />
            <ListCategoryJob
              className="mt-2"
              valueDefault={props.defaultValueJobCate}
              onSelectJobCate={props.onSelectJobCate}
            />
            <ListJobType
              className="mt-2"
              onSelectJobType={props.onSelectJobType}
              defaultValueJobType={props.defaultValueJobType}
            />

            <ListDateType
              className="mt-2"
              onSelectDateType={props.onSelectDateType}
              defaultValueDateType={props.defaultValueDateType}
            />
            <div className="mt-2 text-end">
              <Button size="large" danger onClick={() => props.onClearFilter()}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        }
        trigger="click"
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "41px", marginLeft: "5px", cursor: "pointer" }}
        >
          <ImageAssets
            src="assets/imgs/icon/config-icon.png"
            alt="logo"
            className="w-100 h-100"
          />
        </div>
      </Popover>
    </div>
  );
};

export default SearchBox;
