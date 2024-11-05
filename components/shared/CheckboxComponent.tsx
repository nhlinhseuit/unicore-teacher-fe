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
        type="radio"
        checked={params.value === params.id}
        onChange={params.handleClick}
        className="w-4 h-4 cursor-pointer"
      />
      <p className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0">
        {params.text}
      </p>
    </div>
  );
};

export default CheckboxComponent;
