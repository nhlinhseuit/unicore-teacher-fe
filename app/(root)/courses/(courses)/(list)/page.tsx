"use client";
import CourseItem from "@/components/courses/CourseItem";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import { useEffect, useState } from "react";

import CourseItemDialog from "@/components/courses/CourseItemDialog";
import DetailFilterComponent from "@/components/shared/DetailFilterComponent";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ListCourseColors } from "@/constants";
import { fetchCourses } from "@/services/courseServices";
import { ICourseResponseData } from "@/types/entity/Course";
import { useRouter } from "next/navigation";
import { sClassCode, sClassId } from "../(store)/courseStore";

const JoinedCourses = () => {
  const [currentCourseId, setCurrentCourseId] = useState("");

  const router = useRouter();

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

  const getCurrentCourse = () => {
    return courses.find((item) => item.code === currentCourseId);
  };

  console.log("courses", courses);

  return (
    <>
      <div className="items-center flex w-full gap-2 mb-8">
        <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
          Bộ lọc lớp:
        </p>

        <DetailFilterComponent />
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : courses ? (
        <div className="flex gap-4 flex-wrap">
          {courses.map((item, index) => (
            <div
              key={item.id}
              className="relative"
              onClick={() => {
                if (item.subclasses.length > 1) {
                  //? Lưu code, id vào store
                  sClassId.set(item.id);

                  setCurrentCourseId(item.code);
                } else {
                  router.push(`/courses/${item.code}`);

                  //? Lưu code, id vào store
                  sClassId.set(item.id);
                  sClassCode.set(item.subclasses[0].code);
                }
              }}
            >
              <CourseItem
                key={item.id}
                id={item.code}
                name={item.subject_metadata.name}
                semester={item.semester.toString()}
                year={item.semester.toString()}
                teachers={item.subclasses
                  .map((item) => item.teacher_code)
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
                  ListCourseColors.find((course) => course.type === item.type)
                    ?.color || "#e8f7ff"
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
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
        />
      )}

      {currentCourseId != "" && getCurrentCourse() ? (
        <AlertDialog open={currentCourseId !== ""}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {currentCourseId}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {getCurrentCourse()?.subject_metadata.name}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {
              <div className="flex flex-wrap gap-2">
                {getCurrentCourse()?.subclasses.map((item, index) => (
                  <div key={item.code} className="relative w-[48%]">
                    <div
                      onClick={() => {
                        //? Lưu code, id vào store
                        sClassCode.set(
                          getCurrentCourse()?.subclasses[index].code ?? ""
                        );

                        router.push(
                          `/courses/${
                            getCurrentCourse()?.subclasses[index].code
                          }`
                        );
                      }}
                    >
                      <CourseItemDialog
                        key={item.code}
                        id={item.code}
                        teacher={
                          item.teacher_code &&
                          item.teacher_code.length !== 0 &&
                          !(
                            item.teacher_code.length === 1 &&
                            item.teacher_code[0] === ""
                          )
                            ? item.teacher_code.join(", ")
                            : ""
                        }
                        type={item.type}
                        color={
                          ListCourseColors.find(
                            (course) => course.type === getCurrentCourse()?.type
                          )?.color || "#e8f7ff"
                        }
                      />
                    </div>
                    <div className="absolute right-0 top-0">
                      <MoreButtonCourseItem handleEdit={() => {}} />
                    </div>
                  </div>
                ))}
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
