import { Table } from "flowbite-react";
import React from "react";
import InputComponent from "./InputComponent";
import { useState } from "react";
import MoreButtonComponent from "./MoreButtonComponent";
import { CourseDataItem, SubjectDataItem } from "@/types";

interface RowParams {
  dataItem: CourseDataItem | SubjectDataItem;
  isEditTable?: boolean;
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
          : "hover:bg-light-800 cursor-pointer"
      } duration-100`}
    >
      <Table.Cell className="w-10 border-r-[1px] z-100 ">
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
          }}
        >
          <MoreButtonComponent handleEdit={handleEdit} />
        </div>
      </Table.Cell>

      <Table.Cell className="w-10 border-r-[1px]  text-left">
        {params.dataItem.STT}
      </Table.Cell>

      {Object.entries(params.dataItem.data).map(([key, value]) => {
        let keyId;
        let data;
        switch (params.dataItem.type) {
          case "courses":
            data = params.dataItem as CourseDataItem;
            keyId = data.data["Mã lớp"];
            break;
          case "subjects":
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
            className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap  text-left"
          >
            {key === "Khoa quản lý" ? (
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={() => {}}
                className="w-4 h-4"
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
