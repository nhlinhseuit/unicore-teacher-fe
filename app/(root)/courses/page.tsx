"use client";
import CoursesDataTable from "@/components/shared/Table/UnicoreTable/CoursesDataTable";
import TabsComponent from "@/components/shared/TabsComponent";
import Link from "next/link";
import React from "react";

const Courses = () => {
  return (
    <>
      {/* <div
        className="
      flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
       
        <Link href="/create-announcement">
          <IconButton text="Tạo thông báo" />
        </Link>
      </div> */}

      <div className="flex w-full flex-col gap-6">
        <TabsComponent type="courses" />

        <CoursesDataTable />
      </div>
    </>
  );
};

export default Courses;
