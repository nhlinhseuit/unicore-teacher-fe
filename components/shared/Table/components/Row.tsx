import { Dropdown, Table } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import InputComponent from "./InputComponent";
import { useState } from "react";
import MoreButtonComponent from "./MoreButtonComponent";
import {
  CourseData,
  SubjectData,
  CourseDataItem,
  SubjectDataItem,
  StudentDataItem,
  StudentData,
  TeacherData,
  TeacherDataItem,
} from "@/types";
import IconButton from "../../Button/IconButton";
import Image from "next/image";

interface RowParams {
  dataItem:
    | CourseDataItem
    | SubjectDataItem
    | StudentDataItem
    | TeacherDataItem;
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  isHasSubCourses?: boolean;
  onClickGetOut?: () => void;
  saveSingleRow?: (item: any) => void;
  deleteSingleRow?: (itemsSelected: string[]) => void;
  onClickCheckBoxSelect?: (item: string) => void;
  onChangeRow?: (item: any) => void;
}
interface handleInputChangeParams {
  key:
    | keyof CourseData
    | keyof SubjectData
    | keyof StudentData
    | keyof TeacherData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const Row = React.memo(
  (params: RowParams) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editDataItem, setEditDataItem] = useState(params.dataItem);
    const [isChecked, setIsChecked] = useState(
      //@ts-ignore
      params.dataItem.data["Khoa quản lý"] as boolean
    );

    const refInput = useRef({});

    useEffect(() => {
      if (params.isEditTable) setIsEdit(false);
    }, [[params.isEditTable]]);

    const handleEdit = () => {
      if (isEdit === false) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    };

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
      isCheckbox,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem:
        | CourseDataItem
        | SubjectDataItem
        | StudentDataItem
        | TeacherDataItem = {
        ...editDataItem,
        data: {
          ...editDataItem.data,
          [key]: isMultipleInput
            ? //@ts-ignore
              (editDataItem.data[key] as string)
                .split(/\r\n|\n/)
                .map((line, index) =>
                  index === currentIndex ? newValue : line
                )
                .join("\r\n")
            : newValue,
        },
      };

      // TODO: inputref for save single row
      if (isEdit) {
        refInput.current = updatedDataItem;
        return;
      }

      // setEditDataItem(updatedDataItem); // ??

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    var valueUniqueInput = "";
    switch (params.dataItem.type) {
      case "course":
        valueUniqueInput = (params.dataItem as CourseDataItem).data["Mã lớp"];
        break;
      case "subject":
        valueUniqueInput = (params.dataItem as SubjectDataItem).data["Mã MH"];
        break;
      case "student":
        valueUniqueInput = (params.dataItem as StudentDataItem).data["MSSV"];
        break;
      case "teacher":
        valueUniqueInput = (params.dataItem as TeacherDataItem).data[
          "Mã cán bộ"
        ];
        break;
    }

    const renderTableCell = ({
      key,
      value,
      keyId,
      isEdit,
      isChecked,
      setIsChecked,
      handleInputChange,
      isHasSubCourses,
    }: {
      key: string;
      value: string | number;
      keyId: string;
      isEdit: boolean;
      isChecked: boolean;
      setIsChecked: (checked: boolean) => void;
      handleInputChange: Function;
      isHasSubCourses: boolean | undefined;
    }) => {
      switch (key) {
        case "Mã lớp":
          return isHasSubCourses ? (
            <div className="flex">
              <span>{value}</span>
              <Dropdown
                className="z-30 rounded-lg"
                label=""
                renderTrigger={() => (
                  <Image
                    src="/assets/icons/info.svg"
                    alt="search"
                    width={21}
                    height={21}
                    className="ml-2 mr-4 cursor-pointer"
                  />
                )}
              >
                <div className="scroll-container scroll-container-dropdown-content">
                  <ul>
                    <li role="menuitem">
                      <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                        Đồ án 1 - Huỳnh Hồ Thị Mộng Trinh
                      </p>
                    </li>
                    <li role="menuitem">
                      <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                        Đồ án 1 - Nguyễn Trịnh Đông
                      </p>
                    </li>
                    <li role="menuitem">
                      <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                        Đồ án 1 - Huỳnh Tuấn Anh
                      </p>
                    </li>
                  </ul>
                </div>
              </Dropdown>
            </div>
          ) : (
            <span>{value}</span>
          );

        case "Khoa quản lý":
          return isEdit || params.isEditTable ? (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                handleInputChange({
                  key,
                  newValue: e.target.checked,
                  isCheckbox: true,
                });
              }}
              className="w-4 h-4 cursor-pointer"
            />
          ) : (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              className="w-4 h-4 cursor-pointer"
            />
          );

        case "student":
        case "subject":
        case "course":
          return isEdit || params.isEditTable ? (
            typeof value === "string" ? (
              <div className="flex flex-col gap-1">
                {value
                  .split(/\r\n|\n/)
                  .filter((line, index, array) =>
                    array.length > 1 ? line.trim() !== "" : true
                  )
                  .map((line, index) => (
                    <InputComponent
                      key={`${keyId}_${line}_${index}`}
                      value={line as string | number}
                      placeholder={line as string | number}
                      onChange={(newValue) =>
                        handleInputChange({
                          key,
                          newValue,
                          isMultipleInput: true,
                          currentIndex: index,
                        })
                      }
                    />
                  ))}
              </div>
            ) : (
              <InputComponent
                key={`${keyId}_input_${key}_${value}`}
                value={value as string | number}
                placeholder={value as string | number}
                onChange={(newValue) => handleInputChange({ key, newValue })}
              />
            )
          ) : typeof value === "string" ? (
            value.split(/\r\n|\n/).map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < value.split(/\r\n|\n/).length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            value
          );

        default:
          return value;
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
        {/* checkbox */}
        <Table.Cell className="w-10 border-r-[1px] z-100 ">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
            }}
          >
            {params.isMultipleDelete ? (
              <div className="flex items-center justify-center w-10 h-10">
                <input
                  id="apple"
                  type="checkbox"
                  name="filterOptions"
                  value={valueUniqueInput}
                  onChange={() => {
                    {
                      params.onClickCheckBoxSelect &&
                        params.onClickCheckBoxSelect(valueUniqueInput);
                    }
                  }}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
                />
              </div>
            ) : isEdit ? (
              <IconButton
                text="Lưu"
                onClick={() => {
                  params.saveSingleRow &&
                    params.saveSingleRow(refInput.current);
                  setIsEdit(false);
                }}
              />
            ) : (
              <MoreButtonComponent
                handleEdit={handleEdit}
                onClickGetOut={params.onClickGetOut}
                onClickDelete={() => {
                  params.deleteSingleRow &&
                    params.deleteSingleRow([valueUniqueInput]);
                }}
              />
            )}
          </div>
        </Table.Cell>

        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId: any;
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
            case "student":
              data = params.dataItem as StudentDataItem;
              keyId = data.data["MSSV"];

              break;
            case "student":
              data = params.dataItem as TeacherDataItem;
              keyId = data.data["Mã cán bộ"];

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
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left ${
                key === "Khoa quản lý" ? "text-center" : ""
              }`}
            >
              {renderTableCell({
                key,
                value,
                keyId,
                isEdit,
                isChecked,
                setIsChecked,
                handleInputChange,
                isHasSubCourses: params.isHasSubCourses,
              })}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của Row không thay đổi thì không cần re-render
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable &&
      prevProps.isMultipleDelete === nextProps.isMultipleDelete
    );
  }
);

export default Row;
