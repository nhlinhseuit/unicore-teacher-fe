import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../../ui/button";
import IconButton from "../Button/IconButton";

interface Props {
  title: string;
  description: string;
  link?: string;
  linkTitle?: string;
  handleFileUpload?: (e: any) => void;
}

const NoResult = (params: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <Image
        src="/assets/images/no_data.svg"
        alt="No reuslt illustration"
        width={300}
        height={300}
        className="block object-contain dark:hidden"
      />

      <h2 className="mt-8 h2-bold text-dark200_light900">{params.title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-wd text-center">
        {params.description}
      </p>

      {params.linkTitle && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={params.handleFileUpload}
            style={{ display: "none" }}
          />

          <IconButton
            text={params.linkTitle}
            onClick={handleButtonClick}
            iconLeft={"/assets/icons/upload-white.svg"}
            iconWidth={16}
            iconHeight={16}
          />
        </div>
      )}
    </div>
  );
};

export default NoResult;
