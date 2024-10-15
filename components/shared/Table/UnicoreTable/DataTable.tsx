"use client";

import { CustomFlowbiteTheme, Dropdown, Table } from "flowbite-react";
import Row from "./Row";
import { CourseDataItem, SubjectDataItem } from "@/types";
import Image from "next/image";
import IconButton from "../../IconButton";
import { useState, useEffect } from "react";
import { DetailFilter, FilterType } from "@/constants";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NoResult from "../../NoResult";
import TableSearch from "../../search/TableSearch";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  onClickEditTable?: () => void;
  onSaveEditTable?: () => void;
  onClickMultipleDelete?: () => void;
  onClickDelete?: () => void;
  onClickGetOut?: () => void;
  dataTable: CourseDataItem[] | SubjectDataItem[];
}

const DataTable = (params: DataTableParams) => {
  const [typeFilter, setTypeFilter] = useState(FilterType.None);
  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] = useState<
    (CourseDataItem | SubjectDataItem)[]
  >(params.dataTable);

  const handleChooseFilter = (type: FilterType) => {
    setTypeFilter(type);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler); // Clear timeout nếu searchTerm thay đổi trong vòng 300ms
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredDataTable(params.dataTable); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu
    } else {
      const filteredData = params.dataTable.filter((dataItem) => {
        return Object.values(dataItem.data).some((value) => {
          if (typeof value === "string")
            return value
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase());
          else {
            value = value.toString();
            return value.includes(debouncedSearchTerm.toLowerCase());
          }
        });
      });
      setFilteredDataTable(filteredData);
    }
  }, [debouncedSearchTerm, params.dataTable]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 p-4">
        <div className="w-full md:w-1/2">
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
              <IconButton text="Lưu" onClick={params.onSaveEditTable} />
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
                className="z-30"
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
                className="z-30"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text="Bộ lọc"
                      onClick={() => {}}
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
                      setTypeFilter(FilterType.None);
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
                      checked={typeFilter === FilterType.Sort}
                      id="Sort"
                      type="radio"
                      name="filterOptions"
                      value={FilterType.Sort}
                      onChange={() => handleChooseFilter(FilterType.Sort)}
                      className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                    />
                    <label
                      htmlFor="Sort"
                      className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Gần nhất
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
                      onChange={() =>
                        handleChooseFilter(FilterType.DetailFilter)
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
        <div className="flex gap-2 w-full space-y-3 md:space-y-0 px-4 mb-4">
          {Object.values(DetailFilter)
            .filter((item) => isNaN(Number(item)))
            .map((item) => {
              console.log("DetailFilter", item);
              let width = "";
              let text = "";
              switch (item) {
                case "Semester":
                  text = "Học kỳ";
                  width = "w-[15%]";
                  break;
                case "Year":
                  text = "Năm học";
                  width = "w-[15%]";
                  break;

                case "Subject":
                  text = "Môn học";
                  width = "w-[35%]";
                  break;
                case "Teacher":
                  text = "Giảng viên";
                  width = "w-[35%]";
                  break;
                default:
                  width = "";
                  break;
              }

              return (
                <div className={`${width}`}>
                  <Dropdown
                    className="z-30"
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <div>
                        <IconButton
                          otherClasses="w-full"
                          text={text}
                          onClick={() => {}}
                          iconRight={"/assets/icons/chevron-down.svg"}
                          bgColor="bg-white"
                          textColor="text-black"
                          border
                          isFilter={typeFilter === FilterType.DetailFilter}
                        />
                      </div>
                    )}
                  >
                    <Dropdown.Item onClick={params.onClickEditTable}>
                      Chỉnh sửa
                    </Dropdown.Item>

                    <Dropdown.Item>Xóa nhiều</Dropdown.Item>
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
          description="💡 Bạn hãy thử tìm kiếm lại 1 từ khóa khác nhé."
        />
      ) : (
        <div className="overflow-auto max-w-full h-fit rounded-lg border-[1px] border-secondary-200">
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
                    console.log(itemsSelected);
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
