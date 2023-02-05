import React from "react";
import { Slider } from "antd";
import type { SliderMarks } from "antd/es/slider";
type Formatter = (value?: number) => React.ReactNode;
const marks: SliderMarks = {
  0: "0",
  10: "10tr",
  20: "20tr",
  30: "30tr",
  40: "40tr",
  50: {
    style: {
      color: "#f50",
    },
    label: <strong>50tr</strong>,
  },
};
const SliderComponent = () => {
  const formatter: Formatter = (value?: number) => `${value}tr`;
  return (
    <>
      <Slider
        min={0}
        max={50}
        tooltip={{ formatter: formatter }}
        included
        range
        step={5}
        marks={marks}
        defaultValue={[10, 20]}
      />
    </>
  );
};

export default SliderComponent;
