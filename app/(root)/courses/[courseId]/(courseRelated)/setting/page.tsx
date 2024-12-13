"use client";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import DataTable from "@/components/shared/Table/components/DataTable";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { Input } from "@/components/ui/input";
import { DataTableType } from "@/constants";
import {
  mockDataImportStudentList,
  mockDataImportTeacherList,
  mockSettingGradeColumnDetail,
} from "@/mocks";
import { useState } from "react";

const Setting = () => {
  const [isToggleShowListStudent, setIsToggleShowListStudent] = useState(true);
  const [isToggleShowListTeacher, setIsToggleShowListTeacher] = useState(true);
  const [isToggleShowCourseInfo, setIsToggleShowCourseInfo] = useState(true);
  const [isToggleShowCourseSetting, setIsToggleShowCourseSetting] =
    useState(true);

  const [mockData, setMockData] = useState(mockSettingGradeColumnDetail);

  const handleInputChange = (
    gradeColumn: string,
    index: number,
    newValue: string
  ) => {
    const updatedData = mockData.map((item) => {
      if (item.gradeColumn === gradeColumn) {
        const updatedInnerData = item.data.map((innerItem, innerIndex) => {
          if (innerIndex === index) {
            return { ...innerItem, ratio: newValue };
          }
          return innerItem;
        });
        return { ...item, data: updatedInnerData };
      }
      return item;
    });
    setMockData(updatedData);
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", mockData);
  };

  return (
    <div className="flex flex-col gap-20">
      <div>
        <ToggleTitle
          text="Thông tin lớp học"
          handleClick={() => {
            setIsToggleShowCourseInfo(!isToggleShowCourseInfo);
          }}
          value={isToggleShowCourseInfo}
        />
        {isToggleShowCourseInfo ? (
          <div className="pl-6 flex">
            <div className="w-1/2 flex flex-col gap-2">
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Môn học</span>: Nhập môn ứng
                dụng di động - Lớp Lý thuyết
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Mã lớp</span>: SE121.PMCL
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Quản lý</span>:{" "}
                <span className="text-red-500">Khoa CNPM</span>, Huỳnh Hồ Thị
                Mộng Trinh, Nguyễn Công Hoan
              </p>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Thời lượng</span>: 15 tuần
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Ngày bắt đầu</span>: 5/9/2024
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Dự kiến kết thúc</span>:
                28/12/2024
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <ToggleTitle
          text="Cài đặt lớp"
          handleClick={() => {
            setIsToggleShowCourseSetting(!isToggleShowCourseSetting);
          }}
          value={isToggleShowCourseSetting}
        />
        {isToggleShowCourseSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-6">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                1. Cài đặt nhóm
              </label>
              <BorderContainer otherClasses="p-6 mt-4">
                <CheckboxComponent
                  handleClick={() => {}}
                  value={true}
                  text="Cho phép nhóm chứa thành viên ngoài lớp"
                />
              </BorderContainer>
            </div>

            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                2. Cài đặt điểm danh
              </label>
              <BorderContainer otherClasses="p-6 mt-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    Thời gian điểm danh (giây):
                  </label>
                  <div className="">
                    <Input
                      value={30}
                      onChange={
                        (e) => {}
                        // handleInputChange(
                        //   column.gradeColumn,
                        //   index,
                        //   e.target.value
                        // )
                      }
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    Tỉ lệ số lần điểm danh tối thiểu được cộng hệ số điểm danh
                    (%):
                  </label>
                  <div className="">
                    <Input
                      value={30}
                      onChange={
                        (e) => {}
                        // handleInputChange(
                        //   column.gradeColumn,
                        //   index,
                        //   e.target.value
                        // )
                      }
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>

            <div>
              <IconButton text="Lưu cài đặt lớp" />
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <ToggleTitle
          text="Cài đặt hệ số điểm"
          handleClick={() => {
            setIsToggleShowCourseSetting(!isToggleShowCourseSetting);
          }}
          value={isToggleShowCourseSetting}
        />
        {isToggleShowCourseSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-6">
            <div>
              {mockData.map((column, columnIndex) => (
                <div key={columnIndex} className="mb-6">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    {columnIndex + 1}. {column.gradeColumn}
                  </label>
                  <BorderContainer otherClasses="p-6 mt-4">
                    {column.data.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center mb-4">
                        <div className="flex gap-2 items-center w-1/2">
                          <label
                            className={`${
                              item.title !== "Điểm danh"
                                ? "underline cursor-pointer "
                                : ""
                            } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]`}
                          >
                            {item.title} (%):
                          </label>
                          {item.createdAt && (
                            <label className="ml-4 whitespace-nowrap block small-regular italic text-[#636363] ">
                              - {item.createdAt}
                            </label>
                          )}
                        </div>

                        <div className="w-1/2">
                          <div className="max-w-max">
                            <Input
                              value={item.ratio}
                              onChange={(e) =>
                                handleInputChange(
                                  column.gradeColumn,
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="Nhập điểm..."
                              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </BorderContainer>
                </div>
              ))}
            </div>

            <div>
              <IconButton text="Lưu cài đặt hệ số điểm" onClick={handleSave} />
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <ToggleTitle
          text="Danh sách sinh viên lớp"
          handleClick={() => {
            setIsToggleShowListStudent(!isToggleShowListStudent);
          }}
          value={isToggleShowListStudent}
        />
        {isToggleShowListStudent ? (
          <DataTable
            type={DataTableType.Student}
            dataTable={mockDataImportStudentList}
          />
        ) : null}
      </div>

      <div>
        <ToggleTitle
          text="Danh sách giảng viên lớp"
          handleClick={() => {
            setIsToggleShowListTeacher(!isToggleShowListTeacher);
          }}
          value={isToggleShowListTeacher}
        />
        {isToggleShowListTeacher ? (
          <DataTable
            type={DataTableType.Teacher}
            dataTable={mockDataImportTeacherList}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Setting;
