"use client";
import CoursesDataTable from "@/components/shared/Table/UnicoreTable/CoursesDataTable";
import React, { useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import IconButtonStopPropagation from "@/components/shared/Button/IconButtonStopPropagation";
import Image from "next/image";
import { DetailFilter, FilterType } from "@/constants";
import { Button, Dropdown } from "flowbite-react";
import TableSearch from "@/components/shared/Search/TableSearch";

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
          <div className="flex items-center justify-end gap-4 mb-3">
            <p className="text-sm italic">* Học kỳ hiện tại: HK1, năm 2024</p>
          </div>
          <div className="flex w-full gap-2 mb-4">
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

          {/* //TODO: TODO WITH CLASS */}
          {/* Chưa nhập ds sinh viên */}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  1
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách sinh viên cho các lớp. Nhấn vào để xem
                  danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("123123");
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2,
              </p>
            </div>
          </Dropdown>

          {/* Chưa nhập ds GV chấm GK, CK */}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  2
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách giảng viên chấm điểm thi Giữa kỳ -
                  Cuối kỳ cho các lớp. Nhấn vào để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("123123");
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2,
              </p>
            </div>
          </Dropdown>

          {/* Chưa import lịch thi tập trung Giữa kỳ - Cuối kỳ*/}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  3
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa import lịch thi tập trung Giữa kỳ - Cuối kỳ. Nhấn vào
                  để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("123123");
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
              </p>
            </div>
          </Dropdown>

          {/* Chưa nhập ds sinh viên và chia nhóm cho lớp*/}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  4
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách sinh viên và chia nhóm cho các lớp.
                  Nhấn vào để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("123123");
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
              </p>
            </div>
          </Dropdown>
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
              className="mr-2 cursor-pointer"
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
