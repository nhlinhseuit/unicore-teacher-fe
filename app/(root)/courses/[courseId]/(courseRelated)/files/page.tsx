"use client";

import IconButton from "@/components/shared/Button/IconButton";
import FileDataTable from "@/components/shared/Table/TableFile/FileDataTable";
import React from "react";

const Files = () => {
  const mockFileDataTable = [
    {
      STT: 1,
      isDeleted: false,
      data: {
        "Tên file": "Nộp bài tập 27/9/2024.docx",
        "Ngày sửa đổi": "27 tháng 9 năm 2024",
        "Người sửa đổi": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },

    {
      STT: 2,
      isDeleted: false,
      data: {
        "Tên file": "Nộp bài tập 27/9/2024.xlsx",
        "Ngày sửa đổi": "27 tháng 9 năm 2024",
        "Người sửa đổi": "Lê Thành Lộc",
      },
    },
    {
      STT: 3,
      isDeleted: false,
      data: {
        "Tên file": "Nộp bài tập 27/9/2024.pdf",
        "Ngày sửa đổi": "27 tháng 9 năm 2024",
        "Người sửa đổi": "Nguyễn Hoàng Linh",
      },
    },
    {
      STT: 4,
      isDeleted: false,
      data: {
        "Tên file": "Nộp bài tập 27/9/2024.pptx",
        "Ngày sửa đổi": "27 tháng 9 năm 2024",
        "Người sửa đổi": "Lê Thành Lộc",
      },
    },
    {
      STT: 5,
      isDeleted: false,
      data: {
        "Tên file": "Nộp bài tập 27/9/2024.zip",
        "Ngày sửa đổi": "27 tháng 9 năm 2024",
        "Người sửa đổi": "Nguyễn Hoàng Linh",
      },
    },
  ];

  return (
    <>
      <>
        <div className="flex justify-end mb-3 gap-2">
          <IconButton
            text="Tải lên"
            green
            onClick={() => {}}
            iconLeft={"/assets/icons/upload-white.svg"}
            iconWidth={16}
            iconHeight={16}
          />

          <IconButton
            text="Tải xuống"
            onClick={() => {}}
            iconLeft={"/assets/icons/download-white.svg"}
            iconWidth={16}
            iconHeight={16}
          />
        </div>

        <FileDataTable
          isEditTable={false}
          isMultipleDelete={false}
          // @ts-ignore
          dataTable={mockFileDataTable}
        />
      </>
    </>
  );
};

export default Files;
