import { apiAdminAxios } from "@Axios/admin/api-admin";
import { apiPublicAxios } from "@Axios/public/api-public";
import AppInput from "@Component/elements/Input";
import { JobCategoryModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Button, Divider, Form, List, Modal, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";

export default function JobCategoryComponent() {
  const [jobCategory, setjobCategory] = useState<JobCategoryModel[]>([]);
  const [openAddCateJob, setOpenAddCateJob] = useState(false);
  const [cateJob, setCateJob] = useState("");
  useEffect(() => {
    (async () => {
      getJobCategory();
    })();
  }, []);

  const getJobCategory = async () => {
    try {
      const response = await apiPublicAxios.getJobCate();
      setjobCategory(response.data.data);
    } catch (error) {}
  };
  const onRemoveCate = async (item: JobCategoryModel) => {
    try {
      const response = apiAdminAxios.removeCate(item.id);
      const newJob = [...jobCategory].filter((a) => a.id !== item.id);
      setjobCategory(newJob);
      openNotification("success", "Thành công", "Xóa job thành công!");
    } catch (error) {
      openNotification(
        "error",
        "Thất bại",
        "Xóa job thất bại vui lòng thử lại!"
      );
    }
  };
  const onAddCate = () => {
    if (!cateJob) {
      openNotification("error", "Thất bại", "Vui lòng điền tên job");
      return;
    }
    try {
      const response = apiAdminAxios.createCate(cateJob);
      getJobCategory();
      openNotification("success", "Thành công", "Thêm job thành công!");

      setCateJob("");
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
    }
    setOpenAddCateJob(false);
  };

  return (
    <>
      <Divider orientation="left">Default Size</Divider>
      <List
        header={<div>Header</div>}
        footer={
          <Button
            className="list-add-btn"
            onClick={() => setOpenAddCateJob(true)}
          >
            Thêm Jobcategory
          </Button>
        }
        bordered
        dataSource={jobCategory}
        renderItem={(item) => (
          <List.Item
            className="text-left"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <div> {item.name}</div>
              <div>
                <Space wrap>
                  <Popconfirm
                    placement="topRight"
                    title="Bạn có muốn xóa jobCate"
                    description="xóa"
                    onConfirm={() => onRemoveCate(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </Space>
              </div>
            </div>
          </List.Item>
        )}
      />
      <>
        <Modal
          title="Thêm JobCate"
          open={openAddCateJob}
          onOk={onAddCate}
          onCancel={() => {
            setOpenAddCateJob(false);
            setCateJob("");
          }}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form>
            <AppInput
              required={false}
              label="JobCate"
              placeholder="JobCate"
              value={cateJob}
              onChange={(event) => {
                setCateJob(event.target.value);
              }}
            />
          </Form>
        </Modal>
      </>
    </>
  );
}
