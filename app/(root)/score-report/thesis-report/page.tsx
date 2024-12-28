"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import ThesisTopic from "@/components/shared/ScoreReport/ThesisTopic";
import ThesisTopicGradeTable from "@/components/shared/ScoreReport/ThesisTopicGradeTable/ThesisTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import {
  mockThesisReviewCouncils,
  mockThesisReviewTopic,
  mockThesisTopicGradeInCouncil,
} from "@/mocks";
import { ThesisTopicGradeDataItem } from "@/types";
import { useState } from "react";

const ReviewerThesisReport = () => {
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);
  const [isReviewingFormAndFormId, setIsReviewingFormAndFormId] = useState({
    formId: "",
    isReviewer: -1,
  });

  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState<ThesisTopicGradeDataItem[]>(
    mockThesisTopicGradeInCouncil
  );

  //! review form

  const getTopic = () => {
    return mockThesisReviewTopic.find(
      (item) => item.id === isReviewingFormAndFormId.formId
    );
  };
  const getReviewer = () => {
    return (
      mockThesisReviewTopic.find(
        (item) => item.id === isReviewingFormAndFormId.formId
      )?.reviewTeacher ?? ""
    );
  };

  return (
    <>
      <TitleDescription
        title="Nhập điểm hội đồng Khóa luận tốt nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      {isGradeThesisReport ? (
        isReviewingFormAndFormId.formId !== "" ? (
          <>
            <BackToPrev
              text="Quay lại nhập điểm hội đồng"
              onClickPrev={() => {
                setIsReviewingFormAndFormId({ formId: "", isReviewer: -1 });
              }}
            />
            <div className="flex gap-4">
              <div className="w-full">
                <ReviewForm
                  //@ts-ignore
                  topic={getTopic()}
                  ownerName={getReviewer()}
                  isReviewer={isReviewingFormAndFormId.isReviewer === 1}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <BackToPrev
              text={"Quay lại danh sách hội đồng"}
              onClickPrev={() => {
                setIsGradeThesisReport(false);
              }}
            />

            <ThesisTopicGradeTable
              isEditTable={isEditTable}
              dataTable={dataTable}
              onClickEditTable={() => {
                setIsEditTable(true);
              }}
              onSaveEditTable={(localDataTable) => {
                setIsEditTable(false);
                // set lại data import hoặc patch API
                localDataTable = localDataTable as ThesisTopicGradeDataItem[];
                setDataTable(localDataTable);
              }}
              onReviewForm={(formId: string, isReviewer: number) => {
                setIsReviewingFormAndFormId({
                  formId: formId,
                  isReviewer: isReviewer,
                });
              }}
            />
          </>
        )
      ) : (
        <div className="flex flex-wrap gap-4">
          {mockThesisReviewCouncils.map((item) => (
            <div className="w-[49%]">
              <ThesisTopic
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

export default ReviewerThesisReport;
