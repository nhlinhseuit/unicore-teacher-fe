import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { itemsPerPageRegisterTable } from "@/constants";
import { GradeColumnPercentDataItem, ScoreTranscriptDataItem } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import MyFooter from "../components/MyFooter";
import RowScoreTranscriptTable from "./RowScoreTranscriptTable";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: ScoreTranscriptDataItem[];
  dataGradeColumnPercent: GradeColumnPercentDataItem;
  viewDetailGradeColumn: () => void;
}

const ScoreTranscriptTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [isShowDialog, setIsShowDialog] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const [filteredDataTable, setFilteredDataTable] =
    useState<ScoreTranscriptDataItem[]>(currentItems);

  const applyFilter = () => {
    let filteredData;

    filteredData = currentItems;
    setIsShowFooter(true);
    setFilteredDataTable(filteredData);
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
                className={`border-r-[1px] uppercase`}
              ></Table.HeadCell>

              <Table.HeadCell
                theme={tableTheme?.head?.cell}
                className={` w-10 border-r-[1px] uppercase`}
              >
                STT
              </Table.HeadCell>

              {Object.keys(filteredDataTable[0]?.data || {}).map(
                (key, index) => {
                  if (
                    key === "Quá trình" ||
                    key === "Giữa kỳ" ||
                    key === "Cuối kỳ"
                  ) {
                    return (
                      <Table.HeadCell
                        key={`${key}_${index}`}
                        theme={tableTheme?.head?.cell}
                        className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                      >
                        {`${key} (${params.dataGradeColumnPercent[`${key}`]}%)`}
                      </Table.HeadCell>
                    );
                  }
                  return (
                    <Table.HeadCell
                      key={`${key}_${index}`}
                      theme={tableTheme?.head?.cell}
                      className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                    >
                      {key}
                    </Table.HeadCell>
                  );
                }
              )}
            </Table.Head>

            {/* BODY */}
            <Table.Body className="text-left divide-y">
              {filteredDataTable.map((dataItem, index) =>
                dataItem.isDeleted ? null : (
                  <RowScoreTranscriptTable
                    key={dataItem.STT}
                    dataItem={dataItem}
                    isEditTable={params.isEditTable}
                    isMultipleDelete={params.isMultipleDelete}
                    onClickCheckBoxSelect={(item: string) => {
                      //   setItemsSelected((prev) => {
                      //   if (prev.includes(item)) {
                      //     return prev.filter((i) => i !== item);
                      //   } else {
                      //     return [...prev, item];
                      //   }
                      // });
                    }}
                    onChangeRow={(updatedDataItem: any) => {
                      //   setLocalDataTable((prevTable) =>
                      //     prevTable.map((item) =>
                      //       item.STT === updatedDataItem.STT
                      //         ? updatedDataItem
                      //         : item
                      //     )
                      //   );
                    }}
                    saveSingleRow={(updatedDataItem: any) => {
                      const updatedDataTable = dataTable.map((item, index) =>
                        item.STT === updatedDataItem.STT
                          ? updatedDataItem
                          : item
                      );

                      //   if (params.onSaveEditTable) {
                      //     params.onSaveEditTable(updatedDataTable);
                      //   }
                    }}
                    onClickGetOut={() => {
                      // params.onClickGetOut
                    }}
                    deleteSingleRow={() => {
                      //  params.onClickDelete
                    }}
                    viewDetailGradeColumn={params.viewDetailGradeColumn}
                  />
                )
              )}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* FOOTER */}
      {!isShowFooter || params.isEditTable || params.isMultipleDelete ? (
        <></>
      ) : (
        <MyFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPageRegisterTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)} //HERE
        />
      )}

      {/* ALERT CONFIRM */}
      {isShowDialog !== -1 ? (
        <AlertDialog open={isShowDialog !== -1}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
              <AlertDialogDescription>
                Thao tác này không thể hoàn tác, dữ liệu của bạn sẽ bị xóa vĩnh
                viễn và không thể khôi phục.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsShowDialog(-1);
                  setItemsSelected([]);
                  // params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setItemsSelected([]);
                  // params.onClickGetOut && params.onClickGetOut();
                  // if (isShowDialog === 1) {
                  //   params.onClickDelete && params.onClickDelete(itemsSelected);
                  // } else if (isShowDialog === 2) {
                  //   params.onClickDeleteAll && params.onClickDeleteAll();
                  // }
                  setIsShowDialog(-1);
                }}
                className="bg-primary-500 hover:bg-primary-500/90"
              >
                Đồng ý
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScoreTranscriptTable;
