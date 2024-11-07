"use client";

import ExercisePostItem from "@/components/courses/ExercisePostItem";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
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

  const mockDataGradingExercise = [
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "1",
      isDeleted: false,
      data: {
        "Hình thức": false,
        "Mã nhóm": "1",
        "Tên nhóm": "Figma",
        "Bài nộp": "NguyenHoangLinh_BaiTap.docx",
        MSSV: "21522289",
        "Họ và tên": "Nguyễn Hoàng Linh",
        Điểm: 9,
        "Góp ý": "Bài làm tốt!",
      },
    },
    {
      STT: "2",
      isDeleted: false,
      data: {
        "Hình thức": true,
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        MSSV: "21522289",
        "Họ và tên": "Lê Thành Lộc",
        Điểm: 9,
        "Góp ý": "",
      },
    },
    {
      STT: "3",
      isDeleted: false,
      data: {
        "Hình thức": true,
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        "Bài nộp": "",
        MSSV: "21522289",
        "Họ và tên": "Huỳnh Hồ Thị Mộng Trinh",
        Điểm: 9,
        "Góp ý": "Bài làm tốt!",
      },
    },
    {
      STT: "4",
      isDeleted: false,
      data: {
        "Hình thức": true,
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        MSSV: "21522289",
        "Họ và tên": "Nguyễn Tiến Vĩ",
        Điểm: 9,
        "Góp ý": "",
      },
    },
    {
      STT: "5",
      isDeleted: false,
      data: {
        "Hình thức": true,
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        "Bài nộp": "NguyenHoangLinh_BaiTap.docx",
        MSSV: "21522289",
        "Họ và tên": "Nguyễn Thị Thanh Tuyền",
        Điểm: 9,
        "Góp ý": "Bài làm xuất sắc",
      },
    },
    {
      STT: "6",
      isDeleted: false,
      data: {
        "Hình thức": false,
        "Mã nhóm": "4",
        "Tên nhóm": "Đom đóm",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        MSSV: "21522289",
        "Họ và tên": "Võ Hữu Xike",
        Điểm: 9,
        "Góp ý": "Cần xem lại!",
      },
    },
  ];

  const [isGrading, setIsGrading] = useState(false);
  const [isEditTable, setIsEditTable] = useState(false);

  return isGrading ? (
    <>
      <BackToPrev
        text="Quay lại danh sách bài tập"
        onClickPrev={() => {
          setIsGrading(false);
        }}
      />

      <div className="flex justify-between mb-6">
        <p className="paragraph-semibold ml-4">Bài tập ngày 29/08/2024</p>

        {isEditTable ? (
          <IconButton
            text="Lưu"
            onClick={() => {
              setIsEditTable(false);
            }}
          />
        ) : (
          <IconButton
            text="Chấm điểm"
            green
            onClick={() => {
              setIsEditTable(true);
            }}
          />
        )}
      </div>

      <GradingGroupTable
        isEditTable={isEditTable}
        isMultipleDelete={false}
        dataTable={mockDataGradingExercise}
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
