"use client";

import ExercisePostItem from "@/components/shared/PostItem/ExercisePostItem";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

const ScoreTranscript = () => {
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
        "Trễ hạn": "0",
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
        "Trễ hạn": "1 ngày 12 tiếng",
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
        "Trễ hạn": "0",
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
        "Trễ hạn": "3 phút 12 giây",
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
        "Trễ hạn": "0",
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
        "Trễ hạn": "0",
        MSSV: "21522289",
        "Họ và tên": "Võ Hữu Xike",
        Điểm: 9,
        "Góp ý": "Cần xem lại!",
      },
    },
  ];

  const mockDataGradingReport = [
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "1",
      isDeleted: false,
      data: {
        "Điểm danh": false,
        "Mã nhóm": "1",
        "Tên nhóm": "Figma",
        "Bài nộp": "NguyenHoangLinh_BaiTap.docx",
        "Trễ hạn": "0",
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
        "Điểm danh": true,
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        "Trễ hạn": "1 ngày 12 tiếng",
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
        "Điểm danh": true,
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        "Bài nộp": "",
        "Trễ hạn": "0",
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
        "Điểm danh": true,
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        "Trễ hạn": "3 phút 12 giây",
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
        "Điểm danh": true,
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        "Bài nộp": "NguyenHoangLinh_BaiTap.docx",
        "Trễ hạn": "0",
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
        "Điểm danh": false,
        "Mã nhóm": "4",
        "Tên nhóm": "Đom đóm",
        "Bài nộp": "LeThanhLoc_BaiTap.docx",
        "Trễ hạn": "0",
        MSSV: "21522289",
        "Họ và tên": "Võ Hữu Xike",
        Điểm: 9,
        "Góp ý": "Cần xem lại!",
      },
    },
  ];

  const [isGrading, setIsGrading] = useState(false);
  const [isEditTable, setIsEditTable] = useState(false);

  return <>
  <div className="flex justify-between mb-6">
    <div>
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
  </div>

  {/* //TODO: BÀI TẬP */}
    <GradingGroupTable
      isEditTable={isEditTable}
      isMultipleDelete={false}
      dataTable={mockDataGradingExercise}
    />

  
</>
};

export default ScoreTranscript;
