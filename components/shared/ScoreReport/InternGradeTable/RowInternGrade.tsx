import { InternReviewData, InternReviewDataItem } from "@/types";
import { Table } from "flowbite-react";
import React, { useRef } from "react";
import InputComponent from "../../Table/components/InputComponent";

interface RowParams {
  valueUniqueInput: string;
  dataItem: InternReviewDataItem;
  isEditTable?: boolean;
  isHasSubCourses?: boolean;
  onChangeRow?: (item: any) => void;
}
interface handleInputChangeParams {
  key: keyof InternReviewData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowInternGrade = React.memo(
  (params: RowParams) => {
    const refInput = useRef(params.dataItem);

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
      isCheckbox,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem: InternReviewDataItem = {
        ...refInput.current,
        data: {
          ...refInput.current.data,
          [key]: newValue,
        },
      };

      refInput.current = updatedDataItem; //? ĐỂ UPATE ĐƯỢC NHIỀU FIELD TRÊN 1 HÀNG

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    const renderCellStyle = (
      key: string,
      value: string | number | Array<string | number>
    ) => {
      let style = "";

      // !: NOTE: Giới hạn ô mô tả không quá dài bằng !w-[800px] line-clamp-6
      if (key === "Mô tả") {
        style += "!w-[800px] line-clamp-6 flex items-center";
      } else if (
        key === "STT" ||
        key === "Phản biện" ||
        key === "Hướng dẫn" ||
        key === "Chủ tịch" ||
        key === "Điểm tổng" ||
        key === "Thư ký" ||
        key === "Ủy viên"
      ) {
        style += "text-center";
      } else {
        style += "whitespace-nowrap";
      }

      return style;
    };

    const renderCellValue = ({
      key,
      value,
      keyId,
      params,
    }: {
      key: string;
      value: string | number | Array<string | number>;
      keyId: string | number;
      params: any;
    }) => {
      switch (key) {
        case "Chủ tịch":
        case "Thư ký":
        case "Ủy viên":
          return params.isEditTable ? (
            <InputComponent
              key={`${keyId}_input_${value}`}
              value={value as string | number}
              placeholder={value as string | number}
              onChange={(newValue) => {
                handleInputChange({ key, newValue });
              }}
              otherClassess="w-[100px]"
            />
          ) : typeof value === "string" && value.trim() === "" ? (
            <p className="text-red-600 text-center">Trống</p>
          ) : (
            value
          );

        case "Điểm tổng":
          return typeof value === "string" && value.trim() === "" ? (
            <p className="text-red-600 text-center">Trống</p>
          ) : (
            value
          );

        default:
          return value;
      }
    };

    const renderCell = ({
      key,
      value,
      keyId,
      params,
    }: {
      key: string;
      value: string | number | Array<string | number>;
      keyId: string | number;
      params: any;
    }) => {
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
          className={`border-r-[1px] px-2 py-4 normal-case text-left min-h-[64px] 
            
            ${renderCellStyle(key, value)}`}
        >
          {renderCellValue({ key, value, keyId, params })}
        </Table.Cell>
      );
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

        <Table.Cell
          className={`w-10 border-r-[1px] text-center  ${
            !params.dataItem.data["Điểm tổng"] ||
            (typeof params.dataItem.data["Điểm tổng"] === "string" &&
              params.dataItem.data["Điểm tổng"].trim() === "")
              ? "text-red-600 "
              : ""
          } `}
        >
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          const keyId = params.dataItem.data.MSSV;
          return renderCell({
            key,
            value,
            keyId,
            params,
          });
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowInternGrade không thay đổi thì không cần re-render
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable
    );
  }
);

export default RowInternGrade;
