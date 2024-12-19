import {
  GradingExerciseData,
  GradingExerciseDataItem,
  GradingReportData,
  GradingReportDataItem,
} from "@/types";
import { Table } from "flowbite-react";
import React, { useRef, useState } from "react";
import InputComponent from "../components/InputComponent";

interface RowParams {
  dataItem: GradingExerciseDataItem | GradingReportDataItem;
  isEditTable?: boolean;
  onChangeRow?: (item: any) => void;
}
interface handleInputChangeParams {
  key: keyof GradingExerciseData | keyof GradingReportData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
}

const RowGradingGroupTable = React.memo(
  (params: RowParams) => {
    const [isChecked, setIsChecked] = useState(
      //@ts-ignore
      params.dataItem.data["Điểm danh"] as boolean
    );

    const refInput = useRef(params.dataItem);

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem: GradingExerciseDataItem | GradingReportDataItem = {
        ...refInput.current,
        data: {
          ...refInput.current.data,
          [key]: isMultipleInput
            ? (refInput.current.data[key] as string[]).map((value, index) =>
                index === currentIndex ? newValue : value
              )
            : newValue,
        },
      };

      refInput.current = updatedDataItem; //? ĐỂ UPATE ĐƯỢC NHIỀU FIELD TRÊN 1 HÀNG

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };


    const renderTableCellValue = (keyId: string, key: string, value: any) => {
      if ((key === "Điểm" || key === "Góp ý") && params.isEditTable) {
        if (key === "Góp ý")
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
              isDescription
              isInTable
            />
          );
        return Array.isArray(value) ? (
          <div className="flex flex-col gap-1">
            {value.map((item, index) => (
              <InputComponent
                key={`${keyId}_${item}_${index}`}
                value={item}
                placeholder={item as string | number}
                onChange={(newValue) => {
                  handleInputChange({
                    key,
                    newValue,
                    isMultipleInput: true,
                    currentIndex: index,
                  });
                }}
              />
            ))}
          </div>
        ) : (
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
        return Array.isArray(value)
          ? value.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index < value.length - 1 && <br />}
              </React.Fragment>
            ))
          : value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary  text-left ${
          params.isEditTable
            ? "hover:bg-white cursor-default"
            : "hover:bg-light-800 cursor-default"
        } duration-100`}
      >
        {/* STT - Là STT của nhóm */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.data["Mã nhóm"]}</span>
        </Table.Cell>

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
              ${key === "Điểm danh" || key === "Điểm" || key === 'MSSV' ? "text-center" : ""}
            `}
            >
              {renderTableCellValue(keyId, key, value)}
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
      prevProps.isEditTable === nextProps.isEditTable
    );
  }
);

export default RowGradingGroupTable;
