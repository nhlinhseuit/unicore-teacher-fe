import Image from "next/image";
import React from "react";
import StatusButton from "./Button/StatusButton";

interface Props {
  handleClick: () => void;
}

const ToggleTitle = (params: Props) => {
  return (
    <div
      className="flex items-center mt-4 mb-2 p-6"
      onClick={params.handleClick}
    >
      <div className="flex justify-start text-sm cursor-pointer">
        <p className="paragraph-semibold">Lịch đăng ký nhóm</p>
        <Image
          src="/assets/icons/chevron-down.svg"
          alt="previous"
          width={18}
          height={18}
          className="cursor-pointer ml-2 mr-2"
        />
      </div>
      <StatusButton
        gray
        text="Chưa diễn ra"
        info="Sẽ diễn ra vào ngày 20/11/2024"
        smallText
        otherClasses="ml-4"
      />
    </div>
  );
};

export default ToggleTitle;
