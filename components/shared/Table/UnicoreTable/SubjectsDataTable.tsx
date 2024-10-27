"use client";

import IconButton from "../../IconButton";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { SubjectDataItem } from "@/types";
import DataTable from "./components/DataTable";
import ErrorComponent from "../Status/ErrorComponent";
import TableSkeleton from "./components/TableSkeleton";
import { useToast } from "@/hooks/use-toast";
import NoResult from "../../NoResult";
import { DataTableType } from "@/constants";

export default function SubjectsDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<SubjectDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE MÔN HỌC
  const handleSubjectsFileUpload = (e: any) => {
    setIsLoading(true);
    setErrorMessages([]);
    setDataTable([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 5 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 5, // Chỉ số 5 đại diện cho hàng 6 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Khoa QL": item["Khoa QL"],
          "Mã MH": item["Mã MH"],
          "Hình thức thi LT GIỮA KỲ": item["Hình thức thi\r\nLT GIỮA KỲ"],
          "Thời gian thi LT GIỮA KỲ": item["Thời gian thi\r\nLT GIỮA KỲ"],
          "Hình thức thi LT CUỐI KỲ": item["Hình thức thi\r\nLT CUỐI KỲ"],
          "Thời gian thi CUỐI KỲ": item["Thời gian thi\r\nCUỐI KỲ"],
          "Hình thức thi THỰC HÀNH CUỐI KỲ":
            item["Hình thức thi \r\nTHỰC HÀNH CUỐI KỲ"],
          "Trọng số QUÁ TRÌNH": item["Trọng số\r\nQUÁ TRÌNH"],
          "Trọng số THỰC HÀNH": item["Trọng số\r\nTHỰC HÀNH"],
          "Trọng số GIỮA KỲ": item["Trọng số\r\nGIỮA KỲ"],
          "Trọng số CUỐI KỲ": item["Trọng số\r\nCUỐI KỲ"],
          "Hệ ĐT": item["Hệ ĐT"],
          "Lớp CDIO": item["Lớp\r\nCDIO"],
          "Học kỳ": item["Học kỳ"],
          "Năm học": item[" Năm học"],
          "Tên môn học": item["Tên Môn học"],
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
          type: "subject",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Khoa QL": item["Khoa QL"],
            "Mã MH": item["Mã MH"],
            "Tên môn học": item["Tên Môn học"],
            "Hình thức thi LT GIỮA KỲ": item["Hình thức thi\r\nLT GIỮA KỲ"],
            "Thời gian thi LT GIỮA KỲ": item["Thời gian thi\r\nLT GIỮA KỲ"],
            "Hình thức thi LT CUỐI KỲ": item["Hình thức thi\r\nLT CUỐI KỲ"],
            "Thời gian thi CUỐI KỲ": item["Thời gian thi\r\nCUỐI KỲ"],
            "Hình thức thi THỰC HÀNH CUỐI KỲ":
              item["Hình thức thi \r\nTHỰC HÀNH CUỐI KỲ"],
            "Trọng số QUÁ TRÌNH": item["Trọng số\r\nQUÁ TRÌNH"],
            "Trọng số THỰC HÀNH": item["Trọng số\r\nTHỰC HÀNH"],
            "Trọng số GIỮA KỲ": item["Trọng số\r\nGIỮA KỲ"],
            "Trọng số CUỐI KỲ": item["Trọng số\r\nCUỐI KỲ"],
            "Hệ ĐT": item["Hệ ĐT"],
            "Lớp CDIO": item["Lớp\r\nCDIO"],
            "Học kỳ": item["Học kỳ"],
            "Năm học": item[" Năm học"],
          },
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTable(transformedData as []);
      }

      setIsLoading(false);
    };
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { toast } = useToast();

  return (
    <div>
      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              key={item}
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

      <div className="flex mb-2">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleSubjectsFileUpload}
            style={{ display: "none" }}
          />

          <IconButton
            text="Import danh sách môn"
            onClick={handleButtonClick}
            iconLeft={"/assets/icons/upload-white.svg"}
            iconWidth={16}
            iconHeight={16}
          />
        </div>
        {dataTable.length > 0 && (
          <IconButton text="Lưu" onClick={() => {}} otherClasses="ml-2" />
        )}
      </div>

      <a
        href="/assets/KLTN - template import môn.xlsx"
        download
        className="text-blue-500 underline text-base italic"
      >
        Tải xuống template file import môn học
      </a>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <>
          <div className="flex justify-end gap-4 mb-5 items-center">
            <p className="italic text-sm">
              * Để scroll ngang, nhấn nút Shift và cuộn chuột
            </p>
          </div>

          <DataTable
            type={DataTableType.Subject}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as SubjectDataItem[];
              setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? MÔN CÓ MÃ MH UNIQUE VÌ CHỈ 1 HỆ ĐÀO TẠO
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["Mã MH"])) {
                    return {
                      ...item,
                      isDeleted: true,
                    };
                  }
                  return item;
                });
              });

              toast({
                title: "Xóa thành công",
                description: `${`Các môn ${itemsSelected.join(
                  ", "
                )} đã được xóa.`}`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickGetOut={() => {
              setIsMultipleDelete(false);
            }}
          />
        </>
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
          linkTitle="Import danh sách môn"
          handleFileUpload={handleSubjectsFileUpload}
        />
      )}
    </div>
  );
}
