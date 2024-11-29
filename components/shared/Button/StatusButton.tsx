import React, { ReactNode } from "react";
import Image from "next/image";
import { Dropdown, Tooltip } from "flowbite-react";
import {} from "flowbite-react";

interface StatusButtonProps {
  text: string;
  infoComponent?: ReactNode;
  smallText?: boolean;
  temp?: boolean;
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
  gray?: boolean;
  orange?: boolean;

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

const StatusButton = (params: StatusButtonProps) => {
return (
    <div
      onClick={params.onClick ? params.onClick : undefined}
      className={`
        flex
        gap-1
        items-center
        justify-center
        ${params.border && "border border-gray-200"}
        ${params.isFilter && "border-[#2563EB]"} 
        ${params.textColor ? `${params.textColor}` : "text-white"} 

        ${params.temp ? `bg-[#17A1FA]` : ""} 
        ${params.orange ? `bg-[#f7921b]` : ""} 
        ${params.yellow ? `bg-[#FFC107]` : ""} 
        ${params.red ? `bg-[#F02021]` : ""} 
        ${params.green ? `bg-[#27CD95]` : ""} 
        ${params.gray ? `bg-[#CCCCCC]` : ""} 
        hover:bg-primary-800
        focus:ring-1
        focus:ring-gray-200
        font-medium
        rounded-3xl
        text-sm
        px-[2px]
        py-[2px]
        dark:bg-primary-600
        dark:hover:bg-primary-700
        focus:outline-none
        dark:focus:ring-primary-800
        h-auto
        text-center
        
        ${params.otherClasses}
        `}
    >
      <span
        title="text"
        className={`flex-grow pl-2 text-center ${
          params.smallText ? "text-[13px]" : ""
        } ${!params.infoComponent ? "pr-2" : ""}`}
      >
        {params.text}
      </span>

      {params.infoComponent && (
        <Tooltip
          content={params.infoComponent}
          style="dark"
          arrow={true}
          className="bg-[#1e1e1e] text-white text-[13px] py-1"
        >
          <Image
            src={
              params.orange || params.green
                ? "/assets/icons/info-white.svg"
                : "/assets/icons/info.svg"
            }
            alt="info"
            width={18}
            height={18}
            className="ml-1 mr-1 cursor-pointer"
          />
        </Tooltip>
      )}
    </div>
  );
};

export default StatusButton;
