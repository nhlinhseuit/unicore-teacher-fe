"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import ExercisePostItem from "@/components/shared/PostItem/ExercisePostItem";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
import {
  mockDataGradingExercise,
  mockDataGradingReport,
  mockPostData,
} from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const Exercises = () => {
  const [isGrading, setIsGrading] = useState(false);
  const [isEditTable, setIsEditTable] = useState(false);

  return isGrading ? (
    <>
      <BackToPrev
        text="Quay lại danh sách bài tập"
        onClickPrev={() => {
          setIsGrading(false);
        }}
      />

      <div className="flex justify-between mb-6">
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">Bài tập ngày 29/08/2024</p>
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <Image
                src={"/assets/icons/info.svg"}
                width={18}
                height={18}
                alt={"edit"}
                className={`object-contain cursor-pointer`}
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-center truncate">
                Thông tin
              </span>
            </Dropdown.Header>
            <div className="scroll-container scroll-container-dropdown-content">
              <ul>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp bài:</span>
                    <span> 12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp trễ:</span>
                    <span>12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">
                      Thời hạn đóng bài nộp:
                    </span>
                    <span>12h SA 16/11/2024</span>
                  </button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>

        <div>
          {isEditTable ? (
            <IconButton
              text="Lưu"
              onClick={() => {
                setIsEditTable(false);
              }}
            />
          ) : (
            <IconButton
              text="Chấm điểm"
              green
              onClick={() => {
                setIsEditTable(true);
              }}
            />
          )}
        </div>
      </div>

      {/* //TODO: BÀI TẬP */}
      <GradingGroupTable
        isEditTable={isEditTable}
        isMultipleDelete={false}
        dataTable={mockDataGradingExercise}
      />

      {/* // ! TEST CODE */}
      <p className="mt-10 mb-10 paragraph-semibold">
        [TEST CODE] Báo cáo ngày 29/08/2024
      </p>

      {/* //TODO: BÁO CÁO */}
      <GradingGroupTable
        isEditTable={isEditTable}
        isMultipleDelete={false}
        dataTable={mockDataGradingReport}
      />
    </>
  ) : (
    <div className="mt-6 flex flex-col gap-4">
      {mockPostData.map((item, index) => (
        <ExercisePostItem
          key={item.id}
          id={item.id}
          creator={item.creator}
          createdAt={item.createdAt}
          title={item.title}
          fileName={item.fileName}
          comments={item.comments}
          setGrading={() => {
            setIsGrading(true);
          }}
        />
      ))}
    </div>
  );
};

export default Exercises;
