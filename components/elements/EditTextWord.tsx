import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

interface Props {
  onChange: (value: string) => void;
  value: string;
}
function EditTextWord(props: Props) {
  return <ReactQuill value={props.value} onChange={props.onChange} />;
}

export default EditTextWord;
