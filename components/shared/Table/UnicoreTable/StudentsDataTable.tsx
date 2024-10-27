"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { StudentDataItem } from "@/types";
import DataTable from "./components/DataTable";
import ErrorComponent from "../Status/ErrorComponent";
import TableSkeleton from "./components/TableSkeleton";
import NoResult from "../../NoResult";
import { useToast } from "@/hooks/use-toast";
import IconButton from "../../IconButton";
import { DataTableType } from "@/constants";

export default function StudentsDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<StudentDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE DS SINH VIÊN
  const handleStudentFileUpload = (e: any) => {
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
      // Bỏ 1 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1, // Chỉ số 1 đại diện cho hàng 2 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          MSSV: item["MSSV"],
          "Họ và tên": item["Họ và tên SV"],
          SDT: item["Điện thoại"],
          Email: item["Email"],
          "Lớp sinh hoạt": item["Lớp sinh hoạt"],
          "Giới tính": item["Giới tính"],
          "Địa chỉ": item["Địa chỉ"],
          "Ngày sinh": item["Ngày sinh"],
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
          type: "student",
          STT: item.STT,
          isDeleted: false,
          data: {
            MSSV: item["MSSV"],
            "Tài khoản": item["MSSV"],
            "Mật khẩu": "1",
            "Họ và tên": item["Họ và tên SV"],
            "Lớp sinh hoạt": item["Lớp sinh hoạt"],
            Email: item["Email"],
            SDT: item["Điện thoại"],
            "Giới tính": item["Giới tính"],
            "Địa chỉ": item["Địa chỉ"],
            "Ngày sinh": item["Ngày sinh"],
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
            onChange={handleStudentFileUpload}
            style={{ display: "none" }}
          />

          <IconButton
            text="Import danh sách sinh viên"
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
        href="/assets/KTLN - template import ds sinh viên.xlsx"
        download
        className="text-blue-500 underline text-base italic"
      >
        Tải xuống template file import sinh viên
      </a>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <>
          <div className="flex justify-end gap-4 mb-3 items-center">
            <p className="italic text-sm">
              * Để scroll ngang, nhấn nút Shift và cuộn chuột
            </p>
          </div>

          <DataTable
            type={DataTableType.Student}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as StudentDataItem[];
              setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDelete={(itemsSelected: string[]) => {
              console.log("itemsSelected onClickDelete", itemsSelected);

              // ? DELETE THEO MSSV
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["MSSV"])) {
                    console.log("item.data", item.data);
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
                description: `${`Các sinh viên ${itemsSelected.join(
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
          linkTitle="Import danh sách sinh viên"
          handleFileUpload={handleStudentFileUpload}
        />
      )}
    </div>
  );
}
