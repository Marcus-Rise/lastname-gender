import type { FC } from "react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./last-name-form.module.scss";
import { Button, InputFile, InputText } from "../../components";

const LastNameForm: FC<{
  onSubmit(data: string | File): void;
}> = (props) => {
  const { control, handleSubmit } = useForm();
  const [files, setFiles] = useState<FileList | null>(null);

  const onSubmit = useCallback(
    (data: { lastname: string }): void => {
      if (files) {
        props.onSubmit(files[0]);
      } else {
        props.onSubmit(data.lastname);
      }
    },
    [props, files],
  );

  const selectFiles = useCallback((files: FileList) => {
    setFiles(files);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <Controller
          name={"lastname"}
          defaultValue={""}
          control={control}
          render={({ name, value, onChange }) => (
            <InputText
              className={styles.inputText}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={"Введи фамилию"}
            />
          )}
        />

        <span className={styles.span}>или</span>

        <Controller
          name={"file"}
          defaultValue={""}
          control={control}
          render={({ name, value, onChange }) => (
            <InputFile
              className={styles.inputFile}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              onChangeFiles={selectFiles}
              placeholder={"Загрузи файл"}
              accept={".txt"}
            />
          )}
        />

        <Button className={styles.submit}>Узнать</Button>
      </div>
    </form>
  );
};

export { LastNameForm };
