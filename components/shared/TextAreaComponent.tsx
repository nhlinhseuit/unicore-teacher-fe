import React from "react";

interface Props {
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  otherClassess?: string;
}

const TextAreaComponent = (params: Props) => {
  return (
    <textarea
      value={params.value}
      onChange={params.onChange}
      placeholder={params.placeholder}
      className={`
        no-focus
        paragraph-regular
        background-light900_dark300
        light-border-2
        text-dark300_light700
        min-h-[200px]
        rounded-md
        border
        resize-none
        w-full
        px-3
        py-4
        focus:outline-none
        focus:ring-0
        active:outline-none
        focus:border-inherit
        text-sm

        ${params.otherClassess}
        `}
    />
  );
};

export default TextAreaComponent;
