import React, { ChangeEventHandler } from "react";
import * as antd from "antd";

declare type LiteralUnion<T extends U, U> = T | (U & {});
interface Props {
  label: string;
  required?: boolean;
  requiredMessage?: string;
  placeholder: string;
  name: string;
  messageErr?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
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
  onChange?: ChangeEventHandler<any> | undefined;
}
export default function AppInput(props: Props) {
  return (
    <antd.Form.Item
      name={props.name}
      rules={[
        {
          required: props.value ? false : props.required ?? false,
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
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          type={props.type ?? "text"}
        />
        <span style={{ color: "red" }}>{props.messageErr}</span>
      </div>
    </antd.Form.Item>
  );
}
