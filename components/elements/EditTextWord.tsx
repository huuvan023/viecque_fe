import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import { ReactQuillProps } from "react-quill";
interface Props extends ReactQuillProps {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
}
function EditTextWord(props: Props) {
  return (
    <ReactQuill
      {...props}
      value={props.value}
      onChange={props.onChange}
      style={{
        height: "18em",
      }}
      placeholder={`
      Thời gian làm việc : 
      Ca sáng : 10h
      Ca chiều : 8h
   
      Tăng ca : 100.000đ / giờ
   
      Ca 1 : làm từ ..., sau đó làm....
      `}
    />
  );
}

export default EditTextWord;
