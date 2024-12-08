import { DataGradingDetailItem } from "@/types";
import { Table } from "flowbite-react";
import { useRef } from "react";
import InputComponent from "../Table/components/InputComponent";
import { tableTheme } from "../Table/components/DataTable";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: DataGradingDetailItem;
  savePostScoreDetail: (newPostScoreDetailItem: DataGradingDetailItem) => void;
}

const ScoreColumnDetailItemTable = (params: DataTableParams) => {
  const refInput = useRef(params.dataTable);

  const handleInputChange = (
    key: keyof DataGradingDetailItem,
    value: string | number
  ) => {
    // @ts-ignore
    refInput.current[key] = value;

    params.savePostScoreDetail(refInput.current);
  };

  const renderTableCellValue = (key: any, value: any) => {
    if (key !== "Bài nộp" && key !== "Tỉ lệ điểm" && params.isEditTable) {
      return (
        <InputComponent
          value={value}
          placeholder={value}
          onChange={(newValue) => handleInputChange(key, newValue)}
          isDescription={key === "Góp ý" ? true : false}
          otherClassess="w-full"
          isInTable
        />
      );
    }
    return value;
  };

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
            {Object.keys(params.dataTable).map((key, index) => {
              if (key === "Tỉ lệ điểm")
                return (
                  <Table.HeadCell
                    key={`${key}_${index}`}
                    theme={tableTheme?.head?.cell}
                    className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                  >
                    {`${key} (%)`}
                  </Table.HeadCell>
                );
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
            <Table.Row
              onClick={() => {}}
              className={`bg-background-secondary  text-left ${
                params.isEditTable
                  ? "hover:bg-white cursor-default"
                  : "hover:bg-light-800 cursor-default"
              } duration-100`}
            >
              {/* Các giá trị khác */}
              {Object.entries(params.dataTable).map(([key, value]) => {
                return (
                  <Table.Cell
                    theme={{
                      base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
                    }}
                    className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left 
              ${key === "Bài nộp" ? "underline cursor-pointer" : ""}
              ${key === "Điểm" || key === "Tỉ lệ điểm" ? "text-center" : ""}
            `}
                  >
                    {renderTableCellValue(key, value)}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ScoreColumnDetailItemTable;
