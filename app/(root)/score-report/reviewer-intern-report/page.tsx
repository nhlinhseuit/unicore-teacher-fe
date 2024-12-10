"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import InternTopic from "@/components/shared/ScoreReport/InternTopic";
import InternTopicGradeTable from "@/components/shared/ScoreReport/InternTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import { ReviewInternFilterType } from "@/constants";
import { mockInternReviewDetail, mockInternReviewTopic } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const ReviewerInternReport = () => {
  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);

  return (
    <>
      {isGradeThesisReport ? (
        <>
          <BackToPrev
            text={"Quay lại danh sách đề tài"}
            onClickPrev={() => {
              setIsGradeThesisReport(false);
            }}
          />

          <InternTopicGradeTable
            dataTable={mockInternReviewDetail}
            isEditTable={true}
          />
          <IconButton text="Lưu" otherClasses="mt-4" />
        </>
      ) : (
        <>
          <TitleDescription
            title="Cán bộ chấm điểm báo cáo thực tập doanh nghiệp"
            description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
          />

          <div className="mt-6 mb-6 flex justify-start ml-10 w-1/2 items-center gap-4">
            <p className="inline-flex justify-start text-sm whitespace-nowrap">
              Bộ lọc
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
                        ? ReviewInternFilterType[selectedThesisStatus - 1].value
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
                {ReviewInternFilterType.map((course, index) => (
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
            {mockInternReviewTopic.map((item) => (
              <InternTopic
                key={item.id}
                id={item.id}
                onClick={() => {
                  setIsGradeThesisReport(true);
                }}
                name={item.name}
                supervisor={item.supervisor}
                studentId={item.studentId}
                studentName={item.studentName}
                reportAt={item.reportAt}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ReviewerInternReport;
