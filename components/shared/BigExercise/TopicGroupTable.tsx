import { Table } from "flowbite-react";
import React, { useMemo, useState } from "react";
import RowTopicGroupTable from "./RowTopicGroupTable";
import { TopicDataItem } from "@/types";
import { itemsPerPageTopicTable } from "@/constants";
import NoResult from "../Status/NoResult";
import { tableTheme } from "../Table/components/DataTable";
import Footer from "../Table/components/Footer";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: TopicDataItem[];
}

const TopicGroupTable = (params: DataTableParams) => {
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
            >
              STT
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
                <RowTopicGroupTable key={dataItem.STT} dataItem={dataItem} />
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

export default TopicGroupTable;