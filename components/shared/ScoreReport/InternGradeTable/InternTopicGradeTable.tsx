import {
  GradingThesisTopicFilterType,
  itemsPerPageRegisterTable,
} from "@/constants";
import useDebounceSearchDataTable from "@/hooks/table/useDebounceSearchDataTable";
import useSetDebounceSearchTerm from "@/hooks/table/useSetDebounceSearchTerm";
import { InternReviewData, InternReviewDataItem } from "@/types";
import { Dropdown, Table } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../../Button/IconButton";
import TableSearch from "../../Search/TableSearch";
import { tableTheme } from "../../Table/components/DataTable";
import RowInternGrade from "./RowInternGrade";
import NoResult from "../../Status/NoResult";

interface DataTableParams {
  presidentName: string;
  secretaryName: string;
  memberName: string;
  isEditTable: boolean;
  dataTable: InternReviewDataItem[];
  isOnlyView?: boolean;

  onClickEditTable: () => void;
  onSaveEditTable: (updatedData: any) => void;
}

const InternTopicGradeTable = (params: DataTableParams) => {
  const mockRoles = [
    { id: 0, value: "Chủ tịch" },
    { id: 1, value: "Thư ký" },
    { id: 2, value: "Ủy viên" },
    { id: 3, value: "Giảng viên hướng dẫn" },
    { id: 4, value: "Giảng viên phản biện" },
  ];

  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);
  const [selectedRole, setSelectedRole] = useState(-1);

  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => {
      if (selectedThesisStatus === 0) {
        return (
          dataItem.data["Chủ tịch"]?.trim() !== "" &&
          dataItem.data["Thư ký"]?.trim() !== "" &&
          dataItem.data["Ủy viên"]?.trim() !== "" &&
          dataItem.data["Điểm tổng"]?.trim() !== ""
        );
      } else if (selectedThesisStatus === 1) {
        return !(
          dataItem.data["Chủ tịch"]?.trim() !== "" &&
          dataItem.data["Thư ký"]?.trim() !== "" &&
          dataItem.data["Ủy viên"]?.trim() !== "" &&
          dataItem.data["Điểm tổng"]?.trim() !== ""
        );
      } else return dataItem;
    });
  }, [params.dataTable, selectedThesisStatus, selectedRole]);

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
        (local) => local.data.MSSV === item.data.MSSV
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
    <>
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
                        : "Bộ lọc đề tài"
                    }`}
                    onClick={() => {}}
                    iconRight={"/assets/icons/chevron-down.svg"}
                    bgColor="bg-white"
                    textColor="text-black"
                    border
                    otherClasses="mr-3"
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

      {dataTable.length === 0 ||
      dataTable.length === 0 ||
      (currentItems.length > 0 && filteredDataTable.length === 0) ? (
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

              {Object.keys(params.dataTable[0].data || {}).map((key, index) => {
                if (key === "Chủ tịch")
                  return (
                    <Table.HeadCell
                      key={`${key}_${index}`}
                      theme={tableTheme?.head?.cell}
                      className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                    >
                      <div>{key}</div>
                      <div>{params.presidentName}</div>
                    </Table.HeadCell>
                  );
                if (key === "Thư ký")
                  return (
                    <Table.HeadCell
                      key={`${key}_${index}`}
                      theme={tableTheme?.head?.cell}
                      className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                    >
                      <div>{key}</div>
                      <div>{params.secretaryName}</div>
                    </Table.HeadCell>
                  );
                if (key === "Ủy viên")
                  return (
                    <Table.HeadCell
                      key={`${key}_${index}`}
                      theme={tableTheme?.head?.cell}
                      className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                    >
                      <div>{key}</div>
                      <div>{params.memberName}</div>
                    </Table.HeadCell>
                  );
                return (
                  <Table.HeadCell
                    key={`${key}_${index}`}
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
              {filteredDataTable.map((dataItem, index) => {
                var valueUniqueInput = dataItem.data.MSSV;
                return (
                  <RowInternGrade
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
                  />
                );
              })}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default InternTopicGradeTable;
