import { Table } from "flowbite-react";
import React, { useState } from "react";
import { FileDataItem } from "@/types";
import MoreButtonComponent from "../components/MoreButtonComponent";
import { FileTableDataMoreComponentItems } from "@/constants";
import Image from "next/image";

interface RowParams {
  dataItem: FileDataItem;
  onClickDelete?: () => void;
}
interface handleInputChangeParams {
  key: FileDataItem;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowTopicDataTable = (params: RowParams) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    if (isEdit === false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const getFileIcon = (nameFile: string) => {
    if (nameFile === undefined) return;

    const extension = nameFile.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "doc":
      case "docx":
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file-word.svg"
              alt="Word file"
              width={24}
              height={24}
            />
          </div>
        );
      case "pdf":
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file-pdf.svg"
              alt="PDF file"
              width={24}
              height={24}
            />
          </div>
        );
      case "xls":
      case "xlsx":
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file-excel.svg"
              alt="Excel file"
              width={24}
              height={24}
            />
          </div>
        );
      case "zip":
      case "rar":
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file-zip.svg"
              alt="Zip file"
              width={24}
              height={24}
            />
          </div>
        );
      case "ppt":
      case "pptx":
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file-pptx.svg"
              alt="PowerPoint file"
              width={24}
              height={24}
            />
          </div>
        );
      default:
        return (
          <div className="flex-center">
            <Image
              src="/assets/icons/file.svg"
              alt="Unknown file type"
              width={24}
              height={24}
            />
          </div>
        );
    }
  };

  return (
    <Table.Row
      key={params.dataItem.STT}
      onClick={() => {}}
      className={`bg-background-secondary  text-leftduration-100`}
    >
      <Table.Cell className="w-10 border-r-[1px] z-100 ">
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
          }}
        >
          <MoreButtonComponent
            actions={FileTableDataMoreComponentItems}
            handleEdit={handleEdit}
            onClickGetOut={() => {
              // params.onClickGetOut
            }}
            onClickDelete={(id: any) => {

              // params.onClickDelete && params.onClickDelete(id)
              
              // params.deleteSingleRow &&
              //   params.deleteSingleRow([valueUniqueInput]);
            }}
          />
        </div>
      </Table.Cell>

      {/* STT */}
      <Table.Cell className="w-10 border-r-[1px]  text-left">
        <span>{params.dataItem.STT}</span>
      </Table.Cell>

      {/* FILE ICON */}
      <Table.Cell className=" border-r-[1px] uppercase !py-0 !my-0">
        <div className="flex-center">
          {getFileIcon(params.dataItem.data["Tên file"])}
        </div>
      </Table.Cell>

      {/* Các giá trị khác */}
      {Object.entries(params.dataItem.data).map(([key, value]) => {
        return (
          <Table.Cell
            key={`${key}_${value}`}
            theme={{
              base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
            }}
            className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
          >
            {value}
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default RowTopicDataTable;
