import { DataGradingReviewItem } from "@/types";
import { Table } from "flowbite-react";
import { useState } from "react";
import { tableTheme } from "../components/DataTable";

interface DataTableParams {
  dataTable: DataGradingReviewItem;
}

const ReviewGradeTable = (params: DataTableParams) => {
  return (
    <div>
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
            {Object.keys(params.dataTable).map((key) => {
              if (key === "exerciseId") return;
              let keyRender = "";

              if (key === "historyGrade") keyRender = "Điểm phúc khảo";
              else if (key === "historyFeedback") keyRender = "Góp ý";
              else keyRender = key;

              return (
                <Table.HeadCell
                  key={key}
                  theme={tableTheme?.head?.cell}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {keyRender}
                </Table.HeadCell>
              );
            })}
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            {(() => {
              const rows = [];
              const historyGrade = params.dataTable.historyGrade || [];
              const historyFeedback = params.dataTable.historyFeedback || [];
              let isRenderFirst = true;

              for (let i = 0; i < Math.max(historyGrade.length, 1); i++) {
                rows.push(
                  <Table.Row key={`row_${i}`}>
                    {Object.entries(params.dataTable).map(([key, value]) => {
                      if (key === "exerciseId") return;

                      // Nếu là hàng đầu tiên, render đầy đủ dữ liệu
                      if (isRenderFirst) {
                        if (key === "historyGrade") {
                          return (
                            <Table.Cell
                              key={`${key}_${i}`}
                              className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-center"
                            >
                              {historyGrade[i] || ""}
                            </Table.Cell>
                          );
                        }

                        if (key === "historyFeedback") {
                          return (
                            <Table.Cell
                              key={`${key}_${i}`}
                              className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left"
                            >
                              {historyFeedback[i] || ""}
                            </Table.Cell>
                          );
                        }

                        return (
                          <Table.Cell
                            key={`${key}_${i}`}
                            className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left"
                          >
                            {value}
                          </Table.Cell>
                        );
                      }

                      // Nếu là các hàng tiếp theo, chỉ render historyGrade và historyFeedback
                      if (key === "historyGrade") {
                        return (
                          <Table.Cell
                            key={`${key}_${i}`}
                            className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-center"
                          >
                            {historyGrade[i] || ""}
                          </Table.Cell>
                        );
                      }

                      if (key === "historyFeedback") {
                        return (
                          <Table.Cell
                            key={`${key}_${i}`}
                            className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left"
                          >
                            {historyFeedback[i] || ""}
                          </Table.Cell>
                        );
                      }

                      // Các ô khác để trống
                      return (
                        <Table.Cell
                          key={`${key}_${i}`}
                          className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left"
                        >
                          {" "}
                        </Table.Cell>
                      );
                    })}
                    {isRenderFirst && (isRenderFirst = false)}
                  </Table.Row>
                );
              }

              return rows;
            })()}
          </Table.Body>
        </Table>
      </div>

    </div>
  );
};

export default ReviewGradeTable;
