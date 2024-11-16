"use client";

import IconButton from "@/components/shared/Button/IconButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const ScoreTranscript = () => {
  const mockCoursesList = [
    { id: 1, value: "SE114.N22.PMCL - Nhập môn ứng dụng di động" },
    { id: 2, value: "SE121.O11.PMCL - Đồ án 1" },
    {
      id: 3,
      value: "SE100.O11.PMCL - Phương pháp phát triển phần mềm hướng đối tượng",
    },
    { id: 4, value: "SE104.N21.PMCL - Kiểm chứng phần mềm" },
  ];



  const mockDataGradingExercise = [
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "1",
      isDeleted: false,
      data: {
        "Họ và tên": "Nguyễn Hoàng Linh",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
    {
      STT: "2",
      isDeleted: false,
      data: {
        "Họ và tên": "Lê Thành Lộc",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
    {
      STT: "3",
      isDeleted: false,
      data: {
        "Họ và tên": "Võ Hữu",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "4",
      isDeleted: false,
      data: {
        "Họ và tên": "Nguyễn Hoàng Linh",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
    {
      STT: "5",
      isDeleted: false,
      data: {
        "Họ và tên": "Lê Thành Lộc",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
    {
      STT: "6",
      isDeleted: false,
      data: {
        "Họ và tên": "Võ Hữu",
        MSSV: "21522289",
        "Quá trình": 9,
        "Giữa kỳ": 8,
        "Cuối kỳ": 10,
        "Điểm trung bình": 8,
      },
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [isEditTable, setIsEditTable] = useState(false);

  return (
    <>
      <div
        className="
        mt-6 mb-10 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
      >
        {/* Search & Filter */}
        <div className="flex justify-start ml-10 w-1/2 items-center gap-4">
          <p className="inline-flex justify-start text-sm whitespace-nowrap">
            Xem bảng điểm của lớp
          </p>

          <Dropdown
            className="z-30 rounded-lg"
            label=""
            dismissOnClick={true}
            renderTrigger={() => (
              <div>
                <IconButton
                  text={`${
                    selectedCourse !== -1
                      ? mockCoursesList[selectedCourse - 1].value
                      : "Chọn lớp"
                  }`}
                  onClick={() => {}}
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                />
              </div>
            )}
          >
            <TableSearch
              setSearchTerm={() => {}}
              searchTerm={""}
              otherClasses="p-2"
            />
            <div className="scroll-container scroll-container-dropdown-content">
              {mockCoursesList.map((course: any, index) => (
                <Dropdown.Item
                  key={`${course}_${index}`}
                  onClick={() => {
                    if (selectedCourse === course.id) {
                      setSelectedCourse(-1);
                    } else {
                      setSelectedCourse(course.id);
                    }
                  }}
                >
                  <div className="flex justify-between w-full gap-4">
                    <p className="text-left line-clamp-1">{course.value}</p>
                    {selectedCourse === course.id ? (
                      <Image
                        src="/assets/icons/check.svg"
                        alt="search"
                        width={21}
                        height={21}
                        className="cursor-pointer mr-2"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>
        </div>

        {/* Create announcement */}
        <div className="flex gap-2">
          <IconButton text="Chỉnh sửa hệ số điểm" />
          <IconButton text="Xuất file điểm" green />
        </div>
      </div>

      {/* //TODO: BÀI TẬP */}
      <ScoreTranscriptTable
        isEditTable={isEditTable}
        isMultipleDelete={false}
        dataTable={mockDataGradingExercise}
      />
    </>
  );
};

export default ScoreTranscript;
