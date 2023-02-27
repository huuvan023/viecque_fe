import { TreeSelect, RadioChangeEvent } from "antd";
import { useEffect } from "react";
const SelectLocation: React.FC = () => {
  const treeData = [
    {
      value: "Hồ chí minh",
      title: "Hồ chí minh",
      children: [
        {
          value: "Hồ chí minh - Quận 1",
          title: "Hồ chí minh - Quận 1",
          children: [
            {
              value: "Hồ chí minh - Quận 1 - Phường 3",
              title: "Hồ chí minh - Quận 1 - Phường 3",
            },
            {
              value: "Hồ chí minh - Quận 1 - Phường 2",
              title: "Hồ chí minh - Quận 1 - Phường 2",
            },
          ],
        },
        {
          value: "Hồ chí minh - Quận 2 - Phường 4",
          title: "Hồ chí minh - Quận 2 - Phường 4",
        },
      ],
    },
    {
      value: "Tiền Giang",
      title: "Tiền Giang",
      children: [
        {
          value: "Tiền Giang - Cai Lậy",
          title: "Tiền Giang - Cai Lậy",
          children: [
            {
              value: "Tiền Giang - Cai Lậy - Phường 3",
              title: "Tiền Giang - Cai Lậy - Phường 3",
            },
            {
              value: "Tiền Giang - Cai Lậy - Phường 2",
              title: "Tiền Giang - Cai Lậy - Phường 2",
            },
          ],
        },
        {
          value: "Tiền Giang - Long Định",
          title: "Tiền Giang - Long Định",
        },
      ],
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
      <TreeSelect
        size="large"
        treeData={treeData}
        style={{ width: "100%", marginTop: "-5px", marginBottom: "10px" }}
        showSearch
        dropdownStyle={{ maxHeight: 400, overflow: "auto", minWidth: 300 }}
        placeholder="Chọn khu vực"
        dropdownMatchSelectWidth={false}
        placement="bottomLeft"
        allowClear
        treeDefaultExpandAll
      />
    </>
  );
};
export default SelectLocation;
