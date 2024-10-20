"use client";

import { CustomFlowbiteTheme, Dropdown, Table } from "flowbite-react";
import Row from "./Row";
import { CourseDataItem, SubjectDataItem } from "@/types";
import IconButton from "../../IconButton";
import { useState, useEffect, useMemo } from "react";
import { DetailFilter, FilterType } from "@/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import NoResult from "../../NoResult";
import TableSearch from "../../search/TableSearch";
import { normalizeSearchItem } from "@/lib/utils";
import Image from "next/image";
import useSetDebounceSearchTerm from "@/hooks/useSetDebounceSearchTerm";
import useDebounceSearch from "@/hooks/useDebounceSearchDropdown";
import useDebounceSearchDataTable from "@/hooks/useDebounceSearchDataTable";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
  onClickMultipleDelete?: () => void;
  onClickDelete?: () => void;
  onClickGetOut?: () => void;
  dataTable:
    | CourseDataItem[]
    | SubjectDataItem[]
    | (CourseDataItem | SubjectDataItem)[];
}

const DataTable = (params: DataTableParams) => {


  // local dataTable sử dụng để edit lại data import hoặc PATCH API
  const [localDataTable, setLocalDataTable] = useState(params.dataTable);

  const [typeFilter, setTypeFilter] = useState(FilterType.None);
  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [isShowDialog, setIsShowDialog] = useState(false);

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] = useState<
    (CourseDataItem | SubjectDataItem)[]
  >(params.dataTable);

  useSetDebounceSearchTerm(setDebouncedSearchTerm, searchTerm);
  useDebounceSearchDataTable(
    debouncedSearchTerm,
    setFilteredDataTable,
    params.dataTable
  );

  // FILTER
  const [semesterFilterSelected, setSemesterFilterSelected] = useState(0);
  const [yearFilterSelected, setYearFilterSelected] = useState(0);
  const [subjectFilterSelected, setSubjectFilterSelected] = useState("");
  const [teacherFilterSelected, setTeacherFilterSelected] = useState("");

  // Sử dụng useMemo để tạo các giá trị chỉ một lần khi render component
  const { semesterValues, yearValues, subjectValues, teacherValues } =
    useMemo(() => {
      const semesterSet: Set<number> = new Set();
      const yearSet: Set<number> = new Set();
      const subjectSet: Set<string> = new Set();
      const teacherSet: Set<string> = new Set();

      params.dataTable.forEach((item) => {
        semesterSet.add(Number(item.data["Học kỳ"]));
        yearSet.add(item.data["Năm học"]);

        if (item.type === "course") {
          subjectSet.add((item as CourseDataItem).data["Tên môn học"]);

          (item as CourseDataItem).data["Tên GV"]
            .split(/\r\n|\n/)
            .forEach((name) => {
              teacherSet.add(name);
            });
        }
      });

      return {
        semesterValues: Array.from(semesterSet).sort((a, b) => a - b),
        yearValues: Array.from(yearSet).sort((a, b) => a - b),
        subjectValues: Array.from(subjectSet),
        teacherValues: Array.from(teacherSet),
      };
    }, [params.dataTable]); // Chỉ tính toán lại khi params.dataTable thay đổi

  const cancleDetailFilter = () => {
    setSemesterFilterSelected(0);
    setYearFilterSelected(0);
    setSubjectFilterSelected("");
    setTeacherFilterSelected("");
  };

  useEffect(() => {
    //  APPLY FILTER

    let filteredData = params.dataTable;

    if (semesterFilterSelected !== 0) {
      filteredData = filteredData.filter((dataItem) => {
        return dataItem.data["Học kỳ"]
          .toString()
          .includes(semesterFilterSelected.toString());
      });
    }

    if (yearFilterSelected !== 0) {
      filteredData = filteredData.filter((dataItem: any) => {
        return dataItem.data["Năm học"]
          .toString()
          .includes(yearFilterSelected.toString());
      });
    }

    if (subjectFilterSelected !== "") {
      filteredData = filteredData.filter((dataItem) => {
        if (dataItem.type === "course") {
          return (dataItem as CourseDataItem).data["Tên môn học"].includes(
            subjectFilterSelected
          );
        }
      });
    }

    if (teacherFilterSelected !== "") {
      filteredData = filteredData.filter((dataItem) => {
        if (dataItem.type === "course") {
          return (dataItem as CourseDataItem).data["Tên GV"].includes(
            teacherFilterSelected
          );
        }
      });
    }

    setFilteredDataTable(filteredData);
  }, [
    semesterFilterSelected,
    yearFilterSelected,
    subjectFilterSelected,
    teacherFilterSelected,
  ]);

  // SEARCH IN EACH DETAIL FILTER

  // semester
  const [searchTermSemesterFilter, setSearchTermSemesterFilter] = useState("");
  const [
    debouncedSearchTermSemesterFilter,
    setDebouncedSearchTermSemesterFilter,
  ] = useState(searchTermSemesterFilter);
  const [filteredSemesterValues, setFilteredSemesterValues] =
    useState<number[]>(semesterValues);

  useSetDebounceSearchTerm(
    setDebouncedSearchTermSemesterFilter,
    searchTermSemesterFilter
  );

  useDebounceSearch(
    debouncedSearchTermSemesterFilter,
    setFilteredSemesterValues,
    semesterValues
  );

  // year
  const [searchTermYearFilter, setSearchTermYearFilter] = useState("");
  const [debouncedSearchTermYearFilter, setDebouncedSearchTermYearFilter] =
    useState(searchTermYearFilter);
  const [filteredYearValues, setFilteredYearValues] =
    useState<number[]>(yearValues);

  useSetDebounceSearchTerm(
    setDebouncedSearchTermYearFilter,
    searchTermYearFilter
  );

  useDebounceSearch(
    debouncedSearchTermYearFilter,
    setFilteredYearValues,
    yearValues
  );

  // subject
  const [searchTermSubjectFilter, setSearchTermSubjectFilter] = useState("");
  const [
    debouncedSearchTermSubjectFilter,
    setDebouncedSearchTermSubjectFilter,
  ] = useState(searchTermSubjectFilter);
  const [filteredSubjectValues, setFilteredSubjectValues] =
    useState<string[]>(subjectValues);

  useSetDebounceSearchTerm(
    setDebouncedSearchTermSubjectFilter,
    searchTermSubjectFilter
  );

  useDebounceSearch(
    debouncedSearchTermSubjectFilter,
    setFilteredSubjectValues,
    subjectValues
  );

  // teacher
  const [searchTermTeacherFilter, setSearchTermTeacherFilter] = useState("");
  const [
    debouncedSearchTermTeacherFilter,
    setDebouncedSearchTermTeacherFilter,
  ] = useState(searchTermTeacherFilter);
  const [filteredTeacherValues, setFilteredTeacherValues] =
    useState<string[]>(teacherValues);

  useSetDebounceSearchTerm(
    setDebouncedSearchTermTeacherFilter,
    searchTermTeacherFilter
  );

  useDebounceSearch(
    debouncedSearchTermTeacherFilter,
    setFilteredTeacherValues,
    teacherValues
  );

  // FUNCTION
  const handleChooseFilter = (type: FilterType) => {
    setTypeFilter(type);
    var sortedNewerDataTable = [] as (CourseDataItem | SubjectDataItem)[];

    sortedNewerDataTable = sortDataTable(params.dataTable, type);

    setFilteredDataTable(sortedNewerDataTable);
  };

  const sortDataTable = (
    data:
      | CourseDataItem[]
      | SubjectDataItem[]
      | (CourseDataItem | SubjectDataItem)[],
    sortOrder: FilterType
  ) => {
    if (sortOrder === FilterType.None) {
      return data.sort((a, b) => {
        const noA = parseInt(a.STT);
        const noB = parseInt(b.STT);
        return noA - noB;
      });
    } else if (sortOrder === FilterType.DetailFilter) {
      return data.sort((a, b) => {
        const noA = parseInt(a.STT);
        const noB = parseInt(b.STT);
        return noA - noB;
      });
    } else {
      return data.sort((a, b) => {
        const yearA = a.data["Năm học"];
        const yearB = b.data["Năm học"];

        // Xác định thứ tự sắp xếp dựa trên sortOrder
        const orderMultiplier = sortOrder === FilterType.SortNewer ? 1 : -1;

        // So sánh năm học
        if (yearA !== yearB) {
          return (yearB - yearA) * orderMultiplier;
        }

        // Nếu năm học bằng nhau, so sánh học kỳ
        const semesterA = a.data["Học kỳ"] as number;
        const semesterB = b.data["Học kỳ"] as number;

        return (semesterB - semesterA) * orderMultiplier;
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 p-4">
        {/* ACTION VỚI TABLE */}
        <div className="w-full md:w-1/2 mr-3">
          <TableSearch
            setSearchTerm={(value) => setSearchTerm(value)}
            searchTerm={searchTerm}
          />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end flex-shrink-0">
          <div className="flex gap-2 items-center w-full md:w-auto">
            {params.isEditTable || params.isMultipleDelete ? (
              <></>
            ) : (
              <IconButton
                text="Tạo lớp học"
                onClick={() => {}}
                iconLeft={"/assets/icons/add.svg"}
              />
            )}

            {params.isEditTable ? (
              <IconButton text="Lưu" onClick={() => {
                params.onSaveEditTable && params.onSaveEditTable(localDataTable)
              }} />
            ) : params.isMultipleDelete ? (
              <>
                <p className="text-sm font-medium">
                  Đã chọn:
                  <span className="font-semibold">
                    {` ${itemsSelected.length}`}
                  </span>
                </p>
                <IconButton
                  text="Xóa"
                  onClick={() => {
                    setIsShowDialog(true);
                  }}
                  bgColor="bg-danger"
                />
                <IconButton
                  text="Thoát"
                  onClick={() => {
                    params.onClickGetOut && params.onClickGetOut();
                  }}
                  bgColor="bg-gray-500"
                />
              </>
            ) : (
              <Dropdown
                className="z-30 rounded-lg"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text="Hành động"
                      onClick={() => {}}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                    />
                  </div>
                )}
              >
                <Dropdown.Item onClick={params.onClickEditTable}>
                  Chỉnh sửa
                </Dropdown.Item>

                <Dropdown.Item onClick={params.onClickMultipleDelete}>
                  Xóa nhiều
                </Dropdown.Item>
              </Dropdown>
            )}

            {params.isEditTable || params.isMultipleDelete ? (
              <></>
            ) : (
              <Dropdown
                className="z-30 rounded-lg"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text="Bộ lọc"
                      iconLeft={
                        typeFilter === FilterType.None
                          ? "/assets/icons/filter.svg"
                          : "/assets/icons/filter_active.svg"
                      }
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                      isFilter={typeFilter === FilterType.DetailFilter}
                    />
                  </div>
                )}
              >
                <Dropdown.Header>
                  <span
                    onClick={() => {
                      cancleDetailFilter();
                      handleChooseFilter(FilterType.None);
                    }}
                    className="block truncate text-sm font-medium cursor-pointer"
                  >
                    Bỏ bộ lọc
                  </span>
                </Dropdown.Header>
                <ul className=" text-sm" aria-labelledby="filterDropdownButton">
                  <li
                    className="flex items-center
                  w-full
                  justify-start
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  focus:outline-none
                  "
                  >
                    <input
                      checked={typeFilter === FilterType.SortNewer}
                      id="SortNewer"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.SortNewer}
                      onChange={() => handleChooseFilter(FilterType.SortNewer)}
                      className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                    />
                    <label
                      htmlFor="SortNewer"
                      className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Mới nhất
                    </label>
                  </li>

                  <li
                    className="flex items-center
                  w-full
                  justify-start
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  focus:outline-none
                  "
                  >
                    <input
                      checked={typeFilter === FilterType.SortOlder}
                      id="SortOlder"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.SortOlder}
                      onChange={() => handleChooseFilter(FilterType.SortOlder)}
                      className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                    />
                    <label
                      htmlFor="SortOlder"
                      className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Cũ nhất
                    </label>
                  </li>
                  <li
                    className="flex items-center
                  w-full
                  justify-start
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  focus:outline-none"
                  >
                    <input
                      checked={typeFilter === FilterType.DetailFilter}
                      id="DetailFilter"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.DetailFilter}
                      onChange={
                        () => handleChooseFilter(FilterType.DetailFilter)

                        // filterDataTable
                      }
                      className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                    />
                    <label
                      htmlFor="DetailFilter"
                      className="ml-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-100"
                    >
                      Bộ lọc chi tiết
                    </label>
                  </li>
                </ul>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL FILTER typeFilter */}
      {typeFilter === FilterType.DetailFilter && (
        <div className="flex gap-2 w-full px-4 mb-4">
          {Object.values(DetailFilter)
            .filter((item) => isNaN(Number(item)))
            .map((item) => {
              let width = "";
              let text = "";
              let dataDropdown: any = [];
              let searchTermDropdown = "";
              let setSearchTermDropdown = (value: any) => {};
              let handleClickFilter = (item: any) => {};
              let checkIsActive = (item: any): boolean => {
                return false;
              };
              let checkIsShowFilterIcon = (item: any): any => {
                return "";
              };

              switch (item) {
                case "Semester":
                  text = "Học kỳ";
                  width = "w-[15%]";
                  dataDropdown = filteredSemesterValues;

                  searchTermDropdown = searchTermSemesterFilter;
                  setSearchTermDropdown = (value) =>
                    setSearchTermSemesterFilter(value);

                  handleClickFilter = (i) => {
                    if (i === semesterFilterSelected) {
                      setSemesterFilterSelected(0);
                    } else setSemesterFilterSelected(i);
                  };
                  checkIsActive = (i) => {
                    return i === semesterFilterSelected;
                  };
                  checkIsShowFilterIcon = (i) => {
                    return semesterFilterSelected !== 0
                      ? "/assets/icons/filter_active.svg"
                      : undefined;
                  };

                  break;
                case "Year":
                  text = "Năm học";
                  width = "w-[15%]";

                  dataDropdown = filteredYearValues;
                  searchTermDropdown = searchTermYearFilter;
                  setSearchTermDropdown = (value) =>
                    setSearchTermYearFilter(value);

                  handleClickFilter = (i) => {
                    if (i === yearFilterSelected) {
                      setYearFilterSelected(0);
                    } else setYearFilterSelected(i);
                  };
                  checkIsActive = (i) => {
                    return i === yearFilterSelected;
                  };
                  checkIsShowFilterIcon = (i) => {
                    return yearFilterSelected !== 0
                      ? "/assets/icons/filter_active.svg"
                      : undefined;
                  };
                  break;
                case "Subject":
                  text = "Môn học";
                  width = "w-[35%]";

                  dataDropdown = filteredSubjectValues;
                  searchTermDropdown = searchTermSubjectFilter;
                  setSearchTermDropdown = (value) =>
                    setSearchTermSubjectFilter(value);

                  handleClickFilter = (i) => {
                    if (i === subjectFilterSelected) {
                      setSubjectFilterSelected("");
                    } else setSubjectFilterSelected(i);
                  };
                  checkIsActive = (i) => {
                    return i === subjectFilterSelected;
                  };
                  checkIsShowFilterIcon = (i) => {
                    return subjectFilterSelected !== ""
                      ? "/assets/icons/filter_active.svg"
                      : undefined;
                  };
                  break;
                case "Teacher":
                  text = "Giảng viên";
                  width = "w-[35%]";

                  dataDropdown = filteredTeacherValues;
                  searchTermDropdown = searchTermTeacherFilter;
                  setSearchTermDropdown = (value) =>
                    setSearchTermTeacherFilter(value);

                  handleClickFilter = (i) => {
                    if (i === teacherFilterSelected) {
                      setTeacherFilterSelected("");
                    } else setTeacherFilterSelected(i);
                  };
                  checkIsActive = (i) => {
                    return i === teacherFilterSelected;
                  };
                  checkIsShowFilterIcon = (i) => {
                    return teacherFilterSelected !== ""
                      ? "/assets/icons/filter_active.svg"
                      : undefined;
                  };
                  break;
                default:
                  width = "";
                  break;
              }

              return (
                <div className={`${width}`}>
                  <Dropdown
                    key={item}
                    className="z-30 rounded-lg"
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <div>
                        <IconButton
                          otherClasses="w-full"
                          text={text}
                          iconLeft={checkIsShowFilterIcon(item)}
                          iconRight={"/assets/icons/chevron-down.svg"}
                          bgColor="bg-white"
                          textColor="text-black"
                          border
                          isFilter={typeFilter === FilterType.DetailFilter}
                        />
                      </div>
                    )}
                  >
                    <TableSearch
                      setSearchTerm={setSearchTermDropdown}
                      searchTerm={searchTermDropdown}
                      otherClasses="p-2"
                    />
                    <div className="scroll-container scroll-container-dropdown-content">
                      {dataDropdown.map((item: any, index: number) => {
                        if (typeof item === "string" && item === "") {
                          return <></>;
                        }
                        return (
                          <Dropdown.Item
                            key={`${item}_${index}`}
                            onClick={() => {
                              handleClickFilter(item);
                            }}
                          >
                            <div className="flex justify-between w-full">
                              <p className="w-[80%] text-left line-clamp-1">
                                {item}
                              </p>
                              {checkIsActive(item) && (
                                <Image
                                  src="/assets/icons/check.svg"
                                  alt="search"
                                  width={21}
                                  height={21}
                                  className="cursor-pointer mr-2"
                                />
                              )}
                            </div>
                          </Dropdown.Item>
                        );
                      })}
                    </div>
                  </Dropdown>
                </div>
              );
            })}
        </div>
      )}

      {/* TABLE */}
      {params.dataTable.length > 0 && filteredDataTable.length === 0 ? (
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
              className="bg-gray border-b uppercase sticky top-0 z-10"
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

              {Object.keys(filteredDataTable[0]?.data || {}).map((key) => (
                <Table.HeadCell
                  theme={tableTheme?.head?.cell}
                  key={key}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {key}
                </Table.HeadCell>
              ))}
            </Table.Head>

            {/* BODY */}
            <Table.Body className="divide-y text-left">
              {filteredDataTable.map((dataItem) => (
                <Row
                  key={dataItem.STT}
                  dataItem={dataItem}
                  isEditTable={params.isEditTable}
                  isMultipleDelete={params.isMultipleDelete}
                  onClickCheckBox={(item: string) => {
                    setItemsSelected((prev) => [...prev, item]);
                  }}
                  onChangeRow={(updatedDataItem) => {
                    var updatedDataTable = localDataTable.map((item) => {
                      if (item.STT === updatedDataItem.STT) {
                        return updatedDataItem;
                      } else {
                        return item;
                      }
                    });
                    
                    setLocalDataTable(updatedDataTable)
                  }}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* ALERT CONFIRM */}
      {isShowDialog ? (
        <AlertDialog open={isShowDialog}>
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
                  setIsShowDialog(false);
                  params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsShowDialog(false);
                  params.onClickGetOut && params.onClickGetOut();
                  params.onClickDelete && params.onClickDelete();
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

export default DataTable;

export const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "min-w-full text-center rounded-lg text-sm text-secondary-500",
    shadow:
      "absolute bg-background-secondary dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative ",
  },
  body: {
    base: "group/body bg-background-secondary",
    cell: {
      base: `text-center group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg p-2 sm:p-3 md:p-4 font-normal text-secondary-900 `,
    },
  },
  head: {
    base: " text-center group/head bg-background-secondary text-xs border-b-2 border-secondary-200 uppercase text-secondary-700",
    cell: {
      base: "text-center  group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg p-2 sm:p-3 md:p-4 sm:p-2 md:p-4",
    },
  },
  row: {
    base: "text-center group/row bg-background-secondary",
    hovered: "hover:bg-light-800",
    striped: "odd:bg-background-secondary even:bg-background-secondary ",
  },
};
