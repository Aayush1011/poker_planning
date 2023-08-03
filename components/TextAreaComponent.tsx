import { TextAreaComponentProps } from "@/types";

const TextAreaComponent = ({
  label,
  textAreaValue,
  textAreaChange,
}: TextAreaComponentProps) => {
  return (
    <div>
      <label
        htmlFor="story"
        className="input-component__label--new-session-form"
      >
        {label}
      </label>
      <textarea
        name={label}
        id={label}
        cols={30}
        rows={7}
        className="input-component__field--new-session-form"
        value={textAreaValue}
        onChange={textAreaChange}
      ></textarea>
    </div>
  );
};

export default TextAreaComponent;
