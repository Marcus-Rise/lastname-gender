import type { FC, InputHTMLAttributes, ChangeEventHandler } from "react";
import styles from "./input-file.module.scss";
import classNames from "classnames";
import { useCallback, useMemo } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  onChangeFiles(files: FileList): void;
};

const InputFile: FC<IProps> = (props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      props.onChangeFiles(e.target.files);
      props.onChange(e);
    },
    [props],
  );

  const inputProps = useMemo(() => {
    const allProps = { ...props };

    delete allProps.onChangeFiles;

    return allProps;
  }, [props]);

  return (
    <>
      <input {...inputProps} className={styles.input} type={"file"} onChange={onChange} />
      <label className={classNames(styles.label, props.className)} htmlFor={props.id}>
        {props.placeholder}
      </label>
    </>
  );
};

export { InputFile };
