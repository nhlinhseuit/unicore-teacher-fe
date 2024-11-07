"use client";

import ExercisePostItem from "@/components/courses/ExercisePostItem";
import BackToPrev from "@/components/shared/BackToPrev";
import React, { useState } from "react";

const Exercises = () => {
  const mockPostData = [
    {
      id: "1",
      creator: "Huỳnh Hồ Thị Mộng Trinh",
      createdAt: "29/8/2024 7:23AM",
      title: "Bài tập ngày 29/9/2024",
      fileName: "exercise.docx",
      comments: [
        {
          id: "1",
          author: "Huỳnh Hồ Thị Mộng Trinh",
          content: "Các em mau chóng đăng ký nhóm đúng hạn",
        },
        {
          id: "2",
          author: "Lê Thành Lộc",
          content: "Nộp bài trễ được không cô?",
        },
      ],
    },
    {
      id: "2",
      creator: "Huỳnh Hồ Thị Mộng Trinh",
      createdAt: "29/8/2024 7:23AM",
      title: "Bài tập ngày 29/9/2024",
      fileName: "exercise.docx",
      comments: [
        {
          id: "1",
          author: "Huỳnh Hồ Thị Mộng Trinh",
          content: "Các em mau chóng đăng ký nhóm đúng hạn",
        },
      ],
    },
    {
      id: "3",
      creator: "Huỳnh Hồ Thị Mộng Trinh",
      createdAt: "29/8/2024 7:23AM",
      title: "Bài tập ngày 29/9/2024",
      fileName: "exercise.docx",
      comments: [
        {
          id: "1",
          author: "Huỳnh Hồ Thị Mộng Trinh",
          content: "Các em mau chóng đăng ký nhóm đúng hạn",
        },
      ],
    },
  ];

  const [isGrading, setIsGrading] = useState(false);

  return isGrading ? (
    <>
      <BackToPrev
        text="Quay lại danh sách bài tập"
        onClickPrev={() => {
          setIsGrading(false);
        }}
      />
    </>
  ) : (
    <div className="mt-6 flex flex-col gap-4">
      {mockPostData.map((item, index) => (
        <ExercisePostItem
          key={item.id}
          id={item.id}
          creator={item.creator}
          createdAt={item.createdAt}
          title={item.title}
          fileName={item.fileName}
          comments={item.comments}
          setGrading={() => {
            setIsGrading(true);
          }}
        />
      ))}
    </div>
  );
};

export default Exercises;
