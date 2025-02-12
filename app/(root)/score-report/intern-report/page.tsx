"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import InternTopicGradeTable from "@/components/shared/ScoreReport/InternGradeTable/InternTopicGradeTable";
import InternTopic from "@/components/shared/ScoreReport/InternTopic";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockInternReviewCouncils, mockInternReviewDetail } from "@/mocks";
import { InternReviewDataItem } from "@/types";
import { useState } from "react";

const ReviewerInternReport = () => {
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);

  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState(mockInternReviewDetail);

  return (
    <>
      <TitleDescription
        title="Nhập điểm hội đồng Thực tập doanh nghiệp"
        description={["Thời hạn: 01/02/2025 - 28/02/2025"]}
      />

      {isGradeThesisReport ? (
        <>
          <BackToPrev
            text={"Quay lại danh sách hội đồng"}
            onClickPrev={() => {
              setIsGradeThesisReport(false);
            }}
          />

          <InternTopicGradeTable
            dataTable={dataTable}
            presidentName={mockInternReviewCouncils[0].president}
            secretaryName={mockInternReviewCouncils[0].secretary}
            memberName={mockInternReviewCouncils[0].member}
            isEditTable={isEditTable}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as InternReviewDataItem[];
              setDataTable(localDataTable);
            }}
          />
        </>
      ) : (
        <div className="flex flex-wrap gap-4">
          {mockInternReviewCouncils.map((item) => (
            <div className="w-[49%]">
              <InternTopic
                topic={item}
                onClick={() => {
                  setIsGradeThesisReport(true);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewerInternReport;
