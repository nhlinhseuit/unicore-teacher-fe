import { Input } from "@/components/ui/input";
import React from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
}

const InputComponent = (params: InputParams) => {
  return (
    <div className="relative inline-block">
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
        placeholder='Trống'
        value={params.value}
        onChange={() => {}}
        style={{ width: 200 }}
        className="
          paragraph-regular no-focus placeholder  
          background-light800_darkgradient
          shadow-none outline-none border-none truncate"
      />
    </div>
  );
};

export default InputComponent;
