"use client";
import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import IconButton from "@/components/shared/Button/IconButton";
import { DetailFilter, FilterType } from "@/constants";
import Image from "next/image";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import Link from "next/link";
import CourseItem from "@/components/courses/CourseItem";

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
import { useRouter } from "next/navigation";
import CourseItemDialog from "@/components/courses/CourseItemDialog";
import TableSearch from "@/components/shared/Search/TableSearch";

const JoinedCourses = () => {
  const mockCourses = [
    {
      id: "SE114.N21.PMCL",
      name: "Nhập môn ứng dụng di động",
      semester: "HK1/2024",
      teachers: "Trịnh Văn A, Nguyễn Văn H, +1",
      subCourses: [
        {
          id: "SE114.N21.PMCL.1",
          teacher: "Trịnh Văn A",
        },
        {
          id: "SE114.N21.PMCL.2",
          teacher: "Nguyễn Văn H",
        },
        {
          id: "SE114.N21.PMCL.3",
          teacher: "Nguyễn Hoàng Linh",
        },
      ],
    },
    {
      id: "SE100.N23.PMCL",
      name: "Phương pháp phát triển phần mềm hướng đối tượng",
      semester: "HK2/2024",
      teachers: "Nguyễn Hoàng Linh, Nguyễn Văn H",
      subCourses: [
        {
          id: "SE114.N23.PMCL.1",
          teacher: "Trịnh Văn A",
        },
        {
          id: "SE114.N23.PMCL.2",
          teacher: "Trịnh Văn A",
        },
      ],
    },
    {
      id: "SE502.N21",
      name: "Đồ án 1",
      semester: "HK1/2024",
      teachers: "Nguyễn Hoàng Linh, Lê Thành Lộc",
      subCourses: [],
    },
  ];

  const [currentCourseId, setCurrentCourseId] = useState("");

  const router = useRouter();

  const getCourseData = (idCourse: string) => {
    return mockCourses.find((item) => item.id === idCourse);
  };

  return (
    <>
      <div className="flex w-full gap-2 mb-8">
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

                break;
              case "Year":
                text = "Năm học";
                width = "w-[15%]";

                dataDropdown = [2015, 2016, 2017];

                break;
              case "Subject":
                text = "Môn học";
                width = "w-[35%]";

                dataDropdown = [
                  "Lập trình hướng đối tượng",
                  "Nhập môn lập trình",
                  "Nhập môn ứng dụng đi dộng",
                ];
                undefined;
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

                break;
              default:
                width = "";
                break;
            }

            return (
              <div key={item} className={`${width}`}>
                <Dropdown
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

      <div className="flex gap-2">
        {mockCourses.map((item, index) => (
          <div
            key={item.id}
            className="relative"
            onClick={() => {
              if (item.subCourses.length > 0) {
                setCurrentCourseId(item.id);
              } else {
                router.push(`/courses/${item.id}`);
              }
            }}
          >
            <CourseItem
              key={item.id}
              id={item.id}
              name={item.name}
              semester={item.semester}
              teachers={item.teachers}
            />
            <div className="absolute right-0 top-0">
              <MoreButtonCourseItem handleEdit={() => {}} />
            </div>
          </div>
        ))}
      </div>

      {currentCourseId != "" && getCourseData(currentCourseId) ? (
        <AlertDialog open={currentCourseId !== ""}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {currentCourseId}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {getCourseData(currentCourseId)?.name}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {
              <div className="flex flex-wrap gap-2">
                {getCourseData(currentCourseId)?.subCourses.map(
                  (item, index) => (
                    <div key={item.id} className="relative w-[48%]">
                      <Link
                        href={`/courses/${
                          getCourseData(currentCourseId)?.subCourses[index].id
                        }`}
                      >
                        <CourseItemDialog
                          key={item.id}
                          id={item.id}
                          teacher={item.teacher}
                        />
                      </Link>
                      <div className="absolute right-0 top-0">
                        <MoreButtonCourseItem handleEdit={() => {}} />
                      </div>
                    </div>
                  )
                )}
              </div>
            }
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setCurrentCourseId("");
                  // params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Đóng
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default JoinedCourses;
