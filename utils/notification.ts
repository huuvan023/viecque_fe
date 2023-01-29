import { Form, notification } from "antd";
type NotificationType = "error" | "success";
export const openNotification = (
  type: NotificationType,
  title: string,
  message: string
) => {
  notification[type]({
    message: title,
    description: message,
  });
};
