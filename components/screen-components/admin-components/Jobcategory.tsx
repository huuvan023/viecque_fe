import { apiAdminAxios } from "@Axios/admin/api-admin";
import { apiPublicAxios } from "@Axios/public/api-public";
import AppInput from "@Component/elements/Input";
import { JobCategoryModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Button, Divider, Form, List, Modal, Space } from "antd";
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
      console.log(item);
    } catch (error) {}
  };
  const onAddCate = () => {
    if (!cateJob) {
      openNotification("error", "Thất bại", "Vui lòng điền tên job");
      return;
    }
    try {
      const response = apiAdminAxios.createCate(cateJob);
      getJobCategory();
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
                  <Button danger onClick={() => onRemoveCate(item)}>
                    Xóa
                  </Button>
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
