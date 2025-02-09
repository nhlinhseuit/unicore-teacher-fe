"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import ThesisReviewTicketTable from "@/components/shared/ScoreReport/ThesisReviewTicketTable/ThesisTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import ToggleTitle from "@/components/shared/ToggleTitle";
import {
  mockSupervisorThesisReviewTicket,
  mockReviewerThesisReviewTicket,
  mockThesisReviewTopic,
} from "@/mocks";
import {
  SupervisorThesisReviewTicketDataItem,
  ReviewerThesisReviewTicketDataItem,
} from "@/types";
import { useState } from "react";

const page = () => {
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);
  const [isToggleSupervisorTopic, setIsToggleSupervisorTopic] = useState(true);
  const [isToggleReviewerTopic, setIsToggleReviewerTopic] = useState(true);

  const [isReviewingFormAndFormId, setIsReviewingFormAndFormId] = useState({
    formId: "",
    isReviewer: -1,
  });

  console.log("isReviewingFormAndFormId", isReviewingFormAndFormId);

  //! TABLE
  const [isEditTableSupervisor, setIsEditTableSupervisor] = useState(false);
  const [isEditTableReviewer, setIsEditTableReviewer] = useState(false);
  const [dataTableSupervisor, setDataTableSupervisor] = useState<
    SupervisorThesisReviewTicketDataItem[]
  >(mockSupervisorThesisReviewTicket);
  const [dataTableReviewer, setDataTableReviewer] = useState<
    ReviewerThesisReviewTicketDataItem[]
  >(mockReviewerThesisReviewTicket);

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
        title="Nhập phiếu nhận xét Khóa luận tốt nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      {isReviewingFormAndFormId.formId !== "" ? (
        <>
          <BackToPrev
            text="Quay lại danh sách phiếu nhận xét"
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
          <ToggleTitle
            text="Phiếu nhận giảng viên hướng dẫn"
            handleClick={() => {
              setIsToggleSupervisorTopic(!isToggleSupervisorTopic);
            }}
            value={isToggleSupervisorTopic}
          />

          {isToggleSupervisorTopic ? (
            <ThesisReviewTicketTable
              type="supervisor"
              isEditTable={isEditTableSupervisor}
              dataTable={dataTableSupervisor}
              onClickEditTable={() => {
                setIsEditTableSupervisor(true);
              }}
              onSaveEditTable={(localDataTable) => {
                setIsEditTableSupervisor(false);
                // set lại data import hoặc patch API
                localDataTable =
                  localDataTable as SupervisorThesisReviewTicketDataItem[];
                setDataTableSupervisor(localDataTable);
              }}
              onReviewForm={(formId: string, isReviewer: number) => {
                setIsReviewingFormAndFormId({
                  formId: formId,
                  isReviewer: isReviewer,
                });
              }}
            />
          ) : null}

          <div className="mt-10">
            <ToggleTitle
              text="Phiếu nhận giảng viên phản biện"
              handleClick={() => {
                setIsToggleReviewerTopic(!isToggleReviewerTopic);
              }}
              value={isToggleReviewerTopic}
            />
          </div>

          {isToggleReviewerTopic ? (
            <ThesisReviewTicketTable
              type="reviewer"
              isEditTable={isEditTableReviewer}
              dataTable={dataTableReviewer}
              onClickEditTable={() => {
                setIsEditTableReviewer(true);
              }}
              onSaveEditTable={(localDataTable) => {
                setIsEditTableReviewer(false);
                // set lại data import hoặc patch API
                localDataTable =
                  localDataTable as ReviewerThesisReviewTicketDataItem[];
                setDataTableReviewer(localDataTable);
              }}
              onReviewForm={(formId: string, isReviewer: number) => {
                setIsReviewingFormAndFormId({
                  formId: formId,
                  isReviewer: isReviewer,
                });
              }}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default page;
