"use client";
import CoursesDataTable from "@/components/shared/Table/UnicoreTable/CoursesDataTable";
import React from "react";
import IconButton from "@/components/shared/IconButton";

const Courses = () => {
  return (
    <>
      <div className="flex justify-end gap-4 mt-3 mb-3 items-center">
        <IconButton
          text="Import danh sách lớp mới"
          onClick={() => {}}
          iconLeft={"/assets/icons/add.svg"}
        />
      </div>
      <CoursesDataTable />
    </>
  );
};

export default Courses;
