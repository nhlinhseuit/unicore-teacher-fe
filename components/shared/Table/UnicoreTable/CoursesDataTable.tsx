"use client";

import PureButton from "../../PureButton";
import { useState } from "react";
import * as XLSX from "xlsx";
import { CourseDataItem } from "@/types";
import DataTable from "./DataTable";
import ErrorComponent from "../Status/ErrorComponent";

export default function CoursesDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState<CourseDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    setErrorMessages([]);
    setDataTable([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 2 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 2, // Chỉ số 2 đại diện cho hàng 3 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Mã môn học": item["MÃ MH"],
          "Mã lớp": item["MÃ LỚP"],
          "Tên môn học": item["TÊN MÔN HỌC"],
          "Mã GV": item["MÃ GIẢNG VIÊN"],
          "Tên GV": item["TÊN GIẢNG VIÊN"],
          "Số TC": item["TỐ TC"],
          HTGD: item["HTGD"],
          "Ngày BĐ": item["NBD"],
          "Ngày KT": item["NKT"],
          "Học kỳ": item["HỌC KỲ"],
          "Năm học": item["NĂM HỌC"],
        };

        // Lặp qua các trường để kiểm tra nếu có giá trị undefined
        if (index === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);
            }
          });
        }

        return {
          type: "course",
          STT: item.STT,
          data: {
            "Mã môn học": item["MÃ MH"],
            "Mã lớp": item["MÃ LỚP"],
            "Tên môn học": item["TÊN MÔN HỌC"],
            "Mã GV": item["MÃ GIẢNG VIÊN"],
            "Tên GV": item["TÊN GIẢNG VIÊN"],
            "Sĩ số": "Chưa cập nhật",
            "Số TC": item["TỐ TC"],
            HTGD: item["HTGD"],
            "Khoa quản lý": item["TÊN GIẢNG VIÊN"] ? false : true,
            "Ngày BĐ": item["NBD"],
            "Ngày KT": item["NKT"],
            "Học kỳ": item["HỌC KỲ"],
            "Năm học": item["NĂM HỌC"],
          },
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTable(transformedData as []);
      }
    };
  };

  return (
    <div>
      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              text={item}
              onClickClose={() => {
                setErrorMessages((prevErrors) =>
                  prevErrors.filter((_, i) => i !== index)
                );
              }}
            />
          ))}
        </div>
      )}

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleCoursesFileUpload}
      />

      <a
        href="/assets/KLTN - template import ds lớp.xlsx"
        download
        className="text-blue-500 underline"
      >
        Tải xuống template file import lớp học
      </a>

      {dataTable.length > 0 && (
        <>
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

          <DataTable dataTable={dataTable} isEditTable={isEditTable} />
        </>
      )}
    </div>
  );
}
