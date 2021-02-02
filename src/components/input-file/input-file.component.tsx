import type { FC, InputHTMLAttributes, ChangeEventHandler } from "react";
import styles from "./input-file.module.scss";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  onChangeFiles(files: FileList): void;
};

const InputFile: FC<IProps> = (props) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const fileList = e.target.files;

      setFiles(fileList);
      props.onChangeFiles(fileList);
      props.onChange(e);
    },
    [props],
  );

  const inputProps = useMemo(() => {
    const allProps = { ...props };

    delete allProps.onChangeFiles;

    return allProps;
  }, [props]);

  const fileList = useMemo(
    () =>
      files
        ? Array.from(files).map((i) => {
            let sizeSuffix: string;

            if (i.size < 1000) {
              sizeSuffix = "byte";
            } else if (i.size < Math.pow(1000, 2)) {
              sizeSuffix = "kb";
            } else if (i.size < Math.pow(1000, 3)) {
              sizeSuffix = "mb";
            } else if (i.size < Math.pow(1000, 4)) {
              sizeSuffix = "gb";
            }

            return (
              <li key={i.name}>
                {i.name}, {i.size} {sizeSuffix}
              </li>
            );
          })
        : null,
    [files],
  );

  return (
    <>
      <input {...inputProps} className={styles.input} type={"file"} onChange={onChange} />
      <label className={classNames(styles.label, props.className)} htmlFor={props.id}>
        {props.placeholder}
      </label>
      {fileList && <ul>{fileList}</ul>}
    </>
  );
};

export { InputFile };
