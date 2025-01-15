"use client";

import CourseItem from "@/components/courses/CourseItem";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import DetailFilterComponentScore from "@/components/shared/DetailFilterComponentScore";
import LoadingComponent from "@/components/shared/LoadingComponent";
import ScoreColumnDetailPage from "@/components/shared/ScoreTranscript/ScoreColumnDetailPage";
import NoResult from "@/components/shared/Status/NoResult";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import { ListCourseColors } from "@/constants";
import {
  mockCourses,
  mockDataScoreTranscript,
  mockGradeColumnPercent,
  mockSubCoursesOfCourseScoreTranscript,
} from "@/mocks";
import { fetchCourses } from "@/services/courseServices";
import { ICourseResponseData } from "@/types/entity/Course";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ScoreTranscript = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [currentCourseId, setCurrentCourseId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<ICourseResponseData[]>([]);

  useEffect(() => {
    fetchCourses()
      .then((data: ICourseResponseData[]) => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

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
          {currentCourseId !== "" ? (
            <>
              <BackToPrev
                text="Quay lại danh sách lớp"
                onClickPrev={() => {
                  setCurrentCourseId("");
                }}
              />
              <div className="flex justify-start ml-10 w-1/2 items-center gap-4">
                {/* //!: API tên lớp */}
                <p className="inline-flex justify-start text-sm whitespace-nowrap">
                  Xem bảng điểm của lớp:
                  <span className="ml-2 font-semibold">
                    Nhập môn ứng dụng đi động
                  </span>
                </p>

                <Dropdown
                  className="z-30 rounded-lg"
                  label=""
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <div>
                      <IconButton
                        text={`${
                          selectedCourse !== -1
                            ? mockSubCoursesOfCourseScoreTranscript[
                                selectedCourse - 1
                              ].value
                            : "Chọn lớp"
                        }`}
                        onClick={() => {}}
                        iconRight={"/assets/icons/chevron-down.svg"}
                        bgColor="bg-white"
                        textColor="text-black"
                        border
                      />
                    </div>
                  )}
                >
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

              <div className="flex justify-end gap-2 mt-4 mb-2">
                <IconButton text="Xuất file điểm" green />
              </div>

              {/* //TODO: BÀI TẬP */}
              <ScoreTranscriptTable
                dataTable={mockDataScoreTranscript}
                dataGradeColumnPercent={mockGradeColumnPercent}
                viewDetailGradeColumn={() => {
                  setIsViewDetailGradeColumn(true);
                }}
              />
            </>
          ) : (
            <>
              <div
                className="
            mt-6  mb-8 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
              >
                <div className="items-center flex w-full gap-2">
                  <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
                    Xem bảng điểm lớp:
                  </p>

                  <DetailFilterComponentScore />
                </div>
              </div>

              {/* <div className="flex gap-4 flex-wrap">
                {mockCourses.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative"
                    onClick={() => {
                      setCurrentCourseId(item.id);
                    }}
                  >
                    <CourseItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      semester={item.semester}
                      year={item.semester}
                      teachers={item.teachers}
                      color={
                        ListCourseColors.find(
                          (course) => course.type === item.type
                        )?.color || "#ffffff"
                      }
                    />
                    <div className="absolute right-0 top-0">
                      <MoreButtonCourseItem handleEdit={() => {}} />
                    </div>
                  </div>
                ))}
              </div> */}

              {isLoading ? (
                <LoadingComponent />
              ) : courses ? (
                <div className="flex gap-4 flex-wrap">
                  {courses.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative"
                      onClick={() => {
                        // if (item.subclasses.length > 1) {
                        //   //? Lưu code, id vào store
                        //   sClassId.set(item.id);
                        //   setCurrentCourseId(item.code);
                        // } else {
                        //   router.push(`/courses/${item.code}`);
                        //   //? Lưu code, id vào store
                        //   sClassId.set(item.id);
                        //   sClassCode.set(item.subclasses[0].code);
                        // }
                        setCurrentCourseId("SE114.N21.PMCL");
                      }}
                    >
                      <CourseItem
                        key={item.id}
                        id={item.code}
                        name={item.subject_metadata.name}
                        semester={item.semester.toString()}
                        year={item.semester.toString()}
                        teachers={item.subclasses
                          .map((item) => item.teacher_codes)
                          .filter(
                            (item) =>
                              item &&
                              !(
                                item.length === 0 ||
                                (item.length === 1 && item[0] === "")
                              )
                          )
                          .join(", ")}
                        color={
                          ListCourseColors.find(
                            (course) => course.type === item.type
                          )?.color || "#e8f7ff"
                        } // các lớp như LT, HT1, HT2... đều là lớp thường nên màu vàng
                      />
                      <div className="absolute right-0 top-0">
                        <MoreButtonCourseItem handleEdit={() => {}} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <NoResult
                  title="Không có dữ liệu lớp học!"
                  description="🚀 Thử tải lại trang để xem dữ liệu lớp học."
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ScoreTranscript;
