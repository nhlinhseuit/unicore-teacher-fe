import Image from "next/image";
import React from "react";

interface Props {
  id: string;
  teacher: string;
  otherClasses?: string;
}

const CourseItemDialog = (params: Props) => {
  return (
    <div
      className={`
        relative flex items-center justify-between
        rounded-lg cursor-pointer border-[1.5px]
        border-primary-500 text-black p-4 ${params.otherClasses}
      `}
    >
      <div className="flex flex-col justify-between w-full">
        <h4 className="body-bold">{params.id}</h4>
        <p className="small-regular text-left mt-2">{params.teacher}</p>
      </div>
    </div>
  );
};

export default CourseItemDialog;
