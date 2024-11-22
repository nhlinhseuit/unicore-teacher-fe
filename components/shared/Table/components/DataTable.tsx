"use client";

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
import {
  DataTableType,
  DetailFilter,
  FilterType,
  itemsPerPage,
} from "@/constants";
import useDebounceSearchDataTable from "@/hooks/table/useDebounceSearchDataTable";
import useDetailFilter from "@/hooks/table/useDetailFilter";
import useSetDebounceSearchTerm from "@/hooks/table/useSetDebounceSearchTerm";
import {
  CourseDataItem,
  StudentDataItem,
  SubjectDataItem,
  TeacherDataItem,
} from "@/types";
import { CustomFlowbiteTheme, Dropdown, Table } from "flowbite-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import IconButton from "../../Button/IconButton";
import TableSearch from "../../Search/TableSearch";
import NoResult from "../../Status/NoResult";
import MyFooter from "./MyFooter";
import Row from "./Row";

// TODO: filteredData là để render giao diện (search, filter old new, detail filter)
// TODO: localData là để handle save (khi edit từ search, filter old new, detail filter, pagination)
// TODO: currentItems là để pagination cho dataTable (footer)

// ! KHI LÀM NÚT XÓA, THÌ CHUYỂN BIẾN DELETED = 1 => KH HIỆN TRÊN BẢNG ===> ĐỒNG NHẤT VỚI CODE HANDLE SAVE

interface DataTableParams {
  type: DataTableType;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
  onClickMultipleDelete?: () => void;
  onClickDelete?: (itemsSelected: string[]) => void;
  onClickDeleteAll?: () => void;
  onClickGetOut?: () => void;
  dataTable:
    | CourseDataItem[]
    | SubjectDataItem[]
    | StudentDataItem[]
    | TeacherDataItem[]
    | (CourseDataItem | SubjectDataItem | StudentDataItem | TeacherDataItem)[];
}

const DataTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const saveDataTable = () => {
    // ? HÀM LƯU ĐỐI VỚI PAGINATION
    // // Kết hợp localDataTable với dataTable
    // const updatedDataTable = [
    //   ...dataTable.slice(
    //     0,
    //     (currentPage - 1) * itemsPerPage
    //   ), // Các phần trước currentItems
    //   ...localDataTable, // Dữ liệu đã chỉnh sửa (currentItems)
    //   ...dataTable.slice(currentPage * itemsPerPage), // Các phần sau currentItems
    // ];
    // params.onSaveEditTable &&
    //   params.onSaveEditTable(updatedDataTable);

    // ? HÀM LƯU ĐỐI VỚI FILTERDATA
    // params.onSaveEditTable &&
    //   params.onSaveEditTable(updatedDataTable);

    // * HÀM LƯU GỘP CHUNG

    const updatedDataTable = dataTable.map((item) => {
      // Tìm item tương ứng trong localDataTable dựa vào STT (hoặc một identifier khác)
      const localItem = localDataTable.find((local) => local.STT === item.STT);

      // * Nếu tìm thấy, cập nhật giá trị bằng localItem, ngược lại giữ nguyên item
      // * Trải item và localitem ra, nếu trùng nhau thì localItem ghi đè
      return localItem ? { ...item, ...localItem } : item;
    });

    if (params.onSaveEditTable) {
      params.onSaveEditTable(updatedDataTable);
    }
  };

  // ! FOOTER
  const [isShowFooter, setIsShowFooter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = dataTable.length;

  // Tính toán các items hiển thị dựa trên currentPage
  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [dataTable, currentPage]); // * Khi dataTable thì currentItems cũng cập nhật để update dữ liệu kh bị cũ

  // * Local dataTable sử dụng để edit lại data import hoặc PATCH API
  const [localDataTable, setLocalDataTable] = useState(currentItems);

  const applyFilter = () => {
    let filteredData;

    if (
      !(
        semesterFilterSelected == 0 &&
        yearFilterSelected == 0 &&
        subjectFilterSelected == "" &&
        teacherFilterSelected == ""
      )
    ) {
      setSearchTerm("");
      filteredData = dataTable;
      setIsShowFooter(false);
    } else {
      // TODO: Nếu không có detail filter, hiển thị dữ liệu về dạng pagination (giống trong debounce search)
      filteredData = currentItems;
      setIsShowFooter(true);
      setFilteredDataTable(filteredData);
      return;
    }

    if (semesterFilterSelected !== 0) {
      filteredData = filteredData.filter((dataItem) => {
        dataItem = dataItem as CourseDataItem;
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
  };

  useEffect(() => {
    // * => (HANDLE ĐƯỢC 2 TRƯỜNG HỢP)
    // TODO. TH1: CLICK SANG TRANG MỚI -> CURRENTPAGE ĐỔI -> CURRENT ITEMS ĐỔI (KHÔNG CÓ FILTER) => APPLYFILTER VẪN HANDLE ĐƯỢC
    // TODO. TH2: ĐANG Ở DETAIL FILTER DATA, THÌ DATATABLE CẬP NHẬT -> VÀO APPLY FILTER LẠI

    applyFilter();
    // setFilteredDataTable(currentItems);
  }, [currentItems]);

  const [typeFilter, setTypeFilter] = useState(FilterType.None);
  // Bộ lọc mới - cũ
  const handleChooseFilter = (type: FilterType) => {
    if (type !== FilterType.None) setSearchTerm("");
    setTypeFilter(type);
    var sortedNewerDataTable = [] as (
      | CourseDataItem
      | SubjectDataItem
      | StudentDataItem
      | TeacherDataItem
    )[];

    sortedNewerDataTable = sortDataTable(dataTable, type);

    // lấy data mới đã sort, sau đó hiển thị bằng pagination từ trang 1
    if (currentPage != 1) setCurrentPage(1);
    var updatedDataTablePagination = sortedNewerDataTable.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setFilteredDataTable(updatedDataTablePagination);
  };

  const cancelDetailFilter = () => {
    setSemesterFilterSelected(0);
    setYearFilterSelected(0);
    setSubjectFilterSelected("");
    setTeacherFilterSelected("");
  };

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  // * DELETE MULTIPLE: 1. DELETE ALL: 2
  const [isShowDialog, setIsShowDialog] = useState(-1);

  // ! SEARCH GENERAL
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] =
    useState<
      (CourseDataItem | SubjectDataItem | StudentDataItem | TeacherDataItem)[]
    >(currentItems);

  useSetDebounceSearchTerm(setDebouncedSearchTerm, searchTerm);
  useDebounceSearchDataTable(
    debouncedSearchTerm,
    setFilteredDataTable,
    applyFilter,
    cancelDetailFilter,
    handleChooseFilter,
    dataTable,
    currentItems
  );

  // TODO Đồng bộ filteredDataTable với localDataTable khi localDataTable thay đổi
  // *
  // Biến localDataTable dùng để edit data phân trang từ data gốc
  // nên data phân trang thay đổi thì cũng update localDataTable
  // *
  useEffect(() => {
    setLocalDataTable([...filteredDataTable]);
  }, [filteredDataTable]); // Chạy mỗi khi filteredDataTable thay đổi

  // ! DETAIL FILTER
  const [semesterFilterSelected, setSemesterFilterSelected] = useState(0);
  const [yearFilterSelected, setYearFilterSelected] = useState(0);
  const [subjectFilterSelected, setSubjectFilterSelected] = useState("");
  const [teacherFilterSelected, setTeacherFilterSelected] = useState("");

  // Sử dụng useMemo để tạo các giá trị chỉ một lần khi render component
  // * subject kh co detail filter
  const { semesterValues, yearValues, subjectValues, teacherValues } =
    useMemo(() => {
      if (
        params.type === DataTableType.Subject ||
        params.type === DataTableType.Student
      ) {
        return {
          semesterValues: [],
          yearValues: [],
          subjectValues: [],
          teacherValues: [],
        };
      }

      const semesterSet: Set<number> = new Set();
      const yearSet: Set<number> = new Set();
      const subjectSet: Set<string> = new Set();
      const teacherSet: Set<string> = new Set();

      dataTable.forEach((item) => {
        item = item as CourseDataItem;
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
    }, [currentItems]); // Chỉ tính toán lại khi currentItems thay đổi

  //  ! APPLY FILTER
  useEffect(() => {
    // * Filter là filter trong dataTable
    // *
    // chỉ cần 1 trong các filter dropdown có giá trị thì tắt footer pagination
    // bật footer pagination lại nếu kh có giá trị
    // *

    applyFilter();
  }, [
    semesterFilterSelected,
    yearFilterSelected,
    subjectFilterSelected,
    teacherFilterSelected,
  ]);

  // ! SEARCH IN EACH DETAIL FILTER

  // semester
  const {
    searchTerm: searchTermSemesterFilter,
    setSearchTerm: setSearchTermSemesterFilter,
    filteredValues: filteredSemesterValues,
  } = useDetailFilter<number>(semesterValues);

  // year
  const {
    searchTerm: searchTermYearFilter,
    setSearchTerm: setSearchTermYearFilter,
    filteredValues: filteredYearValues,
  } = useDetailFilter<number>(yearValues);

  // subject
  const {
    searchTerm: searchTermSubjectFilter,
    setSearchTerm: setSearchTermSubjectFilter,
    filteredValues: filteredSubjectValues,
  } = useDetailFilter<string>(subjectValues);

  // teacher
  const {
    searchTerm: searchTermTeacherFilter,
    setSearchTerm: setSearchTermTeacherFilter,
    filteredValues: filteredTeacherValues,
  } = useDetailFilter<string>(teacherValues);

  // ! OTHERS FUNCTION

  const sortDataTable = (
    data:
      | CourseDataItem[]
      | SubjectDataItem[]
      | StudentDataItem[]
      | TeacherDataItem[]
      | (
          | CourseDataItem
          | SubjectDataItem
          | StudentDataItem
          | TeacherDataItem
        )[],
    sortOrder: FilterType
  ) => {
    if (params.type === DataTableType.Student) return [];

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
        //@ts-ignore
        const yearA = a.data["Năm học"];
        //@ts-ignore
        const yearB = b.data["Năm học"];

        // Xác định thứ tự sắp xếp dựa trên sortOrder
        const orderMultiplier = sortOrder === FilterType.SortNewer ? 1 : -1;

        // So sánh năm học
        if (yearA !== yearB) {
          return (yearB - yearA) * orderMultiplier;
        }

        // Nếu năm học bằng nhau, so sánh học kỳ
        //@ts-ignore
        const semesterA = a.data["Học kỳ"] as number;
        //@ts-ignore
        const semesterB = b.data["Học kỳ"] as number;

        return (semesterB - semesterA) * orderMultiplier;
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
        {/* ACTION VỚI TABLE */}
        <div className="w-full mr-3 md:w-1/2">
          {params.isEditTable || params.isMultipleDelete ? (
            <></>
          ) : (
            <TableSearch
              setSearchTerm={(value) => setSearchTerm(value)}
              searchTerm={searchTerm}
            />
          )}
        </div>
        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center">
          <div className="flex items-center w-full gap-2 md:w-auto">
            {params.isEditTable || params.isMultipleDelete ? (
              <></>
            ) : (
              <IconButton
                text={`Tạo ${params.type.toLowerCase()}`}
                onClick={() => {}}
                iconLeft={"/assets/icons/add.svg"}
              />
            )}

            {params.isEditTable ? (
              <IconButton text="Lưu" onClick={saveDataTable} />
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
                    setIsShowDialog(1);
                  }}
                  bgColor="bg-red"
                />
                <IconButton
                  text="Thoát"
                  onClick={() => {
                    setItemsSelected([]);
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

                <Dropdown.Item
                  onClick={() => {
                    setIsShowDialog(2);
                  }}
                >
                  Xóa tất cả
                </Dropdown.Item>
              </Dropdown>
            )}

            {params.isEditTable ||
            params.isMultipleDelete ||
            params.type === DataTableType.Student ||
            params.type === DataTableType.Teacher ? (
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
                      cancelDetailFilter();
                      handleChooseFilter(FilterType.None);
                    }}
                    className="block text-sm font-medium truncate cursor-pointer"
                  >
                    Bỏ bộ lọc
                  </span>
                </Dropdown.Header>
                <ul className="text-sm " aria-labelledby="filterDropdownButton">
                  <li className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 focus:outline-none ">
                    <input
                      checked={typeFilter === FilterType.SortNewer}
                      id="SortNewer"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.SortNewer}
                      onChange={() => handleChooseFilter(FilterType.SortNewer)}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
                    />
                    <label
                      htmlFor="SortNewer"
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-100"
                    >
                      Mới nhất
                    </label>
                  </li>

                  <li className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 focus:outline-none ">
                    <input
                      checked={typeFilter === FilterType.SortOlder}
                      id="SortOlder"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.SortOlder}
                      onChange={() => handleChooseFilter(FilterType.SortOlder)}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
                    />
                    <label
                      htmlFor="SortOlder"
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-100"
                    >
                      Cũ nhất
                    </label>
                  </li>
                  {params.type !== DataTableType.Subject ? (
                    <li className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 focus:outline-none">
                      <input
                        checked={typeFilter === FilterType.DetailFilter}
                        id="DetailFilter"
                        type="radio"
                        name="filterOptions"
                        value={FilterType.DetailFilter}
                        onChange={() =>
                          handleChooseFilter(FilterType.DetailFilter)
                        }
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
                      />
                      <label
                        htmlFor="DetailFilter"
                        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-100"
                      >
                        Bộ lọc chi tiết
                      </label>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      {/* DETAIL FILTER typeFilter */}
      {params.type !== DataTableType.Subject &&
        typeFilter === FilterType.DetailFilter && (
          <div className="flex w-full gap-2 px-4 mb-4">
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
                                    className="mr-2 cursor-pointer"
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

              {Object.keys(filteredDataTable[0]?.data || {}).map((key) => (
                <Table.HeadCell
                  key={key}
                  theme={tableTheme?.head?.cell}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {key}
                </Table.HeadCell>
              ))}
            </Table.Head>

            {/* BODY */}
            <Table.Body className="text-left divide-y">
              {filteredDataTable.map((dataItem) =>
                dataItem.isDeleted ? (
                  <></>
                ) : (
                  <Row
                    key={dataItem.STT}
                    dataItem={dataItem}
                    isHasSubCourses={
                      params.type === DataTableType.Course &&
                      dataItem.STT.toString() === "1"
                    }
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
                      setLocalDataTable((prevTable) =>
                        prevTable.map((item) =>
                          item.STT === updatedDataItem.STT
                            ? updatedDataItem
                            : item
                        )
                      );
                    }}
                    saveSingleRow={(updatedDataItem: any) => {
                      const updatedDataTable = dataTable.map((item) =>
                        item.STT === updatedDataItem.STT
                          ? updatedDataItem
                          : item
                      );

                      if (params.onSaveEditTable) {
                        params.onSaveEditTable(updatedDataTable);
                      }
                    }}
                    onClickGetOut={params.onClickGetOut}
                    deleteSingleRow={params.onClickDelete}
                  />
                )
              )}
            </Table.Body>
          </Table>
        </div>
      )}
      {/* FOOTER */}
      {!isShowFooter ||
      searchTerm !== "" ||
      params.isEditTable ||
      params.isMultipleDelete ? (
        <></>
      ) : (
        <MyFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
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
                  params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setItemsSelected([]);
                  params.onClickGetOut && params.onClickGetOut();
                  if (isShowDialog === 1) {
                    params.onClickDelete && params.onClickDelete(itemsSelected);
                  } else if (isShowDialog === 2) {
                    params.onClickDeleteAll && params.onClickDeleteAll();
                  }
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
