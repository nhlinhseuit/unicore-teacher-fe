"use client";
import TeachersDataTable from "@/components/shared/Table/UnicoreTable/TeachersDataTable";
import React, { useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";

const Teachers = () => {
  const [isImport, setIsImport] = useState(false);
  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mt-3 mb-3">
            <IconButton
              text="Import danh sách giảng viên"
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
            text={"Quay lại danh sách giảng viên"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <TeachersDataTable />
        </>
      )}
    </>
  );
};

export default Teachers;
