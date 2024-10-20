import { Table } from "flowbite-react";
import React from "react";
import InputComponent from "./InputComponent";
import { useState } from "react";
import MoreButtonComponent from "./MoreButtonComponent";
import { CourseDataItem, SubjectDataItem } from "@/types";

interface RowParams {
  dataItem: CourseDataItem | SubjectDataItem;
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  onClickCheckBox?: (item: string) => void;
}

const Row = (params: RowParams) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    if (isEdit === false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <Table.Row
      key={params.dataItem.STT}
      onClick={() => {}}
      className={`bg-background-secondary  text-left ${
        isEdit || params.isEditTable
          ? "hover:bg-white cursor-default"
          : "hover:bg-light-800 cursor-default"
      } duration-100`}
    >
      <Table.Cell className="w-10 border-r-[1px] z-100 ">
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
          }}
        >
          {params.isMultipleDelete ? (
            <div className="w-10 h-10 flex justify-center items-center">
              <input
                id="apple"
                type="checkbox"
                name="filterOptions"
                value={
                  params.dataItem.type === "course"
                    ? (params.dataItem as CourseDataItem).data["Mã lớp"]
                    : (params.dataItem as SubjectDataItem).data["Mã MH"]
                }
                onChange={() => {
                  {
                    params.onClickCheckBox &&
                      params.onClickCheckBox(
                        params.dataItem.type === "course"
                          ? (params.dataItem as CourseDataItem).data["Mã lớp"]
                          : (params.dataItem as SubjectDataItem).data["Mã MH"]
                      );
                  }
                }}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 cursor-pointer"
              />
            </div>
          ) : (
            <MoreButtonComponent handleEdit={handleEdit} />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="w-10 border-r-[1px]  text-left">
        {params.dataItem.STT}
      </Table.Cell>

      {Object.entries(params.dataItem.data).map(([key, value]) => {
        let keyId;
        let data;
        switch (params.dataItem.type) {
          case "course":
            data = params.dataItem as CourseDataItem;
            keyId = data.data["Mã lớp"];
            break;
          case "subject":
            data = params.dataItem as SubjectDataItem;
            keyId = data.data["Mã MH"];
            break;
        }

        return (
          <Table.Cell
            key={`${keyId}_${key}_${value}`}
            theme={{
              base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
            }}
            className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left ${key === "Khoa quản lý" ? 'text-center': ''}`}
          >
            {key === "Khoa quản lý" ? (
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={() => {}}
                className="w-4 h-4 "
              />
            ) : isEdit || params.isEditTable ? (
              <InputComponent
                value={value as string | number}
                placeholder={value as string | number}
              />
            ) : typeof value === "string" ? (
              // Thay thế ký tự xuống dòng bằng thẻ <br />
              value.split(/\r\n|\n/).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < value.split(/\r\n|\n/).length - 1 && <br />}{" "}
                  {/* Thêm <br /> giữa các dòng */}
                </React.Fragment>
              ))
            ) : (
              value
            )}
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default Row;
