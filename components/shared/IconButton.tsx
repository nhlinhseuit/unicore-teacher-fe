import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface IconButtonProps {
  text: string;
  onClick?: () => void;
  iconLeft?: string;
  iconRight?: string;
  bgColor?: string;
  textColor?: string;
  border?: boolean;
  otherClasses?: string;
  isFilter?: boolean;
}

const IconButton = (params: IconButtonProps) => {
  return (
    <Button
      onClick={params.onClick ? params.onClick : undefined}
      className={`
        ${params.otherClasses}
        flex
        items-center
        justify-center
        ${params.border && "border border-gray-200"}
        ${params.isFilter && 'border-[#2563EB]'}
        ${params.textColor ? `${params.textColor}` : "text-white"} 
        ${params.bgColor ? `${params.bgColor}` : "bg-primary-500"} 
        hover:bg-primary-800
        focus:ring-1
        focus:ring-gray-200
        font-medium
        rounded-lg
        text-sm
        px-4
        py-2
        dark:bg-primary-600
        dark:hover:bg-primary-700
        focus:outline-none
        dark:focus:ring-primary-800
        h-auto
        text-center
        `}
    >
      {/* LEFT ICON */}
      {params.iconLeft && (
        <Image
          src={params.iconLeft}
          width={20}
          height={20}
          alt="DevFlow"
        />
      )}

      <span className="flex-grow text-center pl-2 pr-2">{params.text}</span>

      {/* RIGHT ICON */}
      {params.iconRight && (
        <Image
          src={params.iconRight}
          width={18}
          height={18}
          alt="DevFlow"
        />
      )}
    </Button>
  );
};


export default IconButton;
