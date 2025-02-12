import { itemsPerPageTopicTable } from "@/constants";
import useDebounceSearchDataTable from "@/hooks/table/useDebounceSearchDataTable";
import useSetDebounceSearchTerm from "@/hooks/table/useSetDebounceSearchTerm";
import { TopicDataItem } from "@/types/entity/Topic";
import { Dropdown, Table } from "flowbite-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import IconButton from "../../Button/IconButton";
import TableSearch from "../../Search/TableSearch";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import MyFooter from "../components/MyFooter";
import RowTopicDataTable from "./RowTopicDataTable";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: TopicDataItem[];
}

const TopicDataTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const mockTeachers = [
    { id: 0, value: "Huỳnh Hồ Thị Mộng Trinh" },
    { id: 1, value: "Huỳnh Tuấn Anh" },
    { id: 2, value: "Nguyễn Thị Thanh Trúc" },
  ];

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageTopicTable,
      currentPage * itemsPerPageTopicTable
    );
  }, [dataTable, currentPage]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] = useState(currentItems);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const applyFilter = () => {
    const filterData = currentItems.filter((item) =>
      item.data["GV phụ trách"]?.includes(selectedTeacher)
    );

    console.log("filterData", filterData);

    setFilteredDataTable(filterData);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedTeacher]);

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

  return (
    <div>
      <div className="flex ml-3 mb-4">
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
                  selectedTeacher !== "" ? selectedTeacher : "Chọn giảng viên"
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
            {mockTeachers.map((course: any, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedTeacher === course.value) {
                    setSelectedTeacher("");
                  } else {
                    setSelectedTeacher(course.value);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedTeacher === course.value ? (
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

      {/* TABLE */}
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

              {Object.keys(filteredDataTable[0]?.data || {}).map(
                (key, index) => {
                  if (key === "Mã nhóm" || key === "Mã đề tài") return null;

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
                dataItem.isDeleted ? (
                  <></>
                ) : (
                  <RowTopicDataTable key={dataItem.STT} dataItem={dataItem} />
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
          itemsPerPage={itemsPerPageTopicTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

export default TopicDataTable;
