"use client";
import StudentsDataTable from "@/components/shared/Table/UnicoreTable/StudentsDataTable";
import React, { useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import Image from "next/image";

const Students = () => {
  const [isImport, setIsImport] = useState(false);
  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mt-3 mb-3">
            <IconButton
              text="Import danh sách sinh viên"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex justify-start mt-4 mb-6 text-sm cursor-pointer"
            onClick={() => {
              setIsImport(false);
            }}
          >
            <Image
              src="/assets/icons/chevron-left-table.svg"
              alt="previous"
              width={21}
              height={21}
              className="cursor-pointer mr-2"
            />
            <p>Quay lại danh sách sinh viên</p>
          </div>

          <StudentsDataTable />
        </>
      )}
    </>
  );
};

export default Students;
