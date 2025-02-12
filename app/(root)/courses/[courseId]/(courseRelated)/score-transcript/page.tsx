"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ScoreColumnDetailPage from "@/components/shared/ScoreTranscript/ScoreColumnDetailPage";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import { ColumnType, roundAverageGrade, roundRegularGrade } from "@/constants";
import { mockDataScoreTranscript } from "@/mocks";
import { DataColumnDetail, ScoreTranscriptDataItem } from "@/types";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState } from "react";

const ScoreTranscript = () => {

  //! FAKE API: Phải có id của sinh viên, và cột được chọn là cột nào => Truyền qua bên kia fetch detail cột của sv đó
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] =
    useState<ColumnType>(ColumnType.NONE);

  const [dataTable, setDataTable] = useState<ScoreTranscriptDataItem[]>(
    mockDataScoreTranscript
  );

  console.log("dataTable", dataTable);

  const listRatio = {
    "Quá trình": dataTable[0].data["Quá trình"].ratio,
    "Giữa kỳ": dataTable[0].data["Giữa kỳ"].ratio,
    "Thực hành": dataTable[0].data["Thực hành"].ratio,
    "Cuối kỳ": dataTable[0].data["Cuối kỳ"].ratio,
  };

  console.log("listRatio", listRatio);

  const mockParamsStudent = "21522289";

  const getListPostIdOfDetailColumn = () => {
    const studentScoreTranscript = dataTable.find(
      (item) => item.data.MSSV === mockParamsStudent
    );

    if (!studentScoreTranscript) return [""];

    const data =
      studentScoreTranscript.data[
        isViewDetailGradeColumn as keyof typeof studentScoreTranscript.data
      ];
    if (!data) return [""];
    console.log("data", data);
    return (data as DataColumnDetail).detailPostId;
  };

  const onSave = (detailScore: number[], detailRatio: number[]) => {
    console.log("detailScore", detailScore);
    console.log("detailRatio", detailRatio);

    const dataStudent = dataTable.find(
      (item) => item.data.MSSV === mockParamsStudent
    );
    if (!dataStudent) return;

    const result =
      dataStudent.data[
        isViewDetailGradeColumn as keyof typeof dataStudent.data
      ];

    if (!result) return;

    if (
      Array.isArray(detailRatio) &&
      detailRatio.every((item) => typeof item === "number")
    ) {
      (result as DataColumnDetail).detailRatio = [...detailRatio]; // Gán mảng tỉ lệ
    } else {
      console.error("detailRatio không hợp lệ:", detailRatio);
    }

    if (
      Array.isArray(detailScore) &&
      detailScore.every((item) => typeof item === "number")
    ) {
      (result as DataColumnDetail).detailScore = [...detailScore]; // Gán mảng điểm
    } else {
      console.error("detailScore không hợp lệ:", detailScore);
    }

    console.log("result", result);

    // save
    const newDataTable = dataTable.map((item) => {
      if (item.data.MSSV === mockParamsStudent) {
        return {
          ...item,
          data: {
            ...item.data,
            [isViewDetailGradeColumn]: { ...(result as DataColumnDetail) },
          },
        };
      }
      return item;
    });

    console.log("newDataTable", newDataTable);

    setDataTable(newDataTable);
  };

  const calculateWeightedAverageColumn = (value: DataColumnDetail): number => {
    const detailScore = value.detailScore;
    const detailRatio = value.detailRatio;

    if (detailScore.length !== detailRatio.length || detailScore.length === 0) {
      return 0;
    }

    const totalWeightedScore = detailScore.reduce(
      (sum, score, index) => sum + score * (detailRatio[index] / 100),
      0
    );
    const res =
      Math.round(totalWeightedScore / roundRegularGrade) * roundRegularGrade;

    return parseFloat(res.toFixed(1));
  };

  const calculateWeightedAverage = (
    item: ScoreTranscriptDataItem,
    qt: number,
    gk: number,
    ck: number,
    th: number
  ): number => {
    const qtRatio = item.data["Quá trình"].ratio;
    const gkRatio = item.data["Giữa kỳ"].ratio;
    const ckRatio = item.data["Cuối kỳ"].ratio;
    const thRatio = item.data["Thực hành"].ratio;

    const totalWeightedScore =
      (qt * qtRatio + gk * gkRatio + ck * ckRatio + th * thRatio) / 100;

    const res =
      Math.round(totalWeightedScore / roundAverageGrade) * roundAverageGrade;

    return parseFloat(res.toFixed(1));
  };

  const handleExport = async () => {
    if (!dataTable || dataTable.length === 0) {
      console.error("Không có dữ liệu.");
      return;
    }

    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bảng điểm");

    // Hàm merge và định dạng tiêu đề
    const mergeAndStyle = (
      cellRange: string,
      text: string,
      fontSize: number,
      bold: boolean,
      align: "left" | "center" | "right"
    ) => {
      const cell = worksheet.getCell(cellRange);
      cell.value = text;
      cell.font = { bold, size: fontSize };
      cell.alignment = {
        horizontal: align as "left" | "center" | "right",
        vertical: "middle",
      };
      worksheet.mergeCells(cellRange);
    };

    // Merge & định dạng tiêu đề
    mergeAndStyle("A1:C1", "TRƯỜNG ĐH CÔNG NGHỆ THÔNG TIN", 14, true, "center");
    mergeAndStyle("A2:C2", "PHÒNG ĐÀO TẠO ĐẠI HỌC", 12, true, "center");
    mergeAndStyle("A4:H4", "DANH SÁCH LỚP", 14, true, "center");

    // Merge & định dạng thông tin lớp học
    mergeAndStyle("A5:C5", "HỌC KỲ: 1", 12, true, "left");
    worksheet.getCell("D5").value = "NĂM HỌC: 2024-2025";

    mergeAndStyle("A6:C6", "Môn học: Kiểm chứng phần mềm", 12, true, "left");
    worksheet.getCell("D6").value = "Lớp: SE113.O21.PMCL";

    mergeAndStyle(
      "A7:C7",
      "Giảng viên: Nguyễn Thị Thanh Trúc",
      12,
      true,
      "left"
    );
    worksheet.getCell("D7").value = "Mã giảng viên: 80210";

    // Tạo tiêu đề cột cho bảng điểm
    const headerRow = [
      "STT",
      "Mã số SV",
      "Họ và tên sinh viên",
      "Quá trình",
      "Giữa kỳ",
      "Thực hành",
      "Cuối kỳ",
      "Điểm trung bình",
    ];
    worksheet.addRow([]);
    worksheet.addRow(headerRow);

    // Định dạng **dòng tiêu đề bảng điểm**
    const headerRowIndex = worksheet.rowCount;
    worksheet.getRow(headerRowIndex).eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCFFFF" }, // Màu nền xanh nhạt
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Thêm dữ liệu vào bảng
    dataTable.forEach((item, index) => {
      const qt = calculateWeightedAverageColumn(item.data["Quá trình"]);
      const gk = calculateWeightedAverageColumn(item.data["Giữa kỳ"]);
      const ck = calculateWeightedAverageColumn(item.data["Cuối kỳ"]);
      const th = calculateWeightedAverageColumn(item.data["Thực hành"]);

      const row = [
        index + 1,
        item.data.MSSV,
        item.data["Họ và tên"],
        qt,
        gk,
        th,
        ck,
        calculateWeightedAverage(item, qt, gk, ck, th),
      ];

      worksheet.addRow(row);
    });

    // Định dạng **chỉ các ô có dữ liệu** (bao gồm cả dòng tiêu đề bảng)
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber >= headerRowIndex) {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "center", vertical: "middle" };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Đặt độ rộng cột
    worksheet.columns = [
      { width: 6 }, // STT
      { width: 12 }, // Mã số SV
      { width: 25 }, // Họ và tên sinh viên
      { width: 12 }, // Quá trình
      { width: 10 }, // Giữa kỳ
      { width: 12 }, // Thực hành
      { width: 10 }, // Cuối kỳ
      { width: 15 }, // Điểm trung bình
    ];

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Bảng điểm.xlsx");
  };

  return (
    <>
      {isViewDetailGradeColumn !== ColumnType.NONE ? (
        <ScoreColumnDetailPage
          //! mockParams
          type={isViewDetailGradeColumn}
          listPostId={getListPostIdOfDetailColumn()}
          onSave={onSave}
          onClickPrev={() => {
            setIsViewDetailGradeColumn(ColumnType.NONE);
          }}
        />
      ) : (
        <>
          <div
            className="
          mt-6 mb-6 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
          >
            {/* Search & Filter */}
            {/* <div className="flex justify-start ml-10 w-1/2 items-center gap-4">
              <p className="inline-flex justify-start text-sm whitespace-nowrap">
                Xem bảng điểm của lớp:
                <span className="ml-2 font-semibold">Kiểm chứng phần mềm</span>
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
                          ? mockSubCoursesOfCourseScoreTranscript[
                              selectedCourse - 1
                            ].value
                          : "Chọn lớp"
                      }`}
                      onClick={() => {}}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                    />
                  </div>
                )}
              >
                <div className="scroll-container scroll-container-dropdown-content">
                  {mockSubCoursesOfCourseScoreTranscript.map(
                    (course: any, index) => (
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
                          <p className="text-left line-clamp-1">
                            {course.value}
                          </p>
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
                    )
                  )}
                </div>
              </Dropdown>
            </div> */}

            {/* Create announcement */}
            <div className="ml-auto">
              {/* <IconButton
                text="Chỉnh sửa hệ số điểm"
                onClick={() => {
                  setIsEditGradeColumn(true);
                }}
              /> */}
              <IconButton text="Xuất file điểm" green onClick={handleExport} />
            </div>
          </div>

          {/* //TODO: BÀI TẬP */}
          <ScoreTranscriptTable
            dataTable={dataTable}
            dataGradeColumnPercent={listRatio}
            viewDetailGradeColumn={(columnType: ColumnType) => {
              console.log("columnType", columnType);
              setIsViewDetailGradeColumn(columnType);
            }}
          />
        </>
      )}
    </>
  );
};

export default ScoreTranscript;
