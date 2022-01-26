import classNames from "classnames";
import { IButtonProps } from "./type";
import "./index.scss";

export default function Button({
  type="button",
  shape="",
  disabled,
  autofocus,
  children
}: IButtonProps) {

  const buttonStyle = {

  }

  return (
    <button type={type} className={classNames(["hitch-button", `${shape}`, `${disabled ? "is-disabled" : ""}`])} disabled={disabled} autoFocus={autofocus}>
      {children}
    </button>
  );
}
