import React from "react";

type ButtonNativeType = "button" | "submit" | "reset";
type ButtonShapes = "round" | "circle" | "plain" | "";
type ButtonSize = "small" | "medium" | "large";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonNativeType;
  shape?: ButtonShapes;
  children?: any;
  disabled?: boolean;
  autofocus?: boolean;
}