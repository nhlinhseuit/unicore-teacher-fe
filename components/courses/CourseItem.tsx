import React, { useState } from "react";
import MoreButtonCourseItem from "./MoreButtonCourseItem";

interface Props {
  id: string;
  name: string;
  semester: string;
  year: string;
  teachers: string;
  color: string;
}

const CourseItem = (params: Props) => {
  return (
    <div
      className="w-[250px] h-[140px] rounded-lg cursor-pointer
              shadow-md text-black p-4 flex flex-col justify-between"
      style={{ backgroundColor: params.color }}
    >
      <div>
        <h4 className="body-bold">{params.id}</h4>
        <p className="small-regular mt-2">{params.name}</p>
        <p className="small-regular mt-1 italic text-[#636363] line-clamp-1">
          HK{params.semester}/{params.year}
        </p>
      </div>

      {params.teachers !== '' ? (
        <p className="small-regular text-center">GV: {params.teachers}</p>
      ) : null}
    </div>
  );
};

export default CourseItem;
