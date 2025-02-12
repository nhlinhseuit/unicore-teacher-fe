import { ColumnType, roundAverageGrade, roundRegularGrade } from "@/constants";
import {
  DataColumnDetail,
  ScoreTranscriptDataItem
} from "@/types";
import { Table } from "flowbite-react";
import React from "react";

interface RowParams {
  dataItem: ScoreTranscriptDataItem;
  viewDetailGradeColumn: (columnType: ColumnType) => void;
}

const RowGradingGroupTable = React.memo(
  (params: RowParams) => {
    var valueUniqueInput = params.dataItem.data["MSSV"];

    const calculateWeightedAverageColumn = (
      value: DataColumnDetail
    ): number => {
      const detailScore = value.detailScore;
      const detailRatio = value.detailRatio;

      if (
        detailScore.length !== detailRatio.length ||
        detailScore.length === 0
      ) {
        return 0;
      }

      const totalWeightedScore = detailScore.reduce(
        (sum, score, index) => sum + score * (detailRatio[index] / 100),
        0
      );
      const res = Math.round(totalWeightedScore / roundRegularGrade) * roundRegularGrade;

      return parseFloat(res.toFixed(1))
    };

    const calculateWeightedAverage = (): number => {
      const qt = calculateWeightedAverageColumn(
        params.dataItem.data["Quá trình"]
      );
      const gk = calculateWeightedAverageColumn(
        params.dataItem.data["Giữa kỳ"]
      );
      const ck = calculateWeightedAverageColumn(
        params.dataItem.data["Cuối kỳ"]
      );
      const th = calculateWeightedAverageColumn(
        params.dataItem.data["Thực hành"]
      );

      const qtRatio = params.dataItem.data["Quá trình"].ratio;
      const gkRatio = params.dataItem.data["Giữa kỳ"].ratio;
      const ckRatio = params.dataItem.data["Cuối kỳ"].ratio;
      const thRatio = params.dataItem.data["Thực hành"].ratio;

      const totalWeightedScore =
        (qt * qtRatio + gk * gkRatio + ck * ckRatio + th * thRatio) / 100;

        const res = Math.round(totalWeightedScore / roundAverageGrade) * roundAverageGrade

      console.log("totalWeightedScore", totalWeightedScore);

      return parseFloat(res.toFixed(1));

    };

    const renderTableCellValue = (keyId: string, key: string, value: any) => {
      if (
        key === "Quá trình" ||
        key === "Giữa kỳ" ||
        key === "Cuối kỳ" ||
        key === "Thực hành"
      ) {
        if ((value as DataColumnDetail).ratio === 0)
          return (
            <span className="text-center">
              {(value as DataColumnDetail).score}
            </span>
          );
        return (
          <span
            className="cursor-pointer underline text-center"
            onClick={() => {
              let columnType = ColumnType.NONE;
              switch (key) {
                case "Quá trình":
                  columnType = ColumnType.QUA_TRINH;
                  break;
                case "Giữa kỳ":
                  columnType = ColumnType.GIUA_KY;
                  break;
                case "Cuối kỳ":
                  columnType = ColumnType.CUOI_KY;
                  break;
                case "Thực hành":
                  columnType = ColumnType.THUC_HANH;
              }
              params.viewDetailGradeColumn(columnType);
            }}
          >
            {calculateWeightedAverageColumn(value)}
            {/* {(value as DataColumnDetail).score} */}
          </span>
        );
      } else if (key === "Điểm trung bình") {
        return (
          <span className="text-center">{calculateWeightedAverage()}</span>
        );
      } else {
        return value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary text-center hover:bg-light-800 cursor-default duration-100`}
      >
        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-center">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId = params.dataItem.data["MSSV"];

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
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-center 
                ${typeof value === "number" ? "text-center" : ""}
                
                }
            `}
            >
              {renderTableCellValue(keyId, key, value)}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowGradingGroupTable không thay đổi thì không cần re-render
    return prevProps.dataItem === nextProps.dataItem;
  }
);

export default RowGradingGroupTable;
