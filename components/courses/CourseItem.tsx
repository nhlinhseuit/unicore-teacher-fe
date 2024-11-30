import React, { useState } from "react";
import MoreButtonCourseItem from "./MoreButtonCourseItem";

interface Props {
  id: string;
  name: string;
  semester: string;
  teachers: string;
  color: string;
}

const CourseItem = (params: Props) => {

  return (
    <div
      className="w-[250px] h-[140px] rounded-lg cursor-pointer
              shadow-md text-black p-4 flex flex-col justify-between"
              style={{ backgroundColor: params.color}}
    >
      <div>
        <h4 className="body-bold">{params.id}</h4>
        <p className="small-regular mt-2">{params.name}</p>
        <p className="small-regular mt-1 italic text-[#636363] line-clamp-1">
          {params.semester}
        </p>
      </div>

      <p className="small-regular text-center">{params.teachers}</p>
    </div>
  );
};

export default CourseItem;
