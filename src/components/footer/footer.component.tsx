import type { FC } from "react";
import styles from "./footer.module.scss";
import { useMemo } from "react";

const Footer: FC = () => {
  const fullYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.root}>
      <div>
        &copy; {fullYear}{" "}
        <a target={"_blank"} rel={"noreferrer"} href={"https://marcus-rise.dev"}>
          Ilya Konstantinov
        </a>
      </div>
      <div className={styles.source}>
        Source code is on{" "}
        <a target={"_blank"} rel={"noreferrer"} href="https://github.com/Marcus-Rise/lastname-gender">
          Github
        </a>
      </div>
    </footer>
  );
};

export { Footer };
