"use client";
import CourseItem from "@/components/courses/CourseItem";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import IconButton from "@/components/shared/Button/IconButton";
import { DetailFilter, FilterType } from "@/constants";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import CourseItemDialog from "@/components/courses/CourseItemDialog";
import TableSearch from "@/components/shared/Search/TableSearch";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { mockCourses } from "@/mocks";
import { useRouter } from "next/navigation";

const JoinedCourses = () => {


  const [currentCourseId, setCurrentCourseId] = useState("");

  const router = useRouter();

  const colors = [
    "#fef5e5", "#e8f7ff", "#ecf2ff", "#e6fffa", "#fdede8",
    "#f1f4f9", "#fff5e6", "#e1f7d5", "#dce5ff", "#fffae6",
    "#f0f8ff", "#e0ffff", "#e7f5e8", "#f7e4f9", "#f6f8e9"
  ];

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

      <div className="flex gap-4 flex-wrap">
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
              color={colors[index % colors.length]}
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
