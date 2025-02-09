"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import LoadingComponent from "@/components/shared/LoadingComponent";
import GradeExerciseItem from "@/components/shared/PostItem/GradeItem/GradeExerciseItem";
import GradeReportItem from "@/components/shared/PostItem/GradeItem/GradeReportItem";
import ExercisePostItem from "@/components/shared/PostItem/Item/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/Item/PostItem";
import ReportPostItem from "@/components/shared/PostItem/Item/ReportPostItem";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import TableSearch from "@/components/shared/Search/TableSearch";
import NoResult from "@/components/shared/Status/NoResult";
import {
  AnnouncementTypes,
  AnnouncementTypesNotRegularCourse,
  FilterType,
} from "@/constants";
import { mockPostDataCourseIdPage, mockThesisReviewTopic } from "@/mocks";
import { fetchAnnoucements, fetchExercises } from "@/services/exerciseServices";
import { IAnnouncementResponseData } from "@/types/entity/Annoucement";
import { ITExerciseResponseData } from "@/types/entity/Exercise";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const pathName = usePathname();
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);
  const [isGradeExercise, setIsGradeExercise] = useState("");
  const [isGradeReport, setIsGradeReport] = useState(false);

  const [typeFilter, setTypeFilter] = useState(FilterType.None);

  //! CALL API để xem course này có phải có type là internCourse hay thesisCourse hay không
  const isNotRegularCourse = false;
  const renderAnnouncementTypes = isNotRegularCourse
    ? AnnouncementTypesNotRegularCourse
    : AnnouncementTypes;

  //? API: EXERCISE - REPORT - ANNOUCEMENT

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const annoucementTypes = [
    { id: 1, value: "Thông báo" },
    { id: 2, value: "Bài tập" },
    { id: 3, value: "Báo cáo" },
  ];

  const [selectedAnnoucementType, setSelectedAnnoucementType] = useState(2);

  const [exercises, setExercises] = useState<ITExerciseResponseData[]>([]);
  const [annoucements, setAnnoucements] = useState<IAnnouncementResponseData[]>(
    []
  );

  const mockParams = {
    class_id: "678e0290551a4b14f9d22bed",
    subclass_code: "SE113.O21.PMCL",
  };

  const mockParamsClass_id = "678e0290551a4b14f9d22bed";

  // useEffect(() => {
  //   if (selectedAnnoucementType === 1) fetchAnnoucementsAPI();
  // }, []);

  useEffect(() => {
    if (selectedAnnoucementType === 1 && annoucements.length === 0)
      fetchAnnoucementsAPI();
    if (selectedAnnoucementType === 2 && exercises.length === 0)
      fetchExercisesAPI();
    // if (selectedAnnoucementType === 3 && exercises.length === 0) fetchReportsAPI();
  }, [selectedAnnoucementType]);

  const fetchExercisesAPI = () => {
    setIsLoading(true);

    fetchExercises(mockParams)
      .then((data: any) => {
        console.log("fetchExercises data", data);
        setExercises(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };
  const fetchReportsAPI = () => {
    // setIsLoading(true)
    // fetchExercises(mockParams)
    //   .then((data: any) => {
    //     console.log("fetchExercises data", data);
    //     setExercises(data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setIsLoading(false);
    //   });
  };
  const fetchAnnoucementsAPI = () => {
    setIsLoading(true);

    fetchAnnoucements(mockParamsClass_id)
      .then((data: any) => {
        console.log("fetchAnnoucements", data);
        setAnnoucements(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const getRenderItems = (): JSX.Element => {
    switch (selectedAnnoucementType) {
      case 1:
        return annoucements.length > 0 ? (
          <>
            {annoucements.map((item, index) => {
              console.log("case item", item);
              return (
                <PostItem
                  key={item.id}
                  id={item.id}
                  creator={item.create_by}
                  createdAt={item.created_date}
                  title={item.name}
                  desc={item.description}
                  fileName={""}
                  // comments={}
                />
              );
            })}
          </>
        ) : (
          <NoResult
            title="Không có thông báo lớp học!"
            description="🚀 Thử tải lại trang để xem thông báo lớp học."
          />
        );

      case 2:
        return exercises.length > 0 ? (
          <>
            {exercises.map((item, index) => {
              return (
                <ExercisePostItem
                  key={item.id}
                  id={item.id}
                  creator={item.created_by}
                  createdAt={item.created_date}
                  title={item.name}
                  desc={item.description}
                  fileName={item.attachment_url}
                  setGrading={() => {
                    setIsGradeExercise(item.id);
                  }}
                />
              );
            })}
          </>
        ) : (
          <NoResult
            title="Không có bài tập lớp học!"
            description="🚀 Thử tải lại trang để xem bài tập lớp học."
          />
        );
      default:
        return <NoResult title="Không có thông báo lớp học!" description="" />;
    }
  };

  const getRenderPostItem = (item: any): JSX.Element => {
    switch (item.typePost) {
      case "report":
        return (
          //TODO: báo cáo và Báo cáo khóa luận tốt nghiệp có nhập điểm...

          //? Ở đây có thể là Chấm điểm báo cáo hoặc Nhận xét khóa luận / hội đồng
          <ReportPostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
            isFinalReport={item.isFinalReport}
            setGrading={() => {
              // if (item.isFinalReport) setIsGradeThesisReport(true);
              setIsGradeReport(true);
            }}
          />
        );
      case "exercise":
        return (
          <ExercisePostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              setIsGradeExercise("1");
            }}
          />
        );
      case "announcement":
      default:
        return (
          <PostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            desc={item.title}
            fileName={item.fileName}
            comments={item.comments}
          />
        );
    }
  };

  const cancelDetailFilter = () => {
    setTypeFilter(FilterType.None);
  };

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

  const [isReviewingFormAndFormId, setIsReviewingFormAndFormId] = useState({
    formId: "",
    isReviewer: -1,
  });

  return isGradeThesisReport ? (
    <>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={() => {
          setIsGradeThesisReport(false);
        }}
      />
      <ReviewForm
        //@ts-ignore
        topic={getTopic()}
        ownerName={getReviewer()}
        isReviewer={isReviewingFormAndFormId.isReviewer === 1}
      />
    </>
  ) : isGradeExercise !== "" ? (
    <GradeExerciseItem
      onClickPrev={() => {
        setIsGradeExercise("");
      }}
      exerciseId={isGradeExercise}
    />
  ) : isGradeReport ? (
    <GradeReportItem
      onClickPrev={() => {
        setIsGradeReport(false);
      }}
    />
  ) : (
    <div>
      {isLoading ? <LoadingComponent /> : null}
      <div
        className="
        mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        {/* Search & Filter */}
        <div className="flex items-center gap-2 justify-start w-2/3">
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="w-[50%]"
          />

          <Dropdown
            className="z-30 rounded-lg w-[25%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text={`${
                    annoucementTypes[selectedAnnoucementType - 1].value
                  }`}
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                />
              </div>
            )}
          >
            <div className="w-full scroll-container scroll-container-dropdown-content">
              {annoucementTypes.map((type, index) => (
                <Dropdown.Item
                  key={`${type.id}_${index}`}
                  onClick={() => {
                    if (selectedAnnoucementType === type.id) {
                      setSelectedAnnoucementType(1);
                    } else {
                      setSelectedAnnoucementType(type.id);
                    }
                  }}
                  className="min-w-max"
                >
                  <div className="flex justify-between w-full">
                    <p className="w-[80%] text-left line-clamp-1">
                      {type.value}
                    </p>
                    {selectedAnnoucementType === type.id ? (
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

          <Dropdown
            className="z-30 rounded-lg w-[25%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text="Bộ lọc"
                  iconLeft={
                    typeFilter === FilterType.None
                      ? "/assets/icons/filter.svg"
                      : "/assets/icons/filter_active.svg"
                  }
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                />
              </div>
            )}
          >
            <Dropdown.Header>
              <span
                onClick={() => {
                  cancelDetailFilter();
                }}
                className="block truncate text-sm font-medium cursor-pointer"
              >
                Bỏ bộ lọc
              </span>
            </Dropdown.Header>
            <ul className=" text-sm" aria-labelledby="filterDropdownButton">
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  checked={typeFilter === FilterType.SortNewer}
                  id="SortNewer"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortNewer}
                  onChange={() => {
                    setTypeFilter(FilterType.SortNewer);
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortNewer"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Mới nhất
                </label>
              </li>
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  checked={typeFilter === FilterType.SortOlder}
                  id="SortOlder"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortOlder}
                  onChange={() => {
                    setTypeFilter(FilterType.SortOlder);
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortOlder"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Cũ nhất
                </label>
              </li>
            </ul>
          </Dropdown>
        </div>

        {/* Create announcement */}
        <div>
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="w-full">
                <div>
                  <IconButton
                    text="Tạo thông báo"
                    iconLeft="/assets/icons/add.svg"
                  />
                </div>
              </div>
            )}
          >
            <div className="w-full">
              {renderAnnouncementTypes.map((item) => (
                <Link
                  key={`${pathName}${item.route}`}
                  href={`${pathName}${item.route}`}
                >
                  <Dropdown.Item>{item.label}</Dropdown.Item>
                </Link>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* PostList */}
      <div className="mt-6 flex flex-col gap-4">
        {/* //! mockParams */}
        {/* {mockPostDataCourseIdPage.map((item, index) => {
          return getRenderPostItem(item);
        })} */}

        {!isLoading ? getRenderItems() : null}
      </div>
    </div>
  );
};

export default page;
