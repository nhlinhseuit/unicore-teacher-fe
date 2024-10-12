"use client";

import { CustomFlowbiteTheme, Table } from "flowbite-react";
import Row from "./Row";
import { CourseDataItem, SubjectDataItem } from "@/types";

interface DataTableParams {
  isEditTable: boolean;
  dataTable: CourseDataItem[] | SubjectDataItem[];
}

const DataTable = (params: DataTableParams) => {
  return (
    <div className="overflow-auto max-w-full h-fit rounded-lg border-[1px] border-secondary-200">
      <Table hoverable theme={tableTheme}>
        <Table.Head
          theme={tableTheme?.head}
          className="bg-[#F9F9FB] border-b uppercase"
        >
          <Table.HeadCell
            theme={tableTheme?.head?.cell}
            className={`border-r-[1px] uppercase`}
          ></Table.HeadCell>

          <Table.HeadCell
            theme={tableTheme?.head?.cell}
            className={` w-10 border-r-[1px] uppercase`}
          >
            STT
          </Table.HeadCell>

          {Object.keys(params.dataTable[0]?.data || {}).map((key) => (
            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              key={key}
              className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
            >
              {key}
            </Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className="divide-y text-left">
          {params.dataTable.map((dataItem) => (
            <Row
              key={dataItem.STT}
              dataItem={dataItem}
              isEditTable={params.isEditTable}
            />
          ))}
        </Table.Body>
      </Table>
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
