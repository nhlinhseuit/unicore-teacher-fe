import Image from "next/image";
import React from "react";

interface ErrorComponentParams {
  text: string;
  onClickClose: () => void;
}
const ErrorComponent = (params: ErrorComponentParams) => {
  return (
    <div className="bg-[#F2DEDF] w-full h-12  rounded-lg flex-center mb-2 relative">
      <p className="ml-4 mr-6 text-[#D4423E] body-medium">{params.text}</p>
      <Image
        src={"/assets/icons/close.svg"}
        width={22}
        height={22}
        alt="close"
        className="absolute right-0 mr-4 cursor-pointer"
        onClick={params.onClickClose}
      />
    </div>
  );
};

export default ErrorComponent;
