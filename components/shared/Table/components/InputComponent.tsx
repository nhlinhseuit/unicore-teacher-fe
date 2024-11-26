import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
  onChange: (newValue: string | number) => void;
  otherClassess?: string;
}

const InputComponent = (params: InputParams) => {
  const [inputValue, setInputValue] = useState(params.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Cập nhật state cục bộ

    params.onChange(e.target.value); // Gọi hàm onChange để truyền giá trị ra ngoài
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
          ${params.otherClassess || ""}`}
      />
    </div>
  );
};

export default InputComponent;
