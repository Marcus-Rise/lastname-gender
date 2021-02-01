import type { FC, ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type IProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<IProps> = (props) => {
  return (
    <button {...props} className={classNames(styles.root, props.className)}>
      {props.children}
    </button>
  );
};

export { Button };
