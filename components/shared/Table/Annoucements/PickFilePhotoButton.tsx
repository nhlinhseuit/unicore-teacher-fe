import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";

interface PickFilePhotoButtonProps {
  handleButtonClick: () => void;
  icon: string;
  alt: string;
  text: string;
}

const PickFilePhotoButton = (params: PickFilePhotoButtonProps) => {
  return (
    <Button
      onClick={params.handleButtonClick}
      className="pr-4 no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border"
    >
      <Image
        src={params.icon}
        width={17}
        height={17}
        alt={params.alt}
        className={`object-contain cursor-pointer mr-4 translate-y-[5%]`}
      />
      {params.text}
    </Button>
  );
};

export default PickFilePhotoButton;
