"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import GradingGroupTable from "@/components/shared/Table/TableGrading/GradingGroupTable";
import { mockDataGradingExercise, mockDataGradingReport } from "@/mocks";
import { fetchDetailExercise } from "@/services/exerciseServices";
import { GradingExerciseDataItem, GradingReportDataItem } from "@/types";
import { ITExerciseResponseData } from "@/types/entity/Exercise";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingComponent from "../../LoadingComponent";
import { parseISODateToDisplayDate } from "@/utils/dateTimeUtil";

interface Props {
  exerciseId: string;
  onClickPrev: () => void;
}

const GradeExerciseItem = (params: Props) => {
  const [isEditTable, setIsEditTable] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState<ITExerciseResponseData>();

  useEffect(() => {
    console.log("exerciseId", params.exerciseId);

    if (params.exerciseId !== "")
      fetchDetailExercise(params.exerciseId)
        .then((data: ITExerciseResponseData) => {
          console.log("fetchDetailExercise", data);

          setExercise(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
  }, []);

  //

  const [dataTableGradingExercise, setDataTableGradingExercise] = useState<
    GradingExerciseDataItem[]
  >(mockDataGradingExercise);

  const [isEditTableReport, setIsEditTableReport] = useState(false);

  const [dataTableGradingReport, setDataTableGradingReport] = useState<
    GradingReportDataItem[]
  >(mockDataGradingReport);

  return (
    <>
      {isLoading ? <LoadingComponent /> : null}
      <BackToPrev
        text="Quay lại danh sách thông báo"
        onClickPrev={() => {
          params.onClickPrev();
        }}
      />

      <div className="flex justify-between mb-6">
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">{exercise?.name}</p>
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
                    className="flex items-center justify-start gap-2 w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">{"Hình thức: "}</span>
                    <span>{exercise?.in_group ? "Nhóm" : "Cá nhân"}</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start gap-2 w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp bài: </span>
                    <span>
                      {parseISODateToDisplayDate(exercise?.start_date ?? "")} -{" "}
                      {parseISODateToDisplayDate(exercise?.end_date ?? "")}
                    </span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start gap-2 w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">
                      Thời hạn đóng bài nộp:{" "}
                    </span>
                    <span>
                      {parseISODateToDisplayDate(
                        exercise?.close_submission_date ?? ""
                      )}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* //TODO: BÀI TẬP */}
      <GradingGroupTable
        isEditTable={isEditTable}
        dataTable={dataTableGradingExercise}
        onClickEditTable={() => {
          setIsEditTable(true);
        }}
        onSaveEditTable={(localDataTable) => {
          setIsEditTable(false);
          // set lại data import hoặc patch API
          localDataTable = localDataTable as GradingExerciseDataItem[];

          setDataTableGradingExercise(localDataTable);
        }}
      />

      {/* <p className="mt-10 mb-10 paragraph-semibold">
        [TEST CODE] Báo cáo ngày 29/08/2024
      </p> */}

      {/* //TODO: BÁO CÁO */}
      {/* <GradingGroupTable
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
      /> */}
    </>
  );
};

export default GradeExerciseItem;
