"use client";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import OfficerPermission from "@/components/shared/OfficerPermission";
import DataTable from "@/components/shared/Table/components/DataTable";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { DataTableType } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { mockDataImportStudentList, mockDataImportTeacherList, mockDataOfficerPermissions } from "@/mocks";
import { StudentDataItem, TeacherDataItem } from "@/types";
import { useState } from "react";
const Setting = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTableStudent, setDataTableStudent] = useState<StudentDataItem[]>(
    mockDataImportStudentList
  );
  const [dataTableTeacher, setDataTableTeacher] = useState<TeacherDataItem[]>(
    mockDataImportTeacherList
  );

  const [isToggleShowListStudent, setIsToggleShowListStudent] = useState(true);
  const [isToggleShowListTeacher, setIsToggleShowListTeacher] = useState(true);
  const [isToggleShowCourseInfo, setIsToggleShowCourseInfo] = useState(true);
  const [isToggleShowCourseSetting, setIsToggleShowCourseSetting] =
    useState(true);
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-4">
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
                - <span className="font-semibold">Môn học</span>: Nhập môn ứng dụng di động - Lớp Lý thuyết
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Mã lớp</span>: SE121.PMCL
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Quản lý</span>: <span className="text-red-500">Khoa CNPM</span>, Huỳnh Hồ Thị Mộng Trinh, Nguyễn Công Hoan
              </p>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Thời lượng</span>:  15 tuần
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Ngày bắt đầu</span>:  5/9/2024
              </p>
              <p className="mt-2 ml-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                - <span className="font-semibold">Dự kiến kết thúc</span>: 28/12/2024
              </p>
            </div>
          </div>
        ) : null}</div>

      <div><ToggleTitle
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
                  handleClick={() => { }}
                  value={true}
                  text="Cho phép nhóm chứa thành viên ngoài lớp"
                />
              </BorderContainer>
            </div>
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                2. Phân quyền lớp học
              </label>
                <div className="flex gap-4">
                  {mockDataOfficerPermissions.map((item, index) => <OfficerPermission key={index} dataItem={item}/>) }
                </div>
            </div>

            <div><IconButton text='Lưu cài đặt lớp'/></div>
          </div>
        ) : null}</div>

      <div><ToggleTitle
        text="Danh sách sinh viên lớp"
        handleClick={() => {
          setIsToggleShowListStudent(!isToggleShowListStudent);
        }}
        value={isToggleShowListStudent}
      />
        {isToggleShowListStudent ? (
          <DataTable
            type={DataTableType.Student}
            dataTable={dataTableStudent}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as StudentDataItem[];
              setDataTableStudent(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              setDataTableStudent((prevData) => {
                return prevData.map((item) => ({
                  ...item,
                  isDeleted: true,
                }));
              });
              toast({
                title: "Xóa thành công",
                description: `Đã xóa tất cả sinh viên`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MSSV
              setDataTableStudent((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["MSSV"])) {
                    return {
                      ...item,
                      isDeleted: true,
                    };
                  }
                  return item;
                });
              });
              toast({
                title: "Xóa thành công",
                description: `${`Các sinh viên ${itemsSelected.join(
                  ", "
                )} đã được xóa.`}`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickGetOut={() => {
              setIsMultipleDelete(false);
            }}
          />
        ) : null}</div>

      <div><ToggleTitle
        text="Danh sách giảng viên lớp"
        handleClick={() => {
          setIsToggleShowListTeacher(!isToggleShowListTeacher);
        }}
        value={isToggleShowListTeacher}
      />
        {isToggleShowListTeacher ? (
          <DataTable
            type={DataTableType.Teacher}
            dataTable={dataTableTeacher}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as TeacherDataItem[];
              setDataTableTeacher(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              setDataTableTeacher((prevData) => {
                return prevData.map((item) => ({
                  ...item,
                  isDeleted: true,
                }));
              });
              toast({
                title: "Xóa thành công",
                description: `Đã xóa tất cả sinh viên`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MSSV
              setDataTableTeacher((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["Mã cán bộ"])) {
                    return {
                      ...item,
                      isDeleted: true,
                    };
                  }
                  return item;
                });
              });
              toast({
                title: "Xóa thành công",
                description: `${`Các sinh viên ${itemsSelected.join(
                  ", "
                )} đã được xóa.`}`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickGetOut={() => {
              setIsMultipleDelete(false);
            }}
          />
        ) : null}</div>

      <div><ToggleTitle
        text="Danh sách giáo vụ lớp"
        handleClick={() => {
          setIsToggleShowListStudent(!isToggleShowListStudent);
        }}
        value={isToggleShowListStudent}
      />
        {/* {isToggleShowListStudent ? (
          <DataTable
            type={DataTableType.Student}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as StudentDataItem[];
              setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              setDataTable((prevData) => {
                return prevData.map((item) => ({
                  ...item,
                  isDeleted: true,
                }));
              });
              toast({
                title: "Xóa thành công",
                description: `Đã xóa tất cả sinh viên`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MSSV
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["MSSV"])) {
                    return {
                      ...item,
                      isDeleted: true,
                    };
                  }
                  return item;
                });
              });
              toast({
                title: "Xóa thành công",
                description: `${`Các sinh viên ${itemsSelected.join(
                  ", "
                )} đã được xóa.`}`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickGetOut={() => {
              setIsMultipleDelete(false);
            }}
          />
        ) : null} */}
        </div>


    </div>
  );
};
export default Setting;