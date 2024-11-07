"use client";
import StudentsDataTable from "@/components/shared/Table/TableUnicore/StudentsDataTable";
import React, { useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";

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
          <BackToPrev
            text={"Quay lại danh sách sinh viên"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <StudentsDataTable />
        </>
      )}
    </>
  );
};

export default Students;
