"use client";

import PureButton from "../../PureButton";
import { useState } from "react";
import * as XLSX from "xlsx";
import { SubjectDataItem } from "@/types";
import DataTable from "./DataTable";

export default function SubjectsDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState<SubjectDataItem[]>([]);

  // XỬ LÝ UPLOAD FILE MÔN HỌC
  const handleCoursesFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Bỏ 5 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 5, // Chỉ số 5 đại diện cho hàng 6 (vì index bắt đầu từ 0)
      });

      const transformedData = parsedData.map((item: any) => ({
        type: "subject",
        STT: item.STT,
        data: {
          "Khoa QL": item["Khoa QL"],
          "Mã MH": item["Mã MH"],
          "Hình thức thi LT GIỮA KỲ": item["Hình thức thi\r\nLT GIỮA KỲ"],
          "Thời gian thi LT GIỮA KỲ": item["Thời gian thi\r\nLT GIỮA KỲ"],
          "Hình thức thi LT CUỐI KỲ": item["Hình thức thi\r\nLT CUỐI KỲ"],
          "Thời gian thi CUỐI KỲ": item["Thời gian thi\r\nCUỐI KỲ"],
          "Hình thức thi THỰC HÀNH CUỐI KỲ":
            item["Hình thức thi THỰC HÀNH CUỐI KỲ"],
          "Trọng số QUÁ TRÌNH": item["Trọng số\r\nQUÁ TRÌNH"],
          "Trọng số THỰC HÀNH": item["Trọng số\r\nTHỰC HÀNH"],
          "Trọng số GIỮA KỲ": item["Trọng số\r\nGIỮA KỲ"],
          "Trọng số CUỐI KỲ": item["Trọng số\r\nCUỐI KỲ"],
          "Hệ ĐT": item["Hệ ĐT"],
          "Lớp CDIO": item["Lớp\r\nCDIO"],
          "Học kỳ": item["Học kỳ"],
          "Năm học": item[" Năm học"],
          "Tên môn học": item["Tên Môn học"],
        },
      }));

      setDataTable(transformedData as []);
    };
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleCoursesFileUpload}
      />

      <div className="flex justify-end gap-4 mb-5 items-center">
        <p>Để scroll ngang, nhấn nút Shift và cuộn chuột</p>
        <PureButton
          text="Chỉnh sửa"
          onClick={() => {
            setIsEditTable(true);
          }}
        />
        <PureButton
          text="Lưu"
          onClick={() => {
            setIsEditTable(false);

            // API post data lên server
          }}
        />
      </div>

      {/* {JSON.stringify(dataTable)} */}

      <DataTable dataTable={dataTable} isEditTable={isEditTable} />
    </div>
  );
}
