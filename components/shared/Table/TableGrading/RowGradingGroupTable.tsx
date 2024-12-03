import {
  CourseData,
  GradingExerciseDataItem,
  GradingReportDataItem,
  StudentData,
  SubjectData,
  TeacherData,
} from "@/types";
import { Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "../../Button/IconButton";
import InputComponent from "../components/InputComponent";
import MoreButtonComponent from "../components/MoreButtonComponent";

interface RowParams {
  isMemberOfAboveGroup: boolean;
  dataItem: GradingExerciseDataItem | GradingReportDataItem;
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

const RowGradingGroupTable = React.memo(
  (params: RowParams) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editDataItem, setEditDataItem] = useState(params.dataItem);

    const [isChecked, setIsChecked] = useState(
      //@ts-ignore
      params.dataItem.data["Điểm danh"] as boolean
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
      const updatedDataItem: GradingExerciseDataItem | GradingReportDataItem = {
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

    var valueUniqueInput = params.dataItem.data["Mã nhóm"];

    const renderTableCellValue = (
      keyId: string,
      key: string,
      value: any,
      isEdit: boolean
    ) => {
      if (
        (key === "Điểm" || key === "Góp ý") &&
        (isEdit || params.isEditTable)
      ) {
        return (
          <InputComponent
            key={`${keyId}_input_${key}_${value}`}
            value={value as string | number}
            placeholder={value as string | number}
            //@ts-ignore
            onChange={(newValue) =>
              //@ts-ignore
              handleInputChange({ key: key, newValue: newValue })
            }
          />
        );
      } else if (key === "Hình thức") {
        return value ? "Nhóm" : "Cá nhân";
      } else if (key === "Trễ hạn" && value === "0") {
        return "Không";
      } else if (key === "Điểm danh") {
        return (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)} // Cập nhật state khi có thay đổi
            className="w-4 h-4 cursor-pointer"
          />
        );
      } else {
        return value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => { }}
        className={`bg-background-secondary  text-left ${isEdit || params.isEditTable
          ? "hover:bg-white cursor-default"
          : "hover:bg-light-800 cursor-default"
          } duration-100`}
      >
        {/* checkbox */}
        <Table.Cell className="w-10 border-r-[1px] z-100 ">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.RowGradingGroupTable
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

        {/* STT - Là STT của nhóm */}
        {params.isMemberOfAboveGroup ? (
          <Table.Cell className="w-10 border-r-[1px]  text-left"></Table.Cell>
        ) : (
          <Table.Cell className="w-10 border-r-[1px]  text-left">
            <span>{params.dataItem.data["Mã nhóm"]}</span>
          </Table.Cell>
        )}

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId = params.dataItem.data["Mã nhóm"];

          if (key === "Mã nhóm") return null;
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
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left 
              ${key === "Bài nộp" ? "underline cursor-pointer" : ""}
              ${key === "Trễ hạn" && value !== "0" ? "text-red-500" : ""}
              ${key === "Điểm danh" ? "text-center" : ""}
            `}
            >
              {renderTableCellValue(keyId, key, value, isEdit)}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowGradingGroupTable không thay đổi thì không cần re-render
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable &&
      prevProps.isMultipleDelete === nextProps.isMultipleDelete
    );
  }
);

export default RowGradingGroupTable;
