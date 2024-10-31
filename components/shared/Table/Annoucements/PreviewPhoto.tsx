import Image from "next/image";
import React from "react";

interface PreviewPhotoProps {
  icon: string;
  alt: string;
}

const PreviewPhoto = (params: PreviewPhotoProps) => {
  return (
    <div
      className="border-2
        border-dashed
        border-gray-400
        p-2
        rounded-lg
        flex
        items-center
        justify-center
        "
    >
      <Image
        src={params.icon}
        width={100}
        height={100}
        alt={params.alt}
        className="w-full h-full object-contain p-4"
      />
    </div>
  );
};

export default PreviewPhoto;
