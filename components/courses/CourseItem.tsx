import React from "react";
import MoreButtonCourseItem from "./MoreButtonCourseItem";

const CourseItem = () => {
  return (
    <div
      className="w-[250px] h-[130px] rounded-lg cursor-pointer
              border-[1.5px] border-primary-500 text-black p-4 flex flex-col justify-between"
    >
      <>
        <h4 className="body-bold">SE114.O12.PMCL</h4>
        <p className="small-regular  leading-[8px]">
          Nhập môn Ứng dụng di động - SE114
        </p>
        <p className="small-regular  leading-[8px]">HK1/2024</p>
      </>

      <p className="small-regular text-center">Trịnh Văn A, Nguyễn Văn H, +1</p>
    </div>
  );
};

export default CourseItem;
