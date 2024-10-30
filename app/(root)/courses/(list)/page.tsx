"use client";
import CoursesDataTable from "@/components/shared/Table/UnicoreTable/CoursesDataTable";
import React, { useState } from "react";
import IconButton from "@/components/shared/IconButton";
import Image from "next/image";
import { DetailFilter, FilterType } from "@/constants";
import { Dropdown } from "flowbite-react";
import TableSearch from "@/components/shared/search/TableSearch";

const Courses = () => {
  const [isImport, setIsImport] = useState(false);
  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mb-3">
            <IconButton
              text="Import danh sách lớp mới"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>
          <div className="flex justify-end gap-4 mb-3 items-center">
            <p className="italic text-sm">* Học kỳ hiện tại: HK1, năm 2024</p>
          </div>
          <div className="flex gap-2 w-full mb-4">
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
                const typeFilter = FilterType.DetailFilter;

                switch (item) {
                  case "Semester":
                    text = "Học kỳ";
                    width = "w-[15%]";
                    dataDropdown = [1, 2, 3];

                    // searchTermDropdown = searchTermSemesterFilter;
                    // setSearchTermDropdown = (value) =>
                    //   setSearchTermSemesterFilter(value);

                    // handleClickFilter = (i) => {
                    //   if (i === semesterFilterSelected) {
                    //     setSemesterFilterSelected(0);
                    //   } else setSemesterFilterSelected(i);
                    // };
                    // checkIsActive = (i) => {
                    //   return i === semesterFilterSelected;
                    // };
                    // checkIsShowFilterIcon = (i) => {
                    //   return semesterFilterSelected !== 0
                    //     ? "/assets/icons/filter_active.svg"
                    //     : undefined;
                    // };

                    break;
                  case "Year":
                    text = "Năm học";
                    width = "w-[15%]";

                    dataDropdown = [2015, 2016, 2017];
                    // searchTermDropdown = searchTermYearFilter;
                    // setSearchTermDropdown = (value) =>
                    //   setSearchTermYearFilter(value);

                    // handleClickFilter = (i) => {
                    //   if (i === yearFilterSelected) {
                    //     setYearFilterSelected(0);
                    //   } else setYearFilterSelected(i);
                    // };
                    // checkIsActive = (i) => {
                    //   return i === yearFilterSelected;
                    // };
                    // checkIsShowFilterIcon = (i) => {
                    //   return yearFilterSelected !== 0
                    //     ? "/assets/icons/filter_active.svg"
                    //     : undefined;
                    // };
                    break;
                  case "Subject":
                    text = "Môn học";
                    width = "w-[35%]";

                    dataDropdown = [
                      "Lập trình hướng đối tượng",
                      "Nhập môn lập trình",
                      "Nhập môn ứng dụng đi dộng",
                    ];
                    // searchTermDropdown = searchTermSubjectFilter;
                    // setSearchTermDropdown = (value) =>
                    //   setSearchTermSubjectFilter(value);

                    // handleClickFilter = (i) => {
                    //   if (i === subjectFilterSelected) {
                    //     setSubjectFilterSelected("");
                    //   } else setSubjectFilterSelected(i);
                    // };
                    // checkIsActive = (i) => {
                    //   return i === subjectFilterSelected;
                    // };
                    // checkIsShowFilterIcon = (i) => {
                    //   return subjectFilterSelected !== ""
                    //     ? "/assets/icons/filter_active.svg"
                    //     : undefined;
                    // };
                    break;
                  case "Teacher":
                    text = "Giảng viên";
                    width = "w-[35%]";

                    dataDropdown = [
                      "Huỳnh Hồ Thị Mộng Trinh",
                      "Huỳnh Tuấn Anh",
                      "Nguyễn Trịnh Đông",
                    ];
                    // searchTermDropdown = searchTermTeacherFilter;
                    // setSearchTermDropdown = (value) =>
                    //   setSearchTermTeacherFilter(value);

                    // handleClickFilter = (i) => {
                    //   if (i === teacherFilterSelected) {
                    //     setTeacherFilterSelected("");
                    //   } else setTeacherFilterSelected(i);
                    // };
                    // checkIsActive = (i) => {
                    //   return i === teacherFilterSelected;
                    // };
                    // checkIsShowFilterIcon = (i) => {
                    //   return teacherFilterSelected !== ""
                    //     ? "/assets/icons/filter_active.svg"
                    //     : undefined;
                    // };
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
        </div>
      ) : (
        <>
          <div
            className="flex justify-start mt-4 mb-6 text-sm cursor-pointer"
            onClick={() => {
              setIsImport(false);
            }}
          >
            <Image
              src="/assets/icons/chevron-left-table.svg"
              alt="previous"
              width={21}
              height={21}
              className="cursor-pointer mr-2"
            />
            <p>Quay lại danh sách lớp học</p>
          </div>

          <CoursesDataTable />
        </>
      )}
    </>
  );
};

export default Courses;
