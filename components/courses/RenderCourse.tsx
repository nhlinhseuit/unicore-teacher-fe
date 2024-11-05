import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Props {
  _id: string | number;
  name: String;
  otherClasses?: string;
}

const RenderCourse = (params: Props) => {
  return (
    <Badge
      className={`
      cursor-pointer
      border-gray-200
      shadow-sm
      text-[11px] font-light leading-[12px] 
      italic 
      text-[#636363]
      rounded-2xl px-2 py-2 
      ${params.otherClasses}`}
    >
      {params.name}
    </Badge>
  );
};

export default RenderCourse;
