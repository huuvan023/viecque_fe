import { DateType } from "@Constants/datetype";
import { Select } from "antd";

interface Props {
  onSelectDateType: (value: string) => void;
  defaultValueDateType?: string;
  className?: string;
}
export default function ListDateType(props: Props) {
  return (
    <Select
      className={props.className}
      placeholder="Vui lòng chọn ngày đăng tin"
      size="large"
      onChange={(value: string) => props.onSelectDateType(value)}
      style={{ width: "100%" }}
      value={props.defaultValueDateType}
      options={DateType.map((item) => ({
        value: item.value,
        label: item.label,
      }))}
    />
  );
}
