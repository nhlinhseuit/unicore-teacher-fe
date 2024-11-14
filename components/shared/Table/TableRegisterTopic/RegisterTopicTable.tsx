import { Table } from "flowbite-react";
import React, { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import RowRegisterTopicTable from "./RowRegisterTopicTable";
import { RegisterGroupDataItem, RegisterTopicDataItem } from "@/types";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import Footer from "../components/Footer";
import { itemsPerPageRegisterTable, RegisterTopicTableType } from "@/constants";
import IconButton from "../../Button/IconButton";
import { toast } from "@/hooks/use-toast";

interface DataTableParams {
  type: RegisterTopicTableType;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: RegisterTopicDataItem[];
}

const RegisterTopicTable = (params: DataTableParams) => {
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
    useState<RegisterGroupDataItem[]>(currentItems);

  const applyFilter = () => {
    let filteredData;

    filteredData = currentItems;
    setIsShowFooter(true);
    setFilteredDataTable(filteredData);
  };

  console.log("itemselected", itemsSelected);

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
          {params.type === RegisterTopicTableType.approveTopic ? (
            <div className="flex justify-end items-center mb-3 gap-2">
              <p className="text-sm font-medium">
                Đã chọn:
                <span className="font-semibold">
                  {` ${itemsSelected.length}`}
                </span>
              </p>
              <IconButton
                text="Duyệt đề tài"
                green
                onClick={() => {
                  if (itemsSelected.length === 0) {
                    toast({
                      title: "Vui lòng chọn đề tài!",
                      variant: "error",
                      duration: 3000,
                    });
                    return;
                  }
                  toast({
                    title: "Duyệt đề xuất các đề tài thành công.",
                    description: `Các đề tài ${itemsSelected.join(
                      ", "
                    )} đã dược duyệt.`,
                    variant: "success",
                    duration: 3000,
                  });
                  setItemsSelected([]);
                }}
                iconWidth={16}
                iconHeight={16}
              />

              <IconButton
                text="Từ chối đề tài"
                red
                onClick={() => {
                  if (itemsSelected.length === 0) {
                    toast({
                      title: "Vui lòng chọn đề tài!",
                      variant: "error",
                      duration: 3000,
                    });
                    return;
                  }
                  toast({
                    title: "Từ chối các đề tài thành công.",
                    description: `Các đề tài ${itemsSelected.join(
                      ", "
                    )} đã bị từ chối.`,
                    variant: "success",
                    duration: 3000,
                  });
                  setItemsSelected([]);
                }}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
          ) : (
            <></>
          )}

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

                {Object.keys(filteredDataTable[0]?.data || {}).map((key) => {
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
                      <RowRegisterTopicTable
                        type={params.type}
                        key={dataItem.STT}
                        isMemberOfAboveGroup={
                          index === 0
                            ? false
                            : filteredDataTable[index - 1].data["Mã nhóm"] ===
                              dataItem.data["Mã nhóm"]
                        }
                        dataItem={dataItem}
                        isEditTable={params.isEditTable}
                        isMultipleDelete={params.isMultipleDelete}
                        onClickCheckBoxSelect={(item: string) => {
                          setItemsSelected((prev) => {
                            if (prev.includes(item)) {
                              return prev.filter((i) => i !== item);
                            } else {
                              return [...prev, item];
                            }
                          });
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
                          const updatedDataTable = dataTable.map(
                            (item, index) =>
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
                      />

                      {/* //TODO: MEMBER */}
                      {/* {dataItem.data.listStudent
                        .filter((student) => !student.isLeader)
                        .map((student, index) => (
                          <RowRegisterTopicTable
                            key={`${dataItem.STT}-${index}`}
                            dataItem={{
                              ...dataItem,
                              data: { ...dataItem.data, student },
                            }}
                            isEditTable={params.isEditTable}
                            isMultipleDelete={params.isMultipleDelete}
                            onClickCheckBoxSelect={() => {}}
                            onChangeRow={() => {}}
                            saveSingleRow={() => {}}
                            onClickGetOut={() => {}}
                            deleteSingleRow={() => {}}
                          />
                        ))} */}
                    </>
                  )
                )}
              </Table.Body>
            </Table>
          </div>
        </>
      )}

      {/* FOOTER */}
      {!isShowFooter || params.isEditTable || params.isMultipleDelete ? (
        <></>
      ) : (
        <Footer
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

export default RegisterTopicTable;
