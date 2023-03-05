import { Jobtype } from "@Constants/jobtype";
import { Select } from "antd";

interface Props {
  onSelectJobType: (value: string) => void;
  defaultValueJobType?: string;
  className?: string;
}
export default function ListJobType(props: Props) {
  return (
    <Select
      className={props.className}
      placeholder="Vui lòng chọn loại việc làm"
      size="large"
      onChange={(value: string) => props.onSelectJobType(value)}
      style={{ width: "100%" }}
      value={props.defaultValueJobType}
      options={Jobtype.map((item) => ({
        value: item.value,
        label: item.label,
      }))}
    />
  );
}
