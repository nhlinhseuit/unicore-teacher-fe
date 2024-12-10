"use client";

import { useState } from "react";
import BackToPrev from "@/components/shared/BackToPrev";
import ThesisTopic from "@/components/shared/ScoreReport/ThesisTopic";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockThesisCommentTickets, mockThesisCourseReview } from "@/mocks";
import { Dropdown } from "flowbite-react";
import IconButton from "@/components/shared/Button/IconButton";
import Image from "next/image";
import { ReviewThesisFilterType } from "@/constants";
import CommentTicket from "@/components/shared/ScoreReport/CommentTicket";
import ReviewForm from "../../../../components/shared/ScoreReport/ReviewForm";
import BorderContainer from "@/components/shared/BorderContainer";

const ReviewerThesisReport = () => {
  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);

  return (
    <>
      {isGradeThesisReport ? (
        <>
          <BackToPrev
            text="Quay lại danh sách đề tài"
            onClickPrev={() => {
              setIsGradeThesisReport(false);
            }}
          />
          <div className="flex gap-4">
            <div>
              <ReviewForm isReviewer={true} />
            </div>

            <div className="w-[40%] flex flex-col gap-4">
              <BorderContainer otherClasses={"p-6"}>
                <p className="paragraph-semibold mb-4">
                  Danh sách phiếu nhận xét
                </p>
                <div className="flex flex-col gap-2">
                  {mockThesisCommentTickets.map((item) => (
                    <CommentTicket
                      key={item.id}
                      id={item.id}
                      onClick={() => {
                        setIsGradeThesisReport(true);
                      }}
                      reviewer={item.reviewer}
                    />
                  ))}
                </div>
              </BorderContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          <TitleDescription
            title="Cán bộ phản biện nhận xét Khóa luận tốt nghiệp"
            description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
          />

          <div className="mt-6 mb-6 flex justify-start ml-10 w-1/2 items-center gap-4">
            <p className="inline-flex justify-start text-sm whitespace-nowrap">
              Bộ lọc danh sách đề tài
            </p>
            <Dropdown
              className="z-30 rounded-lg"
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div>
                  <IconButton
                    text={
                      selectedThesisStatus !== -1
                        ? ReviewThesisFilterType[selectedThesisStatus - 1].value
                        : "Chọn bộ lọc"
                    }
                    onClick={() => {}}
                    iconRight="/assets/icons/chevron-down.svg"
                    bgColor="bg-white"
                    textColor="text-black"
                    border
                  />
                </div>
              )}
            >
              <div className="scroll-container scroll-container-dropdown-content">
                {ReviewThesisFilterType.map((course, index) => (
                  <Dropdown.Item
                    key={`${course}_${index}`}
                    onClick={() => {
                      if (selectedThesisStatus === course.id) {
                        setSelectedThesisStatus(-1);
                      } else {
                        setSelectedThesisStatus(course.id);
                      }
                    }}
                  >
                    <div className="flex justify-between w-full gap-4">
                      <p className="text-left line-clamp-1">{course.value}</p>
                      {selectedThesisStatus === course.id && (
                        <Image
                          src="/assets/icons/check.svg"
                          alt="selected"
                          width={21}
                          height={21}
                          className="cursor-pointer mr-2"
                        />
                      )}
                    </div>
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-4">
            {mockThesisCourseReview.map((item) => (
              <ThesisTopic
                key={item.id}
                id={item.id}
                onClick={() => {
                  setIsGradeThesisReport(true);
                }}
                name={item.name}
                supervisor={item.supervisor}
                studentIds={item.studentIds}
                studentNames={item.names}
                reportAt={item.reportAt}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ReviewerThesisReport;
