import { Table } from "flowbite-react";
import React, { useState } from "react";
import { tableTheme } from "../../Table/components/DataTable";
import RowTopicRegisterGroupDataTable from "./RowTopicRegisterGroupDataTable";
import { TopicRegisterGroupDataItem } from "@/types";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: TopicRegisterGroupDataItem[];
  onChangeTable?: (newValue: any) => void;
}

const TopicRegisterGroupDataTable = (params: DataTableParams) => {
  let localDataTable = params.dataTable;

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

            {Object.keys(params.dataTable[0].data || {}).map((key) => {
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
            {params.dataTable.map((dataItem, index) => (
              <RowTopicRegisterGroupDataTable
                key={dataItem.STT}
                dataItem={dataItem}
                onChangeRow={(updatedDataItem: any) => {

                  localDataTable = localDataTable.map((item) =>
                    item.STT === updatedDataItem.STT ? updatedDataItem : item
                  );

                  var newData = localDataTable.map((item) =>
                    item.STT === updatedDataItem.STT ? updatedDataItem : item
                  );

                  if (params.onChangeTable) {
                    params.onChangeTable(newData);
                  }
                }}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default TopicRegisterGroupDataTable;
