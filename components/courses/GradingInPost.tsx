import React from "react";
import IconButton from "../shared/Button/IconButton";

interface Props {
  onClickBack: () => void;
  submissionNumber: number;
  totalNumber: number;
  lateTime: string;
  columnGrade: string;
}

const GradingInPost = (params: Props) => {
  return (
    <>
      <p className="paragraph-medium underline ">BÀI NỘP</p>
      <div className="flex flex-col gap-2 mt-4 bg-[#ecf2ff] p-4 rounded-lg border-light-500">
        <p className="body-medium text-black">
          Điểm danh:{" "}
          <span className="ml-2 body-medium text-red-500">
            {params.submissionNumber}{" "}
          </span>
          <span>/ {params.totalNumber} sĩ số lớp</span>
        </p>
        <p className="body-medium text-black">
          Số lượng bài nộp:{" "}
          <span className="ml-2 body-medium text-red-500">
            {params.submissionNumber}{" "}
          </span>
          <span>/ {params.totalNumber} sĩ số lớp</span>
        </p>
        <p className="body-medium text-black">
          Deadline: Quá hạn
          <span className=" text-red-500"> {params.lateTime}</span>
        </p>
        <p className="body-medium text-black">
          Cột điểm: <span>{params.columnGrade}</span>
        </p>

        <div className="inline-flex mt-4">
          <IconButton text="Chấm điểm" onClick={params.onClickBack} />
        </div>
      </div>
    </>
  );
};

export default GradingInPost;
