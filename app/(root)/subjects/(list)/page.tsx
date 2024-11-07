"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import SubjectsDataTable from "@/components/shared/Table/TableUnicore/SubjectsDataTable";
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
          <BackToPrev
            text={"Quay lại danh sách môn học"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <SubjectsDataTable />
        </>
      )}
    </>
  );
};

export default Subjects;
