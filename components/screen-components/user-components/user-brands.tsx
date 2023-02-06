import AppInput from "@Component/elements/Input";
import { useLoading } from "@Hooks/use-loading";
import { BrandsModel, UserProfileModel } from "@Models/index";
import { openNotification } from "@Utils/notification";
import { Avatar, Button, Form, List, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { apiBrandsAxios } from "@Axios/user/api-brands";
import { apiUserProfileAxios } from "@Axios/user/api-user-profile";
const UserBrands = () => {
  const [modifyBrands, setModifyBrands] = useState(false);
  const [oneBrand, setOneBrand] = useState<BrandsModel | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
  const { setLoading } = useLoading();
  useEffect(() => {
    getDataUser();
  }, []);

  const onEdit = async (brand: BrandsModel) => {
    setOneBrand(brand);
    setModifyBrands(true);
  };
  const onAdd = () => {
    setOneBrand(null);
    setModifyBrands(true);
  };

  const getDataUser = async () => {
    try {
      const response = await apiUserProfileAxios.getUserProfile();
      setUserProfile(response.data.data);
      setLoading(false);
    } catch (error: any) {
      const message = error.response.data.message;
      openNotification("error", "Thất bại", message);
      setLoading(false);
    }
  };
  return (
    <div>
      <List
        header={<div className="list-number-phone">Danh sách nhãn hiệu</div>}
        bordered
        className="demo-loadmore-list mt-4"
        itemLayout="horizontal"
        dataSource={userProfile?.brands ?? []}
        renderItem={(item: BrandsModel) => (
          <List.Item
            actions={[
              <button
                key={Math.floor(Math.random() * 1000000)}
                className="btn-edit-brands"
                onClick={() => {
                  onEdit(item!);
                }}
              >
                Chỉnh sửa
              </button>,
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item.resourceUrl} />}
                title={<a>{item.name}</a>}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Button className="list-add-btn mt-1" onClick={onAdd}>
        Thêm nhãn hiệu
      </Button>
      <ModifyBrands
        brand={oneBrand}
        open={modifyBrands}
        onCancel={(event: boolean) => {
          setModifyBrands(event);
          setOneBrand(null);
        }}
        onSuccess={() => {
          getDataUser();
        }}
      />
    </div>
  );
};

const ModifyBrands = ({
  brand,
  open,
  onCancel,
  onSuccess,
}: {
  brand: BrandsModel | null;
  open: boolean;
  onCancel: Function;
  onSuccess: Function;
}) => {
  const [file, setFile] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { setLoading } = useLoading();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setDescription(brand.description);
      setFileList([
        {
          uid: "dasdas",
          url: brand.resourceUrl,
          name: "dasdasd",
        },
      ]);
      fetch(brand.resourceUrl!)
        .then((data) => data.blob())
        .then((blob) => {
          const file = new File([blob], "image", { type: blob.type });
          const fileRead = new FileReader();
          fileRead.readAsBinaryString(file);
          fileRead.addEventListener("load", () => {
            const res = fileRead.result;

            setFile(res);
          });
        });
    }
  }, [brand]);

  const onSave = async () => {
    if (!name || !description || fileList?.length < 1) {
      openNotification("error", "Thất bại", "Vui lòng điền đủ thông tin");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append(
      "data",
      JSON.stringify({ name: name, description: description })
    );
    if (!brand) {
      setLoading(true);
      onCancel(false);

      try {
        const response = await apiBrandsAxios.createBrand(data);
        resetData();
        if (response) {
          openNotification(
            "success",
            "Thành công",
            "Thêm nhãn hiệu thành công"
          );
        }
        onSuccess();
      } catch (error) {
        console.log(error);
        openNotification(
          "error",
          "Thất bại",
          "Thêm nhãn hiệu thất bại, vui lòng kiểm tra lại"
        );
        resetData();
      }
    } else {
      // const response = await apiBrandsAxios.updateBrand(data);
    }
  };

  const resetData = () => {
    setFile(null);
    setLoading(false);
    setFileList([]);
    setName("");
    setDescription("");
    setFile(null);
    onCancel(false);
  };
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Modal
      title={brand ? "Chỉnh sửa nhãn hiệu" : "Thêm nhãn hiệu"}
      open={open}
      onCancel={() => {
        resetData();
      }}
      onOk={onSave}
      okText="Lưu"
      cancelText="Hủy"
    >
      <ImgCrop rotate>
        <Upload
          action={(file: RcFile) => {
            setFile(file);

            return "";
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList?.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <Form>
        <AppInput
          required={true}
          name="nameBrands"
          label="Tên nhãn hiệu"
          value={name}
          placeholder="Tên nhãn hiệu"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <div>
          <label className="form-label" htmlFor="input-1">
            Thông tin nhãn hiệu <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            value={description}
            name="description"
            placeholder="Thông tin nhãn hiệu"
            rows={4}
            cols={50}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default UserBrands;
