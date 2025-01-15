import { GradingReviewDataItem } from "@/types/entity/Review";
import { Table } from "flowbite-react";
import React from "react";

interface RowParams {
  dataItem: GradingReviewDataItem;
  viewDetailGradeColumn: () => void;
}

const RowGradingReviewTable = React.memo(
  (params: RowParams) => {
    const renderTableCellValue = (key: string, value: any) => {
      if (key === "Bài tập") {
        return <span onClick={params.viewDetailGradeColumn}>{value}</span>;
      } else if (key === "Điểm") {
        if (value.length === 1) return value;
        else return value.join(" → ");
      } else {
        return value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary  text-left hover:bg-light-800 cursor-default duration-100`}
      >
        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId = params.dataItem.STT;

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
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left 
              ${key === "Bài tập" ? "underline cursor-pointer" : ""}
              ${key === "Điểm" ? "text-center" : ""}
            `}
            >
              {renderTableCellValue(key, value)}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowGradingReviewTable không thay đổi thì không cần re-render
    return prevProps.dataItem === nextProps.dataItem;
  }
);

export default RowGradingReviewTable;
