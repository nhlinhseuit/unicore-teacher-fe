import React from "react";

interface Props {
  id: number;
  text: string;
  value: number;
  handleClick: () => void;
}

const CheckboxComponent = (params: Props) => {
  return (
    <div className="flex gap-4">
      <input
        id={params.text}
        name={params.text}
        type="radio"
        checked={params.value === params.id}
        onChange={params.handleClick}
        className="w-4 h-4 cursor-pointer"
      />
      <label
        htmlFor={params.text}
        className="cursor-pointer body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0"
      >
        {params.text}
      </label>
    </div>
  );
};

export default CheckboxComponent;
