"use client";

import IconButton from "@/components/shared/Button/IconButton";
import SubjectsDataTable from "@/components/shared/Table/UnicoreTable/SubjectsDataTable";
import Image from "next/image";
import React, { useState } from "react";

const Subjects = () => {
  const [isImport, setIsImport] = useState(false);

  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mb-3">
            <IconButton
              text="Import danh sách môn mới"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>
          <div className="flex justify-end gap-4 mb-3 items-center">
            <p className="italic text-sm">* Học kỳ hiện tại: HK1, năm 2024</p>
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
            <p>Quay lại danh sách môn học</p>
          </div>

          <SubjectsDataTable />
        </>
      )}
    </>
  );
};

export default Subjects;
