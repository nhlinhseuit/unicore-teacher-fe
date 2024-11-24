import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: String;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        className="
        uppercase
      borde-2 border-gray-200
      shadow-sm
      text-[10px] 
      font-semibold 
      leading-[12px]
      text-[#1F86E8] 
      rounded-md px-4 py-2 "
      >
        {name}
      </Badge>
    </Link>
  );
};

export default RenderTag;
