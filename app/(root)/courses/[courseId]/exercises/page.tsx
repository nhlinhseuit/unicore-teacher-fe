"use client";

import ExercisePostItem from "@/components/courses/ExercisePostItem";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
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
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">Bài tập ngày 29/08/2024</p>
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <Image
                src={"/assets/icons/info.svg"}
                width={18}
                height={18}
                alt={"edit"}
                className={`object-contain cursor-pointer`}
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-center truncate">
                Thông tin
              </span>
            </Dropdown.Header>
            <div className="scroll-container scroll-container-dropdown-content">
              <ul>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp bài:</span>
                    <span> 12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp trễ:</span>
                    <span>12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">
                      Thời hạn đóng bài nộp:
                    </span>
                    <span>12h SA 16/11/2024</span>
                  </button>
                </li>
              </ul>
            </div>
          </Dropdown>
          {/* <p className="mt-2 text-sm font-medium">
            
          </p>
          <p className="mt-2 text-sm">
           
          </p>
          <p className="mt-2 text-sm">
           
          </p> */}
        </div>

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
