import { ThesisTopicGradeData, ThesisTopicGradeDataItem } from "@/types";
import { Table } from "flowbite-react";
import Image from "next/image";
import React, { useRef } from "react";
import InputComponent from "../../Table/components/InputComponent";

interface RowParams {
  roles: string[];
  valueUniqueInput: string;
  dataItem: ThesisTopicGradeDataItem;
  isEditTable?: boolean;
  isHasSubCourses?: boolean;
  onChangeRow?: (item: any) => void;
  onReviewForm?: (formId: string, isReviewer: number) => void;
}
interface handleInputChangeParams {
  key: keyof ThesisTopicGradeData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowThesisTopicGrade = React.memo(
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
      const updatedDataItem: ThesisTopicGradeDataItem = {
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

    var valueUniqueInput = params.dataItem.data["Mã nhóm"];

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
        key === "Điểm phản biện" ||
        key === "Điểm hướng dẫn" ||
        key === "Điểm chủ tịch" ||
        key === "Điểm tổng" ||
        key === "Điểm thư ký" ||
        key === "Điểm ủy viên"
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
        //? 1 cụm
        case "Điểm phản biện":
          return params.isEditTable && params.roles.includes("Phản biện") ? (
            <div className="flex justify-center items-center gap-2">
              {typeof value === "string" && value.trim() === "" ? (
                <p className="text-red-600 text-center">Trống</p>
              ) : (
                <span>{value}</span>
              )}

              <Image
                src={"/assets/icons/edit-black.svg"}
                width={24}
                height={24}
                alt={"edit"}
                className={`object-contain cursor-pointer -translate-y-[2px] `}
                onClick={() => {
                  params.onReviewForm(
                    params.dataItem.data["Mã nhóm"],
                    key === "Điểm phản biện" ? 1 : 0
                  );
                }}
              />
            </div>
          ) : typeof value === "string" && value.trim() === "" ? (
            <p className="text-red-600 text-center">Trống</p>
          ) : (
            value
          );
        case "Điểm hướng dẫn":
          return params.isEditTable && params.roles.includes("Hướng dẫn") ? (
            <div className="flex justify-center items-center gap-2">
              {typeof value === "string" && value.trim() === "" ? (
                <p className="text-red-600 text-center">Trống</p>
              ) : (
                <span>{value}</span>
              )}

              <Image
                src={"/assets/icons/edit-black.svg"}
                width={24}
                height={24}
                alt={"edit"}
                className={`object-contain cursor-pointer -translate-y-[2px] `}
                onClick={() => {
                  params.onReviewForm(params.dataItem.data["Mã nhóm"], 0);
                }}
              />
            </div>
          ) : typeof value === "string" && value.trim() === "" ? (
            <p className="text-red-600 text-center">Trống</p>
          ) : (
            value
          );

        //? 1 cụm

        case "Điểm chủ tịch":
          return params.isEditTable &&
            (params.roles.includes("Chủ tịch") ||
              params.roles.includes("Thư ký")) ? (
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
        case "Điểm thư ký":
          return params.isEditTable && params.roles.includes("Thư ký") ? (
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
        case "Điểm ủy viên":
          return params.isEditTable &&
            (params.roles.includes("Ủy viên") ||
              params.roles.includes("Thư ký")) ? (
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

        //? 1 cụm
        case "Điểm tổng":
          return typeof value === "string" && value.trim() === "" ? (
            <p className="text-red-600 text-center">Trống</p>
          ) : (
            value
          );

        case "MSSV":
        case "Họ và tên":
        case "Hướng dẫn":
          return Array.isArray(value)
            ? value.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index < value.length - 1 && <br />}
                </React.Fragment>
              ))
            : value;

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
      if (key === "Mã nhóm" || key === "Mã đề tài") return null;

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
          <span>{params.dataItem.data["Mã nhóm"]}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          const keyId = params.dataItem.data["Mã nhóm"];
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
    // Kiểm tra nếu `dataItem` của RowThesisTopicGrade không thay đổi thì không cần re-render
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable
    );
  }
);

export default RowThesisTopicGrade;
