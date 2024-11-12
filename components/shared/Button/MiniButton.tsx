import React from "react";
import Image from "next/image";

interface MiniButtonProps {
  icon: string;
  value: number;
  bgColor?: string;
  iconColor?: string;
  onClick: (value: number) => void;
  isActive?: boolean;
  otherClasses?: string;
}

const MiniButton = (params: MiniButtonProps) => {
  return (
    <div
      onClick={() => {
        params.onClick(params.value);
      }}
      className={`
             h-[40px]     
            w-[40px]    
            aspect-square
            rounded-full
            cursor-pointer 

            flex
            items-center
            justify-center
            hover:bg-primary-800
            text-sm
            px-1
            py-[8px]
            dark:bg-primary-600
            dark:hover:bg-primary-700
            focus:outline-none
            text-center

            ${params.bgColor}
            ${
              !params.bgColor &&
              "border-[1px] border-gray-400 font-medium text-gray-400"
            }
            ${params.otherClasses ? params.otherClasses : ""}
          `}
    >
      <Image
        src={params.icon}
        alt="search"
        width={24}
        height={24}
        className={` ${params.iconColor ? params.iconColor : ""} `}
      />
    </div>
  );
};

export default MiniButton;
