import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  otherClassess?: string;
  isLongText?: boolean;
  isDisabled?: boolean;
}

const InputForm = (params: InputParams) => {
  const [inputValue, setInputValue] = useState(params.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    params.onChange(e);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    params.onChange(e);
  };

  return (
    <div className="relative w-full">
      <span
        className="absolute invisible whitespace-pre"
        style={{
          fontSize: "1rem",
          fontFamily: "inherit",
        }}
      >
        {params.value || params.placeholder}
      </span>
      {params.isLongText ? (
        <textarea
          disabled={params.isDisabled}
          value={inputValue}
          onChange={handleTextAreaChange}
          placeholder={params.placeholder.toString() || "Trống"}
          className={`
          no-focus
          paragraph-regular
          text-dark300_light700
          min-h-[120px]
          rounded-md
          resize-none
          min-w-[300px]
          w-full
          px-3
          py-4
          focus:outline-none
          focus:ring-0
          active:outline-none
          focus:border-inherit
          text-sm
          paragraph-regular no-focus placeholder
          shadow-none outline-none
          custom-scrollbar-desc
          border light-border-2 bg-transparent
         
          ${params.otherClassess || ""}
          `}
        />
      ) : (
        <Input
          disabled={params.isDisabled}
          name={params.name}
          type="text"
          placeholder={params.placeholder.toString() || "Trống"}
          value={inputValue}
          onChange={handleInputChange}
          className={`
            paragraph-regular no-focus placeholder
            shadow-none outline-none truncate
            w-[200px]
             ${
               params.isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
             }
            ${params.otherClassess || ""}
          `}
        />
      )}
    </div>
  );
};

export default InputForm;
