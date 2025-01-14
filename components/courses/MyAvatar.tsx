import { createInitials } from "@/lib/utils";
import React from "react";

interface Props {
  text: string;
}

const MyAvatar = (params: Props) => {
  return (
    <div className="w-[40px] h-[40px] bg-[#8151FD] rounded-full flex-center text-white">
      <p className="paragraph-regular">{createInitials(params.text)}</p>
    </div>
  );
};

export default MyAvatar;
