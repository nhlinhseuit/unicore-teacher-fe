import { Table } from "flowbite-react";
import React from "react";
import { TopicDataItem } from "@/types";

interface RowParams {
  dataItem: TopicDataItem;
}
interface handleInputChangeParams {
  key: TopicDataItem;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowTopicDataTable = (params: RowParams) => {
  return (
    <Table.Row
      key={params.dataItem.STT}
      onClick={() => {}}
      className={`bg-background-secondary  text-leftduration-100`}
    >
      {/* STT */}
      <Table.Cell className="w-10 border-r-[1px]  text-left">
        <span>{params.dataItem.STT}</span>
      </Table.Cell>

      {/* Các giá trị khác */}
      {Object.entries(params.dataItem.data).map(([key, value]) => {
        return (
          <Table.Cell
            key={`${key}_${value}`}
            theme={{
              base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
            }}
            className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
          >
            {value}
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default RowTopicDataTable;
