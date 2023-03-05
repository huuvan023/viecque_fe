import { CSSProperties } from "react";

interface Props {
  textBtn: string;
  onClick?: Function;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  style?: CSSProperties | undefined;
}
export default function AppButton({
  textBtn,
  onClick,
  className,
  style,
  type,
}: Props) {
  return (
    <button
      style={style}
      type={type}
      className={
        className ?? "btn btn-default btn-shadow ml-40 hover-up mb-3 mt-3"
      }
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {textBtn}
    </button>
  );
}
