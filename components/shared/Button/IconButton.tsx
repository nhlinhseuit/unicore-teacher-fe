import Image from "next/image";
import { Button } from "../../ui/button";

interface IconButtonProps {
  text: string;
  smallText?: boolean;
  temp?: boolean;
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
  blue?: boolean;
  gray?: boolean;
  purple?: boolean;

  onClick?: () => void;
  iconLeft?: string;
  iconRight?: string;
  iconWidth?: number;
  iconHeight?: number;
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
      type="button"
      className={`
        flex
        gap-1
        items-center
        justify-center
        ${params.border && "border light-border-2"}
        ${params.isFilter && "border-[#2563EB]"} 
        ${params.textColor ? `${params.textColor}` : "text-white"} 
        ${params.bgColor ? `${params.bgColor}` : "bg-primary-500"} 

        ${params.temp ? `bg-[#17A1FA]` : ""} 
        ${params.yellow ? `bg-[#FFC107]` : ""} 
        ${params.red ? `bg-[#F02021]` : ""} 
        ${params.green ? `bg-[#27CD95]` : ""} 
        ${params.blue ? `bg-[#7FC9FA]` : ""} 
        ${params.gray ? `bg-[#CCCCCC]` : ""} 
        ${params.purple ? `bg-[#8151fd]` : ""} 
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
        shadow-none
        ${params.otherClasses}
        `}
    >
      {/* LEFT ICON */}
      {params.iconLeft && (
        <Image
          src={params.iconLeft}
          width={params.iconWidth ? params.iconWidth : 20}
          height={params.iconHeight ? params.iconHeight : 20}
          alt="DevFlow"
          color="text-white"
        />
      )}

      <span
        className={`max-w-[300px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap flex-grow pl-2 pr-2 text-center ${
          params.smallText ? "text-[12px]" : ""
        }`}
      >
        {params.text}
      </span>

      {/* RIGHT ICON */}
      {params.iconRight && (
        <Image src={params.iconRight} width={18} height={18} alt="DevFlow" />
      )}
    </Button>
  );
};

export default IconButton;
