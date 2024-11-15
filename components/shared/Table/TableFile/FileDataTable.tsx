import { Table } from "flowbite-react";
import React, { useMemo, useState } from "react";
import { FileDataItem } from "@/types";
import { itemsPerPageTopicTable } from "@/constants";
import { tableTheme } from "../components/DataTable";
import Footer from "../components/Footer";
import RowFileDataTable from "./RowFileDataTable";
import Image from "next/image";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: FileDataItem[];
}

const TopicDataTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageTopicTable,
      currentPage * itemsPerPageTopicTable
    );
  }, [dataTable, currentPage]);

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
            ></Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={` w-10 border-r-[1px] uppercase`}
            >
              STT
            </Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={`w-16 border-r-[1px] uppercase !py-0 !my-0`}
            >
              <div className="flex-center">
                <Image
                  src="/assets/icons/file.svg"
                  alt="search"
                  width={24}
                  height={24}
                />
              </div>
            </Table.HeadCell>

            {Object.keys(currentItems[0]?.data || {}).map((key) => {
              return (
                <Table.HeadCell
                  key={key}
                  theme={tableTheme?.head?.cell}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {key}
                </Table.HeadCell>
              );
            })}
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            {currentItems.map((dataItem, index) =>
              dataItem.isDeleted ? (
                <></>
              ) : (
                <RowFileDataTable
                  key={dataItem.STT}
                  dataItem={dataItem}
                  // onClickDelete={(id: any) => {
                  //   console.log('id', id)
                  // }}
                />
              )
            )}
          </Table.Body>
        </Table>
      </div>

      {/* FOOTER */}
      {!isShowFooter || params.isEditTable || params.isMultipleDelete ? (
        <></>
      ) : (
        <Footer
          currentPage={currentPage}
          itemsPerPage={itemsPerPageTopicTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

export default TopicDataTable;
