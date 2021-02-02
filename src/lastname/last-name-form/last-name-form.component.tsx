import type { FC } from "react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./last-name-form.module.scss";
import { Button, InputCheckbox, InputFile, InputText } from "../../components";

type ILastNameFormData = string | { file: File; resultAsFile: boolean };

const LastNameForm: FC<{
  onSubmit(data: string | { file: File; resultAsFile: boolean }): void;
}> = (props) => {
  const { control, handleSubmit } = useForm();
  const [files, setFiles] = useState<File[] | null>(null);

  const onSubmit = useCallback(
    (data: { lastname?: string; file?: string; returnFile: boolean }): void => {
      if (files) {
        props.onSubmit({ file: files[0], resultAsFile: data.returnFile });
      } else {
        props.onSubmit(data.lastname);
      }
    },
    [props, files],
  );

  const selectFiles = useCallback((files: File[]) => {
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

        <Controller
          name={"returnFile"}
          defaultValue={false}
          control={control}
          render={({ name, value, onChange }) => (
            <InputCheckbox
              className={styles.inputResultFile}
              name={name}
              id={name}
              checked={!!value}
              onChange={() => onChange(!value)}
              placeholder={"Отдать файлом"}
            />
          )}
        />

        <Button className={styles.submit}>Узнать</Button>
      </div>
    </form>
  );
};

export { LastNameForm };
export type { ILastNameFormData };
