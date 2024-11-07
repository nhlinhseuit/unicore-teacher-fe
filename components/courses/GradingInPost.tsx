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
      <p className="paragraph-semibold underline ">BÀI NỘP</p>
      <div className="flex flex-col gap-2 mt-4 bg-gray-400 p-4 rounded-lg shadow-full">
        <p className="body-semibold text-white">
          Số lượng bài nộp:{" "}
          <span className="ml-2 body-semibold text-red-500">
            {params.submissionNumber}{" "}
          </span>
          <span>/ {params.totalNumber} sĩ số lớp</span>
        </p>
        <p className="body-semibold text-white">
          Deadline: Quá hạn
          <span className=" text-red-500"> {params.lateTime}</span>
        </p>
        <p className="body-semibold text-white">
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
