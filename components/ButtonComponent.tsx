"use client";

import { ButtonComponentProps } from "@/types";

const ButtonComponent = ({
  text,
  colorClass,
  hoverColor,
  callback,
  disabled,
}: ButtonComponentProps) => {
  return (
    <div
      className={`shadow-[0px_4px_12px_#3637403d] max-w-3xl w-full flex items-center justify-center mt-4 hover:transition hover:ease-in-out hover:delay-50 ${colorClass} ${hoverColor} hover:duration-300`}
    >
      <button
        type="submit"
        className="font-semibold text-sm py-4 px-6 text-center tracking-wider text-white no-underline w-full h-full bg-transparent border-none hover:cursor-pointer disabled:bg-gray-light disabled:text-gray-dark"
        onClick={callback}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
