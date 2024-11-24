import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Props {
  _id: string | number;
  name: String;
  otherClasses?: string;
}

const RenderFile = (params: Props) => {
  return (
    <Badge
      className={`
      cursor-pointer
      border-gray-200
      shadow-sm
      text-[10px] font-light leading-[12px] 
      italic 
      text-[#636363]
      rounded-2xl px-2 py-2 
      ${params.otherClasses}`}
    >
      <Image
        src={"/assets/icons/attach_file.svg"}
        width={18}
        height={18}
        alt={"file"}
        className={`object-contain cursor-pointer pr-1`}
      />
      {params.name}
    </Badge>
  );
};

export default RenderFile;
