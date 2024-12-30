"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import CreateBigExercise from "@/components/shared/BigExercise/CreateBigExercise";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { mockBigExercisesList, mockCentralizedExam } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BigExercises = () => {
  const pathName = usePathname();

  const [isCreate, setIsCreate] = useState(false);
  const [isToggleShowCentralizedExam, setIsToggleShowCentralizedExam] =
    useState(true);
  const [isToggleShowReportSchedule, setIsToggleShowReportSchedule] =
    useState(true);
  const [isToggleShowBigExercise, setIsToggleShowBigExercise] = useState(true);

  const mockReportOptions = [
    {
      id: 0,
      value: "Ngày 3/10, 7h30h - 8h",
      groups: ["Nhóm 1", "Nhóm 2"],
    },
    {
      id: 1,
      value: "Ngày 3/10, 8h - 8h30",
      groups: ["Nhóm 3", "Nhóm 4"],
    },
    {
      id: 2,
      value: "Ngày 3/10, 9h - 9h30",
      groups: ["Nhóm 5", "Nhóm 6"],
    },
    {
      id: 3,
      value: "Ngày 3/10, 10h - 10h30",
      groups: ["Nhóm 7", "Nhóm 8"],
    },
  ];

  return (
    <div>
      {isCreate ? (
        <>
          <BackToPrev
            text={"Quay lại danh sách bài tập lớn"}
            onClickPrev={() => {
              setIsCreate(false);
            }}
          />

          <CreateBigExercise />
        </>
      ) : (
        <>
          <div className="flex justify-end mt-4 mb-4">
            <IconButton
              text="Tạo bài tập lớn"
              iconLeft="/assets/icons/add.svg"
              onClick={() => {
                setIsCreate(true);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ToggleTitle
              text="Lịch báo cáo đồ án"
              handleClick={() => {
                setIsToggleShowReportSchedule(!isToggleShowReportSchedule);
              }}
              value={isToggleShowReportSchedule}
            />
            {isToggleShowReportSchedule ? (
              <BorderContainer otherClasses="p-6 flex flex-col gap-4">
                {mockReportOptions.map((item, index) => (
                  <div>
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                      <span className="font-semibold">
                        {item.id + 1}. {item.value}:{" "}
                      </span>
                      {item.groups.join(", ")}
                    </label>
                  </div>
                ))}
              </BorderContainer>
            ) : null}

            <ToggleTitle
              text="Thi tập trung"
              handleClick={() => {
                setIsToggleShowCentralizedExam(!isToggleShowCentralizedExam);
              }}
              value={isToggleShowCentralizedExam}
            />
            {isToggleShowCentralizedExam
              ? mockCentralizedExam.map((item) => (
                  <Link
                    key={item.id}
                    href={`${pathName}/big-exercises/${item.id}`}
                  >
                    <BigExerciseItem
                      id={item.id}
                      name={item.name}
                      creator={item.creator}
                      createdAt={item.createdAt}
                      happeningEvent={item.happeningEvent}
                      deadline={item.deadline}
                    />
                  </Link>
                ))
              : null}

            <ToggleTitle
              text="Bài tập lớn"
              handleClick={() => {
                setIsToggleShowBigExercise(!isToggleShowBigExercise);
              }}
              value={isToggleShowBigExercise}
            />
            {isToggleShowBigExercise
              ? mockBigExercisesList.map((item) => (
                  <Link
                    key={item.id}
                    href={`${pathName}/big-exercises/${item.id}`}
                  >
                    <BigExerciseItem
                      id={item.id}
                      name={item.name}
                      creator={item.creator}
                      createdAt={item.createdAt}
                      happeningEvent={item.happeningEvent}
                      deadline={item.deadline}
                    />
                  </Link>
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};

export default BigExercises;
