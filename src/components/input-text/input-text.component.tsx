import type { FC, InputHTMLAttributes } from "react";
import styles from "./input-text.module.scss";
import classNames from "classnames";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const InputText: FC<IProps> = (props) => {
  return <input {...props} className={classNames(styles.root, props.className)} type={"text"} />;
};

export { InputText };
