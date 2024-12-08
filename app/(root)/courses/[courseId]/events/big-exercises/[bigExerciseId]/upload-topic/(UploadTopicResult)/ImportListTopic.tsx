"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import ErrorComponent from "@/components/shared/Status/ErrorComponent";
import NoResult from "@/components/shared/Status/NoResult";
import TableSkeleton from "@/components/shared/Table/components/TableSkeleton";
import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";

import { TopicDataItem } from "@/types";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";

interface Props {
  handleSetImport: (value: boolean) => void;
}

const ImportListTopic = (params: Props) => {
  const [dataTable, setDataTable] = useState<TopicDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleTopicsFileUpload = (e: any) => {
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
          "Tên đề tài": item["Tên đề tài"],
          "Mô tả": item["Mô tả"],
          "GV phụ trách": item["GV phụ trách"],
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
          type: "topic",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Tên đề tài": item["Tên đề tài"],
            "Mô tả": item["Mô tả"],
            "GV phụ trách": item["GV phụ trách"],
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

  return (
    <>
      <BackToPrev
        text={"Quay lại danh sách đề tài"}
        onClickPrev={() => {
          params.handleSetImport(false);
        }}
      />
      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              key={`${item}_${index}`}
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

      <div className="mb-6">
        <div className="flex mb-2">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleTopicsFileUpload}
              style={{ display: "none" }}
            />

            <IconButton
              text="Import danh sách đề tài"
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
          href="/assets/KTLN - template import ds đề tài.xlsx"
          download
          className=" text-blue-500 underline text-base italic"
        >
          Tải xuống template file import danh sách đề tài
        </a>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <TopicGroupTable
          isEditTable={false}
          isMultipleDelete={false}
          dataTable={dataTable}
        />
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
          linkTitle="Import danh sách đề tài"
          handleFileUpload={handleTopicsFileUpload}
        />
      )}
    </>
  );
};

export default ImportListTopic;
