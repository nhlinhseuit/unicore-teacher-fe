import IconButton from "@/components/shared/IconButton";
import SimpleDataTable from "@/components/shared/Table/UnicoreTable/SimpleDataTable";
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

      <div className="mt-10 flex w-full flex-col gap-6">
        <SimpleDataTable />
      </div>
    </>
  );
};

export default Courses;
