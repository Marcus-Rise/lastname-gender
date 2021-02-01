import type { FC } from "react";
import styles from "./card.module.scss";

const Card: FC = (props) => {
  return <div className={styles.root}>{props.children}</div>;
};

export { Card };
