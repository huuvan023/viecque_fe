import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import type { SliderMarks } from "antd/es/slider";
import { useRouter } from "next/router";
type Formatter = (value?: number) => React.ReactNode;
const marks: SliderMarks = {
  1: "0",
  1000000: "1tr",
  10000000: "10tr",
  20000000: "20tr",
  50000000: {
    style: {
      color: "#f50",
    },
    label: <strong>50tr</strong>,
  },
};
interface Props {
  onChange: (value: [number, number]) => void;
  defaultValue: [number, number];
}
const SliderComponent = (props: Props) => {
  const router = useRouter();
  const formatter: Formatter = (value?: number) => {
    const moneys = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value!);
    return moneys;
  };

  return (
    <>
      <Slider
        min={1}
        max={50000000}
        tooltip={{ formatter: formatter }}
        included
        range
        step={100000}
        onChange={props.onChange}
        marks={marks}
        defaultValue={props.defaultValue}
      />
    </>
  );
};

export default SliderComponent;
