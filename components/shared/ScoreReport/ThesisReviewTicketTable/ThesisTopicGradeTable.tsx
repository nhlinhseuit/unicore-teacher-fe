import { Dropdown, Table } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import NoResult from "../../Status/NoResult";

import {
  GradingThesisTopicFilterType,
  itemsPerPageRegisterTable,
} from "@/constants";
import IconButton from "../../Button/IconButton";

import useDebounceSearchDataTable from "@/hooks/table/useDebounceSearchDataTable";
import useSetDebounceSearchTerm from "@/hooks/table/useSetDebounceSearchTerm";
import Image from "next/image";
import TableSearch from "../../Search/TableSearch";
import { tableTheme } from "../../Table/components/DataTable";
import MyFooter from "../../Table/components/MyFooter";
import RowThesisReviewTicketTable from "./RowThesisTopicGrade";
import {
  ReviewerThesisReviewTicketDataItem,
  SupervisorThesisReviewTicketDataItem,
} from "@/types";

interface DataTableParams {
  isEditTable: boolean;
  type: string;
  dataTable:
    | SupervisorThesisReviewTicketDataItem[]
    | ReviewerThesisReviewTicketDataItem[];
  isOnlyView?: boolean;

  onReviewForm?: (formId: string, isReviewer: number) => void;
  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
}

const ThesisReviewTicketTable = (params: DataTableParams) => {
  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);

  const dataTable = useMemo(() => {
    if (params.type === "supervisor") {
      return params.dataTable.filter((dataItem) => {
        if (selectedThesisStatus === 0) {
          return (
            (dataItem as SupervisorThesisReviewTicketDataItem).data[
              "Hướng dẫn"
            ]?.trim() !== ""
          );
        } else if (selectedThesisStatus === 1) {
          return !(
            (dataItem as SupervisorThesisReviewTicketDataItem).data[
              "Hướng dẫn"
            ]?.trim() !== ""
          );
        } else return dataItem;
      });
    } else {
      // ? reviewer
      return params.dataTable.filter((dataItem) => {
        if (selectedThesisStatus === 0) {
          return (
            (dataItem as ReviewerThesisReviewTicketDataItem).data[
              "Phản biện"
            ]?.trim() !== ""
          );
        } else if (selectedThesisStatus === 1) {
          return !(
            (dataItem as ReviewerThesisReviewTicketDataItem).data[
              "Phản biện"
            ]?.trim() !== ""
          );
        } else return dataItem;
      });
    }
  }, [params.dataTable, selectedThesisStatus]);

  const [currentPage, setCurrentPage] = useState(1);
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

  //TODO: SEARCH
  const applyFilter = () => {
    setFilteredDataTable(currentItems);
  };

  useEffect(() => {
    applyFilter();
  }, [currentItems]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] = useState(currentItems);

  useSetDebounceSearchTerm(setDebouncedSearchTerm, searchTerm);
  useDebounceSearchDataTable(
    debouncedSearchTerm,
    setFilteredDataTable,
    applyFilter,
    () => {},
    () => {},
    dataTable,
    currentItems
  );

  const saveDataTable = () => {
    const updatedDataTable = dataTable.map((item) => {
      // Tìm item tương ứng trong localDataTable dựa vào STT (hoặc một identifier khác)
      const localItem = localDataTableRef.current.find(
        (local) => local.data["Mã nhóm"] === item.data["Mã nhóm"]
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
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
        {/* ACTION VỚI TABLE */}
        {params.isEditTable ? null : (
          <div className="w-full flex items-center">
            <div className="w-full mr-3 md:w-1/3">
              <TableSearch
                setSearchTerm={(value) => setSearchTerm(value)}
                searchTerm={searchTerm}
              />
            </div>

            <Dropdown
              className="z-30 rounded-lg"
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div>
                  <IconButton
                    text={`${
                      selectedThesisStatus !== -1
                        ? GradingThesisTopicFilterType[selectedThesisStatus]
                            .value
                        : "Chọn bộ lọc"
                    }`}
                    onClick={() => {}}
                    iconRight={"/assets/icons/chevron-down.svg"}
                    bgColor="bg-white"
                    textColor="text-black"
                    border
                  />
                </div>
              )}
            >
              <div className="scroll-container scroll-container-dropdown-content">
                {GradingThesisTopicFilterType.map((course: any, index) => (
                  <Dropdown.Item
                    key={`${course}_${index}`}
                    onClick={() => {
                      if (selectedThesisStatus === course.id) {
                        setSelectedThesisStatus(-1);
                      } else {
                        setSelectedThesisStatus(course.id);
                      }
                    }}
                  >
                    <div className="flex justify-between w-full gap-4">
                      <p className="text-left line-clamp-1">{course.value}</p>
                      {selectedThesisStatus === course.id ? (
                        <Image
                          src="/assets/icons/check.svg"
                          alt="search"
                          width={21}
                          height={21}
                          className="cursor-pointer mr-2"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        )}

        {params.isOnlyView ? null : (
          <div className="ml-auto flex justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center">
            {params.isEditTable ? (
              <IconButton text="Lưu" onClick={saveDataTable} />
            ) : (
              <IconButton text="Chỉnh sửa" onClick={params.onClickEditTable} />
            )}
          </div>
        )}
      </div>

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
                className={` w-10 border-r-[1px] uppercase`}
              >
                STT
              </Table.HeadCell>

              {Object.keys(filteredDataTable[0]?.data || {}).map(
                (key, index) => {
                  if (key === "Mã nhóm" || key === 'Mã đề tài') return null;

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
              {filteredDataTable.map((dataItem, index) => {
                var valueUniqueInput = dataItem.data["Mã nhóm"];

                return (
                  // {/* //TODO: Main Row: Leader */}
                  <RowThesisReviewTicketTable
                    key={`${dataItem.STT}_${index}`}
                    dataItem={dataItem}
                    valueUniqueInput={valueUniqueInput.toString()}
                    isEditTable={params.isEditTable}
                    onChangeRow={(updatedDataItem: any) => {
                      updateLocalDataTableRef(
                        localDataTableRef.current.map((item) =>
                          item.STT === updatedDataItem.STT
                            ? updatedDataItem
                            : item
                        )
                      );
                    }}
                    onReviewForm={params.onReviewForm}
                  />
                );
              })}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* FOOTER */}
      {searchTerm !== "" || params.isEditTable ? (
        <></>
      ) : (
        <MyFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPageRegisterTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

export default ThesisReviewTicketTable;
