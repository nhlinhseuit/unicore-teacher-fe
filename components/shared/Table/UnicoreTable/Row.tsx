import { Table } from "flowbite-react";
import React from "react";
import InputComponent from "./InputComponent";
import { useState } from "react";
import MoreButtonComponent from "./MoreButtonComponent";

interface Course {
  id: number;
  data: {
    subjectId: string;
    courseId: string;
    subjectName: string;
    teacherId: string;
    teacherName: string;
    numberOfStudents: number;
    numberOfCredits: number;
    typeOfTeaching: string;
    isManagedByDepartment: boolean;
    startDate: string;
    endDate: string;
    semester: number;
    year: number;
  };
}

interface RowParams {
  course: Course;
  isEditTable?: boolean;
}

const Row = (params: RowParams) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    if (isEdit === false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <Table.Row
      key={params.course.id}
      onClick={() => {}}
      className={`bg-background-secondary ${
        isEdit
          ? "hover:bg-white cursor-default"
          : "hover:bg-light-800 cursor-pointer"
      } duration-100`}
    >
      <Table.Cell className="w-10 border-r-[1px] z-100">
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
          }}
        >
          <MoreButtonComponent handleEdit={handleEdit} />
        </div>
      </Table.Cell>

      <Table.Cell className="w-10 border-r-[1px]">
        {params.course.id}
      </Table.Cell>

      {Object.entries(params.course.data).map(([key, value]) => {
        return (
          <Table.Cell
            theme={{
              base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
            }}
            className="border-r-[1px] px-2 py-4 normal-case whitespace-nowrap"
          >
            {key === "isManagedByDepartment" ? (
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={() => {}}
                className="w-4 h-4"
              />
            ) : (isEdit || params.isEditTable) ? (
              <InputComponent
                value={value as string | number}
                placeholder={value as string | number}
              />
            ) : (
              value
            )}
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
};

export default Row;
