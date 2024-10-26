import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import InputComponent from "./InputComponent";
import { useState } from "react";
import MoreButtonComponent from "./MoreButtonComponent";
import {
  CourseData,
  SubjectData,
  CourseDataItem,
  SubjectDataItem,
} from "@/types";
import IconButton from "../../IconButton";

interface RowParams {
  dataItem: CourseDataItem | SubjectDataItem;
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  saveDataTable?: () => void;
  onClickCheckBoxSelect?: (item: string) => void;
  onChangeRow?: (item: any) => void;
}
interface handleInputChangeParams {
  key: keyof CourseData | keyof SubjectData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const Row = React.memo((params: RowParams) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editDataItem, setEditDataItem] = useState(params.dataItem);
  const [isChecked, setIsChecked] = useState(
    //@ts-ignore
    params.dataItem.data["Khoa quản lý"] as boolean
  );

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
    const updatedDataItem: CourseDataItem | SubjectDataItem = {
      ...editDataItem,
      data: {
        ...editDataItem.data,
        [key]: isMultipleInput
          ? //@ts-ignore
            (editDataItem.data[key] as string)
              .split(/\r\n|\n/)
              .map((line, index) => (index === currentIndex ? newValue : line))
              .join("\r\n")
          : newValue,
      },
    };

    setEditDataItem(updatedDataItem); // ??

    params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
  };

  console.log("re-render ROW");

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
            <div className="w-10 h-10 flex justify-center items-center">
              <input
                id="apple"
                type="checkbox"
                name="filterOptions"
                value={
                  params.dataItem.type === "course"
                    ? (params.dataItem as CourseDataItem).data["Mã lớp"]
                    : // ? DELETE THEO STT VÌ MÃ MÔN GIỐNG NHAU KHÁC HỆ ĐÀO TẠO
                      (params.dataItem as SubjectDataItem)["STT"]
                }
                onChange={() => {
                  {
                    params.onClickCheckBoxSelect &&
                      params.onClickCheckBoxSelect(
                        params.dataItem.type === "course"
                          ? (params.dataItem as CourseDataItem).data["Mã lớp"]
                          : // ? DELETE THEO STT VÌ MÃ MÔN GIỐNG NHAU KHÁC HỆ ĐÀO TẠO
                            (params.dataItem as SubjectDataItem)["STT"]
                      );
                  }
                }}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 cursor-pointer"
              />
            </div>
          ) : isEdit ? (
            <IconButton
              text="Lưu"
              onClick={() => {
                setIsEdit(false);
                params.saveDataTable && params.saveDataTable();
              }}
            />
          ) : (
            <MoreButtonComponent handleEdit={handleEdit} />
          )}
        </div>
      </Table.Cell>

      {/* STT */}
      <Table.Cell className="w-10 border-r-[1px]  text-left">
        {params.dataItem.STT}
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
            {key === "Khoa quản lý" ? (
              isEdit || params.isEditTable ? (
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    handleInputChange({
                      key: key,
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
              )
            ) : // TH 1 thẻ Input hoặc nhiều thẻ Input do nhiều GV và nhiều mã GV (so on...)
            isEdit || params.isEditTable ? (
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
                        //@ts-ignore
                        onChange={(newValue) =>
                          //@ts-ignore
                          handleInputChange({
                            //@ts-ignore
                            key: key,
                            newValue: newValue,
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
                  //@ts-ignore
                  onChange={(newValue) =>
                    //@ts-ignore
                    handleInputChange({ key: key, newValue: newValue })
                  }
                />
              )
            ) : // TH 1 thẻ dòng text hoặc nhiều thẻ dòng text do nhiều GV
            typeof value === "string" ? (
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
}, (prevProps, nextProps) => {
  // Kiểm tra nếu `dataItem` của Row không thay đổi thì không cần re-render
  return prevProps.dataItem === nextProps.dataItem &&
         prevProps.isEditTable === nextProps.isEditTable &&
         prevProps.isMultipleDelete === nextProps.isMultipleDelete;
});


export default Row;
