import React from "react";
import { Steps } from "antd";

const description = "Đang thực hiện";
interface Props {
  currentStep: number;
}
const StepCreateFeed = ({ currentStep }: Props) => (
  <Steps
    current={currentStep}
    items={[
      {
        title: "Điền thông tin",
        description,
      },
      {
        title: "Bản xem trước",
        description,
      },
      {
        title: "Thanh toán",
        description,
      },
    ]}
  />
);

export default StepCreateFeed;
