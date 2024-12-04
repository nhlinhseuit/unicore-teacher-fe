import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
  onChange: (newValue: string | number) => void;
  otherClassess?: string;
  isDescription?: boolean;
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
        <textarea
          value={inputValue}
          onChange={handleTextAreaChange}
          placeholder="Trống"
          className="
            no-focus
            paragraph-regular
            background-light800_darkgradient
            light-border-2
            text-dark300_light700
            min-h-[120px]
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
            paragraph-regular no-focus placeholder
            background-light800_darkgradient
            shadow-none outline-none border-none 
            custom-scrollbar-desc
            "
        />
      ) : (
        <Input
          type="text"
          placeholder="Trống"
          value={inputValue}
          onChange={handleInputChange}
          className={`
            paragraph-regular no-focus placeholder
            background-light800_darkgradient
            shadow-none outline-none border-none truncate
            w-[200px] 
            ${params.otherClassess && ""}
            ${params.isDescription && "w-full"}
          `}
        />
      )}
    </div>
  );
};

export default InputComponent;
