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
    <ReactQuill {...props} value={props.value} onChange={props.onChange} />
  );
}

export default EditTextWord;
