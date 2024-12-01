"use client";

import BorderButton from "@/components/shared/Button/BorderButton";
import IconButton from "@/components/shared/Button/IconButton";
import ExercisePostItem from "@/components/shared/PostItem/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/PostItem";
import ReportPostItem from "@/components/shared/PostItem/ReportPostItem";
import TableSearch from "@/components/shared/Search/TableSearch";
import { AnnouncementTabs, AnnouncementTypes, FilterType } from "@/constants";
import { mockPostDataWithReport } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BigExercise = () => {
  const pathName = usePathname();

  var typeFilter = FilterType.SortNewer;

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(
    AnnouncementTabs[0].value
  );

  const getRenderPostItem = (item: any): JSX.Element => {
    switch (item.typePost) {
      case "report":
        return (
          <ReportPostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
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
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
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
            fileName={item.fileName}
            comments={item.comments}
          />
        );
    }
  };

  return (
    <div>
      <div
        className="
        mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        {/* Search & Filter */}
        <div className="flex justify-start w-1/2">
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="pr-2 w-[75%]"
          />
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
                  // cancelDetailFilter();
                  // handleChooseFilter(FilterType.None);
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
                    // handleChooseFilter(FilterType.SortNewer)
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
                  // checked={typeFilter === FilterType.SortOlder}
                  checked={true}
                  id="SortOlder"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortOlder}
                  onChange={() => {
                    // handleChooseFilter(FilterType.SortOlder)
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
              {AnnouncementTypes.map((item) => (
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
      {/* AnnouncementTabs */}
      <div className="flex gap-2">
        {AnnouncementTabs.map((item) => {
          return (
            <BorderButton
              key={item.value}
              text={item.label}
              value={item.value}
              onClick={(value) => {
                setSelectedAnnouncement(value);
              }}
              isActive={selectedAnnouncement === item.value}
            />
          );
        })}
      </div>

      {/* PostList */}
      <div className="mt-6 flex flex-col gap-4">
        {mockPostDataWithReport.map((item, index) => {
          return getRenderPostItem(item);
        })}
      </div>
    </div>
  );
};

export default BigExercise;
