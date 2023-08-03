"use client";

import { InputComponentProps } from "@/types";

const InputComponent = ({
  inputName,
  inputType,
  inputLabel,
  inputPlaceholder,
  onChange,
  inputValue,
  styles,
}: InputComponentProps) => {
  return (
    //remove this classname if problem occurs
    <div className={styles.div}>
      <label className={styles.label} htmlFor={inputName}>
        {inputLabel}
      </label>
      <input
        className={styles.field}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onChange={onChange}
        value={inputValue}
      ></input>
    </div>
  );
};

export default InputComponent;
