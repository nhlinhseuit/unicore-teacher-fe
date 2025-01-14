"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ExercisePostItem from "@/components/shared/PostItem/Item/ExercisePostItem";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
import {
  mockDataGradingExercise,
  mockDataGradingReport,
  mockPostData,
} from "@/mocks";
import { GradingExerciseDataItem, GradingReportDataItem } from "@/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  onClickPrev: () => void;
}

const GradeReportItem = (params: Props) => {
  const [isEditTable, setIsEditTable] = useState(false);

  const [dataTableGradingExercise, setDataTableGradingExercise] = useState<
    GradingExerciseDataItem[]
  >(mockDataGradingExercise);

  const [isEditTableReport, setIsEditTableReport] = useState(false);

  const [dataTableGradingReport, setDataTableGradingReport] = useState<
    GradingReportDataItem[]
  >(mockDataGradingReport);

  return (
    <>
      <BackToPrev
        text="Quay lại danh sách thông báo"
        onClickPrev={() => {
          params.onClickPrev();
        }}
      />

      <div className="flex justify-between mb-6">
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">Báo cáo ngày 29/08/2024</p>

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
                    <span className="font-semibold">Hình thức: </span>
                    <span>Nhóm</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp bài: </span>
                    <span> 12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp trễ: </span>
                    <span>12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">
                      Thời hạn đóng bài nộp:{" "}
                    </span>
                    <span>12h SA 16/11/2024</span>
                  </button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* //TODO: BÁO CÁO */}
      <GradingGroupTable
        isEditTable={isEditTableReport}
        dataTable={dataTableGradingReport}
        onClickEditTable={() => {
          setIsEditTableReport(true);
        }}
        onSaveEditTable={(localDataTable) => {
          setIsEditTableReport(false);
          // set lại data import hoặc patch API
          localDataTable = localDataTable as GradingReportDataItem[];
          setDataTableGradingReport(localDataTable);
        }}
      />
    </>
  );
};

export default GradeReportItem;
