import { Table } from "flowbite-react";
import React, { useRef, useState } from "react";
import { TopicRegisterGroupDataItem } from "@/types";
import InputComponent from "../components/InputComponent";

interface RowParams {
  dataItem: TopicRegisterGroupDataItem;
  onChangeRow?: (item: any) => void;
}

const RowTopicRegisterGroupDataTable = (params: RowParams) => {
  const refInput = useRef({});
  const [editDataItem, setEditDataItem] = useState(params.dataItem);

  return (
    <Table.Row
      key={params.dataItem.STT}
      onClick={() => {}}
      className={`bg-background-secondary  text-left duration-100 hover:bg-transparent cursor-default`}
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
            {/* {value} */}
            <InputComponent
              key={`${key}_${value}`}
              value={value}
              placeholder={value}
              onChange={(newValue) => {
                const newRowItem: TopicRegisterGroupDataItem = {
                  ...editDataItem,
                  data: {
                    ...editDataItem.data,
                    [key]: newValue,
                  },
                };

                refInput.current = newRowItem;
                if (params.onChangeRow) params.onChangeRow(refInput.current);

                setEditDataItem(newRowItem);
              }}
            />
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default RowTopicRegisterGroupDataTable;
