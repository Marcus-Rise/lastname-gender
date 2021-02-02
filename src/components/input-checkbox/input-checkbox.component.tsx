import type { FC, InputHTMLAttributes } from "react";
import { useMemo } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const InputCheckbox: FC<IProps> = (props) => {
  const inputProps = useMemo(() => {
    const allProps = { ...props };

    delete allProps.className;

    return allProps;
  }, [props]);

  return (
    <div className={props.className}>
      <input {...inputProps} type={"checkbox"} />
      <label htmlFor={props.id}>{props.placeholder}</label>
    </div>
  );
};

export { InputCheckbox };
