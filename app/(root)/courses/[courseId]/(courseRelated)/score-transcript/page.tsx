"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ScoreColumnDetailPage from "@/components/shared/ScoreTranscript/ScoreColumnDetailPage";
import TableSearch from "@/components/shared/Search/TableSearch";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import {
  mockDataScoreTranscript,
  mockGradeColumnPercent,
  mockSubCoursesOfCourseScoreTranscript,
} from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const ScoreTranscript = () => {
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [isEditTable, setIsEditTable] = useState(false);
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] = useState(false);

 

  return (
    <>
      {isViewDetailGradeColumn ? (
        <ScoreColumnDetailPage
          onClickPrev={() => {
            setIsViewDetailGradeColumn(false);
          }}
        />
      ) : (
        <>
          <div
            className="
          mt-6 mb-10 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
          >
            {/* Search & Filter */}
            <div className="flex justify-start ml-10 w-1/2 items-center gap-4">
              {/* //!: API tên lớp */}
              <p className="inline-flex justify-start text-sm whitespace-nowrap">
                Xem bảng điểm của lớp:
                <span className="ml-2 font-semibold">
                  Nhập môn ứng dụng di động
                </span>
              </p>

              <Dropdown
                className="z-30 rounded-lg"
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text={`${selectedCourse !== -1
                          ? mockSubCoursesOfCourseScoreTranscript[
                            selectedCourse - 1
                          ].value
                          : "Chọn lớp"
                        }`}
                      onClick={() => { }}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                    />
                  </div>
                )}
              >
                <TableSearch
                  setSearchTerm={() => { }}
                  searchTerm={""}
                  otherClasses="p-2"
                />
                <div className="scroll-container scroll-container-dropdown-content">
                  {mockSubCoursesOfCourseScoreTranscript.map(
                    (course: any, index) => (
                      <Dropdown.Item
                        key={`${course}_${index}`}
                        onClick={() => {
                          if (selectedCourse === course.id) {
                            setSelectedCourse(-1);
                          } else {
                            setSelectedCourse(course.id);
                          }
                        }}
                      >
                        <div className="flex justify-between w-full gap-4">
                          <p className="text-left line-clamp-1">
                            {course.value}
                          </p>
                          {selectedCourse === course.id ? (
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
                    )
                  )}
                </div>
              </Dropdown>
            </div>

            {/* Create announcement */}
            <div className="flex gap-2">
              {/* <IconButton
                text="Chỉnh sửa hệ số điểm"
                onClick={() => {
                  setIsEditGradeColumn(true);
                }}
              /> */}
              <IconButton text="Xuất file điểm" green />
            </div>
          </div>

          {/* //TODO: BÀI TẬP */}
          <ScoreTranscriptTable
            isEditTable={isEditTable}
            isMultipleDelete={false}
            dataTable={mockDataScoreTranscript}
            dataGradeColumnPercent={mockGradeColumnPercent}
            viewDetailGradeColumn={() => {
              setIsViewDetailGradeColumn(true);
            }}
          />
        </>
      )}

    </>
  );
};

export default ScoreTranscript;
