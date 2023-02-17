import { apiAdminAxios } from "@Axios/admin/api-admin";
import { apiPublicAxios } from "@Axios/public/api-public";
import AppInput from "@Component/elements/Input";
import { JobCategoryModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Button, Divider, Form, List, Modal, Space } from "antd";
import { useEffect, useState } from "react";

export default function ListUserComponent() {
  const [userList, setuserList] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      getAllUser();
    })();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await apiAdminAxios.getAllUser();
      setuserList(response.data.data);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
  };

  return (
    <>
      <Divider orientation="left">Default Size</Divider>
      <List
        header={<div>Header</div>}
        bordered
        dataSource={userList}
        renderItem={(item) => (
          <List.Item
            className="text-left"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <div> {item.username}</div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
