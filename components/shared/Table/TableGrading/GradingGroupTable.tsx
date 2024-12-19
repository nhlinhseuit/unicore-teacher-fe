import { itemsPerPageRegisterTable } from "@/constants";
import { GradingExerciseDataItem, GradingReportDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../../Button/IconButton";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import MyFooter from "../components/MyFooter";
import RowGradingGroupTable from "./RowGradingGroupTable";

interface DataTableParams {
  isEditTable: boolean;
  dataTable: GradingExerciseDataItem[] | GradingReportDataItem[];
  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
}

const GradingGroupTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const localDataTableRef = useRef(currentItems);
  const updateLocalDataTableRef = (newValue: any) => {
    localDataTableRef.current = newValue;
  };

  //! CHÚ Ý Ở ĐÂY, DATA LƯU OKE NHƯNG CHƯA RE-RENDER
  const applyFilter = () => {
    setFilteredDataTable(currentItems);
  };

  useEffect(() => {
    applyFilter();
  }, [currentItems]);

  const [filteredDataTable, setFilteredDataTable] = useState<
    | GradingExerciseDataItem[]
    | GradingReportDataItem[]
    | (GradingExerciseDataItem | GradingReportDataItem)[]
  >(currentItems);

  const saveDataTable = () => {
    const updatedDataTable = dataTable.map((item) => {
      // Tìm item tương ứng trong localDataTable dựa vào STT (hoặc một identifier khác)
      const localItem = localDataTableRef.current.find(
        (local) => local.STT === item.STT
      );

      // * Nếu tìm thấy, cập nhật giá trị bằng localItem, ngược lại giữ nguyên item
      // * Trải item và localitem ra, nếu trùng nhau thì localItem ghi đè
      return localItem ? { ...item, ...localItem } : item;
    });

    if (params.onSaveEditTable) {
      params.onSaveEditTable(updatedDataTable);
    }
  };

  return (
    <div>
      {/* TABLE */}
      {currentItems.length > 0 && filteredDataTable.length === 0 ? (
        <NoResult
          title="Không có dữ liệu!"
          description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
        />
      ) : (
        <>
          <div className="flex justify-end mb-4 mr-4">
            {params.isEditTable ? (
              <IconButton text="Lưu" onClick={saveDataTable} />
            ) : (
              <IconButton
                text="Chấm điểm"
                green
                onClick={params.onClickEditTable}
              />
            )}
          </div>

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

                {Object.keys(filteredDataTable[0]?.data || {}).map((key) => {
                  if (key === "Mã nhóm") return null;

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
                {filteredDataTable.map((dataItem, index) =>
                  dataItem.isDeleted ? (
                    <></>
                  ) : (
                    <>
                      {/* //TODO: Main Row: Leader */}
                      <RowGradingGroupTable
                        key={dataItem.STT}
                        dataItem={dataItem}
                        isEditTable={params.isEditTable}
                        onChangeRow={(updatedDataItem: any) => {
                          updateLocalDataTableRef(
                            localDataTableRef.current.map((item) =>
                              item.data["Mã nhóm"] ===
                              updatedDataItem.data["Mã nhóm"]
                                ? updatedDataItem
                                : item
                            )
                          );
                        }}
                      />
                    </>
                  )
                )}
              </Table.Body>
            </Table>
          </div>
        </>
      )}

      {/* FOOTER */}
      {!isShowFooter || params.isEditTable ? (
        <></>
      ) : (
        <MyFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPageRegisterTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)} //HERE
        />
      )}
    </div>
  );
};

export default GradingGroupTable;
