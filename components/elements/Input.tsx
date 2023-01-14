import React from "react";
import * as antd from "antd";

declare type LiteralUnion<T extends U, U> = T | (U & {});
interface Props {
  label: string;
  required?: boolean;
  requiredMessage?: string;
  placeholder: string;
  name: string;
  type?: LiteralUnion<
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week",
    string
  >;
}
export default function AppInput(props: Props) {
  return (
    <antd.Form.Item
      name={props.name}
      rules={[
        {
          required: props.required ?? false,
          message: props.requiredMessage ?? "",
        },
      ]}
    >
      <div>
        <label className="form-label" htmlFor="input-1">
          {props.label}
          {props.required ? <span style={{ color: "red" }}>*</span> : null}
        </label>
        <antd.Input
          placeholder={props.placeholder}
          type={props.type ?? "text"}
        />
      </div>
    </antd.Form.Item>
  );
}
