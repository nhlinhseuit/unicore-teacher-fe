"use client";
import CourseItem from "@/components/courses/CourseItem";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import Link from "next/link";
import { useState } from "react";

import CourseItemDialog from "@/components/courses/CourseItemDialog";
import DetailFilterComponent from "@/components/shared/DetailFilterComponent";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mockCourses } from "@/mocks";
import { useRouter } from "next/navigation";
import { ListCourseColors } from "@/constants";

const JoinedCourses = () => {
  const [currentCourseId, setCurrentCourseId] = useState("");

  const router = useRouter();

  const getCourseData = (idCourse: string) => {
    return mockCourses.find((item) => item.id === idCourse);
  };

  return (
    <>
      <div className="items-center flex w-full gap-2 mb-8">
        <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
          Bộ lọc lớp:
        </p>

        <DetailFilterComponent />
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
              color={
                ListCourseColors.find((course) => course.type === item.type)
                  ?.color || "#ffffff"
              }
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
                          type={item.type}
                          color={
                            ListCourseColors.find((course) => course.type === getCourseData(currentCourseId)?.type)
                              ?.color || "#ffffff"
                          }
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
