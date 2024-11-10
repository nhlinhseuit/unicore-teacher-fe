"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import CreateBigExercise from "@/components/shared/BigExercise/CreateBigExercise";
import IconButton from "@/components/shared/Button/IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const BigExercises = () => {
  const mockBigExercisesList = [
    {
      id: "1",
      name: "Seminar giữa kỳ",
      creator: "Huỳnh Hồ Thị Mộng Trinh",
      createdAt: "29/8/2024 7:23AM",
      happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
      deadline: "10/09/2024 - 00:00AM",
    },
    {
      id: "2",
      name: "Đồ án cuối kỳ",
      creator: "Huỳnh Hồ Thị Mộng Trinh",
      createdAt: "29/8/2024 7:23AM",
      happeningEvent: "Đăng ký nhóm và đề tài báo cáo",
      deadline: "10/09/2024 - 00:00AM",
    },
  ];

  const pathName = usePathname();

  const [isCreate, setIsCreate] = useState(false);

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
            {mockBigExercisesList.map((item) => (
              <Link key={item.id} href={`${pathName}/id`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.creator}
                  createdAt={item.createdAt}
                  happeningEvent={item.happeningEvent}
                  deadline={item.deadline}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BigExercises;
