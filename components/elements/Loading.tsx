import GlobalStateContext from "@Store/Context";
import { Spin } from "antd";
import React, { useContext } from "react";

export default function Loading() {
  return (
    <div className="loading">
      <Spin tip="Đang tải..." size="large" spinning={true}></Spin>
    </div>
  );
}
