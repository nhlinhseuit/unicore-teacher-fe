import React from "react";

interface Props {
  text: string;
  bgColor?: string;
}

const SmallAvatar = (params: Props) => {
  return (
    <div
      className={`w-[28px] h-[28px] bg-[#8151FD] rounded-full flex-center text-white ${params.bgColor}`}
    >
      <p className="small-regular text-[10px]">{params.text}</p>
    </div>
  );
};

export default SmallAvatar;
