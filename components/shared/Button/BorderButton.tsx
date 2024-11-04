import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";

interface BorderButtonProps {
  text: string;
  value: string;
  onClick: (value: string) => void;
  isActive?: boolean;
}

const BorderButton = (params: BorderButtonProps) => {
  return (
    <Button
      onClick={() => {
        params.onClick(params.value);
      }}
      className={`
        flex
        gap-1
        items-center
        justify-center
        hover:bg-primary-800
        font-medium
        rounded-lg
        text-sm
        px-4
        py-[8px]
        dark:bg-primary-600
        dark:hover:bg-primary-700
        focus:outline-none
        h-auto
        text-center

        !bg-transparent
        ${
          params.isActive
            ? " border-[1.5px] border-primary-500 text-primary-500 font-semibold"
            : "border-[1px] border-gray-400 font-medium text-gray-400"
        }
        `}
    >
      <span className="flex-grow pl-2 pr-2 text-center">{params.text}</span>
    </Button>
  );
};

export default BorderButton;
