import React from "react";
import MiniButton from "./Button/MiniButton";
import BorderContainer from "./BorderContainer";
import Student from "@/types/entity/Student";

interface Props {
  item: Student;
  index: number;
  courseId: string;
  selectedStudents: Student[]; // Thêm prop nhận danh sách
  setSelectedStudents: React.Dispatch<React.SetStateAction<Student[]>>; // Thêm prop để set
}

const StudentItem = (params: Props) => {
  const { item, index, courseId, selectedStudents, setSelectedStudents } = params;

  return (
    <>
      <div className="flex items-center gap-4">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[13px] font-semibold leading-[20.8px]">
          Sinh viên {index + 1}
        </label>

        <div className="flex-center">
          <MiniButton
            key={1}
            value={1}
            icon={"/assets/icons/minus-white.svg"}
            bgColor="bg-[#F02021]"
            onClick={() => {
              setSelectedStudents((prev) =>
                prev.filter((student) => student.id !== item.id)
              );
            }}
            otherClasses={"!w-[18px] !h-[18px]"}
          />
        </div>
      </div>

      <BorderContainer otherClasses="mt-2 p-3">
        <p className="flex-grow text-left normal-regular -translate-y-[1px] text-dark200_light900 line-clamp-2">
          {item.id} - {item.name}
          {item.class !== courseId ? (
            <span className="text-green-500"> - {item.class}</span>
          ) : null}
        </p>
      </BorderContainer>
    </>
  );
};

export default StudentItem;
