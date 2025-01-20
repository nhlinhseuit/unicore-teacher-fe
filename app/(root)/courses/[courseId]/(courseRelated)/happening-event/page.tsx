"use client";

import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import ExercisePostItem from "@/components/shared/PostItem/Item/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/Item/PostItem";
import ReportPostItem from "@/components/shared/PostItem/Item/ReportPostItem";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { mockBigExercisesList, mockCentralizedExam, mockHappeningEventRegister, mockPostDataCourseIdPage } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const page = () => {
  const pathName = usePathname();

  const [isToggleShowCentralizedExam, setIsToggleShowCentralizedExam] =
    useState(true);
  const [isToggleShowBigExercise, setIsToggleShowBigExercise] = useState(true);

  const getRenderPostItem = (item: any): JSX.Element => {
    switch (item.typePost) {
      case "report":
        return (
          <ReportPostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
            }}
          />
        );
      case "exercise":
        return (
          <ExercisePostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
            }}
          />
        );
      case "announcement":
      default:
        return (
          <PostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
          />
        );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <ToggleTitle
          text="Đăng ký nhóm - Đăng ký đề tài"
          handleClick={() => {
            isToggleShowCentralizedExam;

            setIsToggleShowCentralizedExam(!isToggleShowCentralizedExam);
          }}
          value={isToggleShowCentralizedExam}
        />
        {isToggleShowCentralizedExam
          ? mockHappeningEventRegister.map((item) => (
              <Link key={item.id} href={`${pathName}/big-exercises/${item.id}`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.creator}
                  createdAt={item.createdAt}
                  happeningEvent={""}
                  deadline={item.deadline}
                />
              </Link>
            ))
          : null}

        <ToggleTitle
          text="Bài tập - Báo cáo"
          handleClick={() => {
            setIsToggleShowBigExercise(!isToggleShowBigExercise);
          }}
          value={isToggleShowBigExercise}
        />
        {isToggleShowBigExercise
          ? <div className="mt-6 flex flex-col gap-4">
                  {mockPostDataCourseIdPage.map((item, index) => {
                    return getRenderPostItem(item);
                  })}
                </div>
          : null}
      </div>
    </>
  );
};

export default page;
