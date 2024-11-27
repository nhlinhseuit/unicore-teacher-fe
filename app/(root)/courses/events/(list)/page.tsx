"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import CreateBigExercise from "@/components/shared/BigExercise/CreateBigExercise";
import IconButton from "@/components/shared/Button/IconButton";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { mockBigExercisesList, mockFinalExam, mockMidtermExam } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BigExercises = () => {
  const pathName = usePathname();

  const [isCreate, setIsCreate] = useState(false);
  const [isToggleShowMidtermExam, setIsToggleShowMidtermExam] = useState(false);
  const [isToggleShowFinalExam, setIsToggleShowFinalExam] = useState(false);
  const [isToggleShowBigExercise, setIsToggleShowBigExercise] =
    useState(true);

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
          text="Thi giữa kỳ"
          handleClick={() => {
            setIsToggleShowMidtermExam(!isToggleShowMidtermExam);
          }}
          value={isToggleShowMidtermExam}
        />
        {isToggleShowMidtermExam ? mockMidtermExam.map((item) => (
              <Link key={item.id} href={`${pathName}/big-exercises/${item.id}`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.creator}
                  createdAt={item.createdAt}
                  happeningEvent={item.happeningEvent}
                  deadline={item.deadline}
                />
              </Link>
            )) : null}


          <ToggleTitle
          text="Thi cuối kỳ"
          handleClick={() => {
            setIsToggleShowFinalExam(!isToggleShowFinalExam);
          }}
          value={isToggleShowFinalExam}
        />
        {isToggleShowFinalExam ? mockFinalExam.map((item) => (
              <Link key={item.id} href={`${pathName}/big-exercises/${item.id}`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.creator}
                  createdAt={item.createdAt}
                  happeningEvent={item.happeningEvent}
                  deadline={item.deadline}
                />
              </Link>
            )) : null}



          <ToggleTitle
          text="Bài tập lớn"
          handleClick={() => {
            setIsToggleShowBigExercise(!isToggleShowBigExercise);
          }}
          value={isToggleShowBigExercise}
        />
        {isToggleShowBigExercise ? mockBigExercisesList.map((item) => (
              <Link key={item.id} href={`${pathName}/big-exercises/${item.id}`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.creator}
                  createdAt={item.createdAt}
                  happeningEvent={item.happeningEvent}
                  deadline={item.deadline}
                />
              </Link>
            )) : null}

          </div>
        </>
      )}
    </div>
  );
};

export default BigExercises;
