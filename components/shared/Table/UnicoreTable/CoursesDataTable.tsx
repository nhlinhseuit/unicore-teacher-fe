"use client";

import PureButton from "../../PureButton";
import { useState } from "react";
import * as XLSX from "xlsx";
import { CourseDataItem } from "@/types";
import DataTable from "./DataTable";

// const mockCoursesData = [
//   {
//     id: 1,
//     data: {
//       subjectId: "SE100",
//       courseId: "SE100.O12.PMCL",
//       subjectName: "Phương pháp Phát triển phần mềm hướng đối tượng",
//       teacherId: "80123",
//       teacherName: "Huỳnh Hồ Thị Mộng Trinh",
//       numberOfStudents: 40,
//       numberOfCredits: 3,
//       typeOfTeaching: "LT",
//       isManagedByDepartment: false,
//       startDate: "20-12-2024",
//       endDate: "20-5-2025",
//       semester: 2,
//       year: 2024,
//     },
//   },
//   {
//     id: 2,
//     data: {
//       subjectId: "SE100",
//       courseId: "SE100.O12.PMCL.1",
//       subjectName: "Phương pháp Phát triển phần mềm hướng đối tượng",
//       teacherId: "80129",
//       teacherName: "Lê Thành Lộc",
//       numberOfStudents: 40,
//       numberOfCredits: 1,
//       typeOfTeaching: "TH",
//       isManagedByDepartment: false,
//       startDate: "20-12-2024",
//       endDate: "20-5-2025",
//       semester: 2,
//       year: 2024,
//     },
//   },
//   {
//     id: 3,
//     data: {
//       subjectId: "SE201",
//       courseId: "SE201.O12.PMCL",
//       subjectName: "Đồ án 1",
//       teacherId: "80129",
//       teacherName: "Nguyễn Hoàng Linh",
//       numberOfStudents: 40,
//       numberOfCredits: 1,
//       typeOfTeaching: "TH",
//       isManagedByDepartment: true,
//       startDate: "20-12-2024",
//       endDate: "20-5-2025",
//       semester: 2,
//       year: 2024,
//     },
//   },
// ];

// const fieldMapping: { [key: string]: string } = {
//   subjectId: "Mã môn học",
//   courseId: "Mã lớp",
//   subjectName: "Tên môn học",
//   teacherId: "Mã GV",
//   teacherName: "Tên GV",
//   numberOfStudents: "Sĩ số",
//   numberOfCredits: "Số TC",
//   typeOfTeaching: "HTGD",
//   isManagedByDepartment: "Khoa quản lý",
//   startDate: "Ngày BĐ",
//   endDate: "Ngày KT",
//   semester: "Học kỳ",
//   year: "Năm học",
// };

export default function CoursesDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState<CourseDataItem[]>([]);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // const parsedData = XLSX.utils.sheet_to_json(sheet);
      // Bỏ 2 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 2, // Chỉ số 2 đại diện cho hàng 3 (vì index bắt đầu từ 0)
      });

      const transformedData = parsedData.map((item: any) => ({
        type: 'course',
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

      <DataTable dataTable={dataTable} isEditTable={isEditTable} />
    </div>
  );
}
