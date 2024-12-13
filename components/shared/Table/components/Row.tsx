import {
  CourseData,
  StudentData,
  StudentDataItem,
  SubjectData,
  TeacherData,
  TeacherDataItem
} from "@/types";
import { Dropdown, Table } from "flowbite-react";
import Image from "next/image";
import React from "react";

interface RowParams {
  dataItem: StudentDataItem | TeacherDataItem;
  isHasSubCourses?: boolean;
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
    const renderTableCell = ({
      key,
      value,
      keyId,
      isHasSubCourses,
    }: {
      key: string;
      value: string | number;
      keyId: string;
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

        default:
          return typeof value === "string"
            ? value.split(/\r\n|\n/).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < value.split(/\r\n|\n/).length - 1 && <br />}
                </React.Fragment>
              ))
            : value;
      }
    };

    console.log("Row");

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary text-left hover:bg-light-800 cursor-default duration-100`}
      >
        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId: any;
          let data;
          switch (params.dataItem.type) {
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
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left `}
            >
              {renderTableCell({
                key,
                value,
                keyId,
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
    return prevProps.dataItem === nextProps.dataItem;
  }
);

export default Row;
