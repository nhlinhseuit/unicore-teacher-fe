"use client";

import { DataTableType, itemsPerPage } from "@/constants";
import { StudentDataItem, TeacherDataItem } from "@/types";
import { CustomFlowbiteTheme, Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import MyFooter from "./MyFooter";
import Row from "./Row";

interface DataTableParams {
  type: DataTableType;
  dataTable:
    | StudentDataItem[]
    | TeacherDataItem[]
    | (StudentDataItem | TeacherDataItem)[];
}

const DataTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  // ! FOOTER
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = dataTable.length;

  // Tính toán các items hiển thị dựa trên currentPage
  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [dataTable, currentPage]); // * Khi dataTable thì currentItems cũng cập nhật để update dữ liệu kh bị cũ

  return (
    <div>
      {/* TABLE */}
      <div
        className="
          scroll-container 
          overflow-auto
          max-w-full
          h-fit
          rounded-lg
          border-[1px]
          border-secondary-200
          "
      >
        <Table hoverable theme={tableTheme}>
          {/* HEADER */}
          <Table.Head
            theme={tableTheme?.head}
            className="sticky top-0 z-10 uppercase border-b bg-gray"
          >
            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={` w-10 border-r-[1px] uppercase`}
            >
              STT
            </Table.HeadCell>

            {Object.keys(currentItems[0]?.data || {}).map((key) => (
              <Table.HeadCell
                key={key}
                theme={tableTheme?.head?.cell}
                className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
              >
                {key}
              </Table.HeadCell>
            ))}
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            {currentItems.map((dataItem) =>
              dataItem.isDeleted ? (
                <></>
              ) : (
                <Row
                  key={dataItem.STT}
                  dataItem={dataItem}
                  isHasSubCourses={
                    params.type === DataTableType.Course &&
                    dataItem.STT.toString() === "1"
                  }
                />
              )
            )}
          </Table.Body>
        </Table>
      </div>
      
      {/* FOOTER */}
      <MyFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={(newPage) => setCurrentPage(newPage)} //HERE
      />
    </div>
  );
};

export default DataTable;

export const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "min-w-full text-center rounded-lg text-sm text-secondary-500",
    shadow:
      "absolute bg-background-secondary dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative ",
  },
  body: {
    base: "group/body bg-background-secondary",
    cell: {
      base: `text-center group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg p-2 sm:p-3 md:p-4 font-normal text-secondary-900 `,
    },
  },
  head: {
    base: " text-center group/head bg-background-secondary text-xs border-b-2 border-secondary-200 uppercase text-secondary-700",
    cell: {
      base: "text-center  group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg p-2 sm:p-3 md:p-4 sm:p-2 md:p-4",
    },
  },
  row: {
    base: "text-center group/row bg-background-secondary",
    hovered: "hover:bg-light-800",
    striped: "odd:bg-background-secondary even:bg-background-secondary ",
  },
};
