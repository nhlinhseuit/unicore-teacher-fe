"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import CreateBigExercise from "@/components/shared/BigExercise/CreateBigExercise";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import LoadingComponent from "@/components/shared/LoadingComponent";
import ToggleTitle from "@/components/shared/ToggleTitle";
import {
  fetchCentralizedExamInClass,
  fetchProjectsInClass,
} from "@/services/projectServices";
import { ICentralizedTestResponseData } from "@/types/entity/CentralizedTest";
import { ITProjectResponseData, WeightType } from "@/types/entity/Project";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  endTopicImportTimeAtom,
  projectIdAtom,
  startTopicImportTimeAtom,
} from "../../../(courses)/(store)/courseStore";

const BigExercises = () => {
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<ITProjectResponseData[]>([]);
  const [centralizedExams, setCentralizedExams] = useState<
    ICentralizedTestResponseData[]
  >([]);

  const [fakeAPICentralizedExam, setfakeAPICentralizedExam] =
    useState<ICentralizedTestResponseData>();

  const mockParams1 = {
    class_id: "678e0290551a4b14f9d22bed",
    subclass_code: "SE113.O21.PMCL",
  };

  // const mockParams2 = {
  //   class_id: "6780ff6e854d3e02e4191716",
  //   subclass_code: "IT001.O21.CLC",
  // };

  useEffect(() => {
    let pendingRequests = 2; // Theo dõi số lượng lời gọi đang xử lý
    setIsLoading(true);

    fetchProjectsInClass(mockParams1)
      .then((data: any) => {
        setProjects(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        pendingRequests -= 1;
        if (pendingRequests === 0) {
          setIsLoading(false);
        }

        //! fake API
        pendingRequests -= 1;
        setfakeAPICentralizedExam({
          id: "1",
          weight: 20,
          name: "Thi cuối kỳ",
          description: "1",
          place: "1",
          date: "1",
          eventType: "1",
          created_date: "9/2/2025",
          modified_date: "1",
          created_by: "Trần Hạnh Xuân",
          modified_by: "1",
          in_group: true,
          weight_type: WeightType.FINAL_TERM,
          class_id: "1",
          subclass_code: "1",
          allow_grade_review: true,
          review_times: 2,
        });
      });

    //! fake API

    // fetchCentralizedExamInClass(mockParams1)
    //   .then((data: any) => {
    //     console.log("fetchCentralizedExamInClass", data);
    //     setCentralizedExams(data);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   })
    //   .finally(() => {
    //     pendingRequests -= 1;
    //     if (pendingRequests === 0) {
    //       setIsLoading(false);
    //     }
    //   });

    //     setCentralizedExams(data);
  }, []);

  const [isCreate, setIsCreate] = useState(false);
  const [isToggleShowCentralizedExam, setIsToggleShowCentralizedExam] =
    useState(true);
  const [isToggleShowReportSchedule, setIsToggleShowReportSchedule] =
    useState(true);
  const [isToggleShowBigExercise, setIsToggleShowBigExercise] = useState(true);

  const mockReportOptions = [
    {
      id: 0,
      value: "Ngày 3/10, 7h30h - 8h",
      groups: ["Nhóm 1", "Nhóm 2"],
    },
    {
      id: 1,
      value: "Ngày 3/10, 8h - 8h30",
      groups: ["Nhóm 3", "Nhóm 4"],
    },
    {
      id: 2,
      value: "Ngày 3/10, 9h - 9h30",
      groups: ["Nhóm 5", "Nhóm 6"],
    },
    {
      id: 3,
      value: "Ngày 3/10, 10h - 10h30",
      groups: ["Nhóm 7", "Nhóm 8"],
    },
  ];

  const [, setProjectId] = useAtom(projectIdAtom);
  const [, setStartTopicImportTime] = useAtom(startTopicImportTimeAtom);
  const [, setEndTopicImportTime] = useAtom(endTopicImportTimeAtom);

  const router = useRouter();

  return (
    <div>
      {isLoading ? <LoadingComponent /> : null}
      {isCreate ? (
        <>
          <BackToPrev
            text={"Quay lại danh sách bài tập lớn"}
            onClickPrev={() => {
              setIsCreate(false);
            }}
          />

          <CreateBigExercise
            navigateBack={() => {
              setIsCreate(false);
            }}
          />
        </>
      ) : (
        <>
          <div className="flex justify-end mt-4 mb-4">
            <IconButton
              text="Tạo bài tập lớn"
              iconLeft="/assets/icons/add.svg"
              onClick={() => {
                setIsCreate(true);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ToggleTitle
              text="Lịch báo cáo đồ án"
              handleClick={() => {
                setIsToggleShowReportSchedule(!isToggleShowReportSchedule);
              }}
              value={isToggleShowReportSchedule}
            />
            {isToggleShowReportSchedule ? (
              <BorderContainer otherClasses="p-6 flex flex-col gap-4">
                {mockReportOptions.map((item, index) => (
                  <div key={index}>
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                      <span className="font-semibold">
                        {item.id + 1}. {item.value}:{" "}
                      </span>
                      {item.groups.join(", ")}
                    </label>
                  </div>
                ))}
              </BorderContainer>
            ) : null}

            <ToggleTitle
              text="Thi tập trung"
              handleClick={() => {
                setIsToggleShowCentralizedExam(!isToggleShowCentralizedExam);
              }}
              value={isToggleShowCentralizedExam}
            />
            {isToggleShowCentralizedExam && fakeAPICentralizedExam ? (
              //! fakeAPI
              <BigExerciseItem
                isCentralizedExam
                id={fakeAPICentralizedExam.id}
                name={fakeAPICentralizedExam.name}
                creator={fakeAPICentralizedExam.created_by}
                createdAt={fakeAPICentralizedExam.created_date}
                deadline={fakeAPICentralizedExam.date}
                onClick={() => {}}
              />
            ) : null}

            <ToggleTitle
              text="Bài tập lớn"
              handleClick={() => {
                setIsToggleShowBigExercise(!isToggleShowBigExercise);
              }}
              value={isToggleShowBigExercise}
            />
            {isToggleShowBigExercise
              ? projects.map((item) => (
                  <BigExerciseItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    creator={item.created_by}
                    createdAt={item.created_date}
                    happeningEvent={""}
                    deadline={""}
                    onClick={() => {
                      setProjectId(item.id);
                      setStartTopicImportTime(item?.start_topic_import_time);
                      setEndTopicImportTime(item?.end_topic_import_time);

                      router.push(`${pathName}/big-exercises/${item.id}`);
                    }}
                  />
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};

export default BigExercises;
