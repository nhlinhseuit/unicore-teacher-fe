"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ReviewPost from "@/components/shared/ScoreReport/ReviewPost";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockThesisCourseReview } from "@/mocks";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import ReviewForm from "../../../../components/shared/ScoreReport/ReviewForm";
import IconButton from "@/components/shared/Button/IconButton";
import Image from "next/image";
import { ReviewThesisFilterType } from "@/constants";

const ReviewerThesisReport = () => {
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);
  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);

  

  return (
    <>
      {isGradeThesisReport ? (
        <div>
          <BackToPrev
            text={"Quay lại danh sách thông báo"}
            onClickPrev={() => {
              setIsGradeThesisReport(false);
            }}
          />
          <ReviewForm isReviewer={false} />
        </div>
      ) : (
        <>
          <TitleDescription
            title="Cán bộ hướng dẫn nhận xét Khóa luận tốt nghiệp"
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
                    text={`${
                      selectedThesisStatus !== -1
                        ? ReviewThesisFilterType[selectedThesisStatus - 1].value
                        : "Chọn bộ lọc"
                    }`}
                    onClick={() => {}}
                    iconRight={"/assets/icons/chevron-down.svg"}
                    bgColor="bg-white"
                    textColor="text-black"
                    border
                  />
                </div>
              )}
            >
              <div className="scroll-container scroll-container-dropdown-content">
                {ReviewThesisFilterType.map((course: any, index) => (
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
                      {selectedThesisStatus === course.id ? (
                        <Image
                          src="/assets/icons/check.svg"
                          alt="search"
                          width={21}
                          height={21}
                          className="cursor-pointer mr-2"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-4">
            {mockThesisCourseReview.map((item) => (
              <ReviewPost
                id={item.id}
                onClick={() => {
                  setIsGradeThesisReport(true);
                }}
                name={item.name}
                supervisor={item.supervisor}
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
