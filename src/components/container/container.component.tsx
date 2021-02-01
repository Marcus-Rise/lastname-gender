import type { FC } from "react";
import styles from "./container.module.scss";
import classNames from "classnames";

const Container: FC<{ center?: boolean; fullHeight?: boolean }> = (props) => {
  return (
    <div
      className={classNames(styles.root, {
        [styles.center]: props.center,
        [styles.fullHeight]: props.fullHeight,
      })}
    >
      {props.children}
    </div>
  );
};

export { Container };
