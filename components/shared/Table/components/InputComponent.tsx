import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import TextAreaComponent from "../../TextAreaComponent";

interface InputParams {
  placeholder: string | number;
  value: string | number;
  onChange: (newValue: string | number) => void;
  otherClassess?: string;
  isDescription?: boolean;
  isInTable?: boolean;
}

const InputComponent = (params: InputParams) => {
  const [inputValue, setInputValue] = useState(params.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    params.onChange(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    params.onChange(e.target.value);
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
      {params.isDescription ? (
        <TextAreaComponent
          value={inputValue}
          onChange={handleTextAreaChange}
          placeholder={params.placeholder.toString() || "Trống"}
        />
      ) : (
        <Input
          type="text"
          placeholder={params.placeholder.toString() || "Trống"}
          value={inputValue}
          onChange={handleInputChange}
          className={`
            paragraph-regular no-focus placeholder
            background-light800_darkgradient
            shadow-none outline-none border-none truncate
            w-[200px]
            ${params.otherClassess || ""}
          `}
        />
      )}
    </div>
  );
};

export default InputComponent;
