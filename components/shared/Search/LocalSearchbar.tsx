"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`
  background-light800_darkgradient flex h-[50px]
  grow items-center gap-4 rounded-[10px] px-4 max-sm:hidden hover:shadow-sm
  max-w-[600px]
  ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={() => {}}
        className="
        paragraph-regular no-focus placeholder 
        background-light800_darkgradient
        shadow-none outline-none border-none truncate"
      />
      {iconPosition === "right" && (
        <div className="cursor-pointer bg-primary-500 h-[50px] flex items-center px-4 translate-x-4 rounded-tr-[10px] rounded-br-[10px]">
          <Image
            src={imgSrc}
            alt="search icon"
            width={24}
            height={24}
          />
        </div>
      )}
    </div>
  );
};

export default LocalSearchbar;
