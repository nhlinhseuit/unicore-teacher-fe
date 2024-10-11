"use client";

import { CustomFlowbiteTheme, Table } from "flowbite-react";
import Row from "./Row";
import PureButton from "../../PureButton";
import { useState } from "react";

const mockCoursesData = [
  {
    id: 1,
    data: {
      subjectId: "SE100",
      courseId: "SE100.O12.PMCL",
      subjectName: "Phương pháp Phát triển phần mềm hướng đối tượng",
      teacherId: "80123",
      teacherName: "Huỳnh Hồ Thị Mộng Trinh",
      numberOfStudents: 40,
      numberOfCredits: 3,
      typeOfTeaching: "LT",
      isManagedByDepartment: false,
      startDate: "20-12-2024",
      endDate: "20-5-2025",
      semester: 2,
      year: 2024,
    },
  },
  {
    id: 2,
    data: {
      subjectId: "SE100",
      courseId: "SE100.O12.PMCL.1",
      subjectName: "Phương pháp Phát triển phần mềm hướng đối tượng",
      teacherId: "80129",
      teacherName: "Lê Thành Lộc",
      numberOfStudents: 40,
      numberOfCredits: 1,
      typeOfTeaching: "TH",
      isManagedByDepartment: true,
      startDate: "20-12-2024",
      endDate: "20-5-2025",
      semester: 2,
      year: 2024,
    },
  },
];

const fieldMapping: { [key: string]: string } = {
  subjectId: "Mã môn học",
  courseId: "Mã lớp",
  subjectName: "Tên môn học",
  teacherId: "Mã GV",
  teacherName: "Tên GV",
  numberOfStudents: "Sĩ số",
  numberOfCredits: "Số TC",
  typeOfTeaching: "HTGD",
  isManagedByDepartment: "Khoa quản lý",
  startDate: "Ngày BĐ",
  endDate: "Ngày KT",
  semester: "Học kỳ",
  year: "Năm học",
};

export default function SimpleDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);

  return (
    <div>
      <div className="flex justify-end gap-4 mb-5">
        <PureButton
          text="Chỉnh sửa"
          onClick={() => {
            setIsEditTable(true);
          }}
        />
        <PureButton
          text="Lưu"
          onClick={() => {
            setIsEditTable(false);
          }}
        />
      </div>

      <div className="overflow-auto max-w-full h-fit rounded-lg border-[1px] border-secondary-200">
        <Table hoverable theme={tableTheme}>
          <Table.Head
            theme={tableTheme?.head}
            className="bg-[#F9F9FB] border-b "
          >
            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={`border-r-[1px]`}
            ></Table.HeadCell>

            <Table.HeadCell
              theme={tableTheme?.head?.cell}
              className={` w-10 border-r-[1px]`}
            >
              STT
            </Table.HeadCell>

            {Object.keys(mockCoursesData[0].data).map((key) => (
              <Table.HeadCell
                theme={tableTheme?.head?.cell}
                key={fieldMapping[key] || key}
                className=" normal-case px-2 py-4 border-r-[1px] whitespace-nowrap"
              >
                {fieldMapping[key] || key}
              </Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body className="divide-y">
            {mockCoursesData.map((course) => (
              <Row course={course} isEditTable={isEditTable} />
            ))}
            {/* {mockData.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>
                  <MoreButtonComponent handleEdit={handleEdit} />
                </Table.Cell>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>
                  {isEdit ? (
                    <InputComponent
                      value={product.name}
                      placeholder={product.name}
                    />
                  ) : (
                    product.name
                  )}
                </Table.Cell>
  
                <Table.Cell>
                  {isEdit ? (
                    <InputComponent
                      value={product.category}
                      placeholder={product.category}
                    />
                  ) : (
                    product.category
                  )}
                </Table.Cell>
  
                <Table.Cell>
                  {isEdit ? (
                    <InputComponent
                      value={product.price}
                      placeholder={product.price}
                    />
                  ) : (
                    product.price
                  )}
                </Table.Cell>
              </Table.Row>
            ))} */}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "min-w-full text-center rounded-lg text-sm text-secondary-500",
    shadow:
      "absolute bg-background-secondary dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative ",
  },
  body: {
    base: "group/body bg-background-secondary",
    cell: {
      base: `text-center group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg p-2 sm:p-3 md:p-4 font-normal text-secondary-900 `,
      // ${FONT.primary.className}
    },
  },
  head: {
    base: " text-center group/head bg-background-secondary text-xs border-b-2 border-secondary-200 uppercase text-secondary-700",
    cell: {
      base: "text-center  group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg p-2 sm:p-3 md:p-4 sm:p-2 md:p-4",
    },
  },
  row: {
    base: "text-center group/row bg-background-secondary",
    hovered: "hover:bg-light-800",
    striped: "odd:bg-background-secondary even:bg-background-secondary ",
  },
};
