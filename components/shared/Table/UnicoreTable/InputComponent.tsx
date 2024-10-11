import { Input } from "@/components/ui/input";
import React from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
}

const InputComponent = (params: InputParams) => {
  return (
    <Input
      type="text"
      placeholder={typeof(params.placeholder) == 'string' ? params.placeholder : 'number'}
      value={params.value}
      onChange={() => {}}
      className="
        paragraph-regular no-focus placeholder  
        background-light800_darkgradient
        shadow-none outline-none border-none truncate max-w-[150px]"
    />
  );
};

export default InputComponent;
