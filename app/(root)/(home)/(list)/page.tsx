"use client";

import Announcement from "@/components/announcements/Announcement";
import IconButton from "@/components/shared/Button/IconButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import CategorySideBar from "@/components/shared/Sidebar/CategorySideBar";
import NoResult from "@/components/shared/Status/NoResult";
import { FilterType, AnnouncementsFilterType } from "@/constants";
import { mockAnnouncementLists } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";



const Home = () => {
  var typeFilter = FilterType.SortNewer;
  const [selectedAnnouncementType, setSelectedAnnouncementType] = useState(-1);


  return (
    <>
      <div
        className="
      mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        <div className="flex justify-start w-2/3">
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="pr-2 w-[50%]"
          />

          <Dropdown
            className="z-30 rounded-lg w-[25%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text="Bộ lọc thời gian"
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                  otherClasses="mr-2"
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

          <Dropdown
            className="z-30 rounded-lg"
            label=""
            dismissOnClick={true}
            renderTrigger={() => (
              <div>
                <IconButton
                  text={`${
                    selectedAnnouncementType !== -1
                      ? AnnouncementsFilterType[selectedAnnouncementType].value
                      : "Bộ lọc thông báo"
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
              {AnnouncementsFilterType.map((course: any, index) => (
                <Dropdown.Item
                  key={`${course}_${index}`}
                  onClick={() => {
                    if (selectedAnnouncementType === course.id) {
                      setSelectedAnnouncementType(-1);
                    } else {
                      setSelectedAnnouncementType(course.id);
                    }
                  }}
                >
                  <div className="flex justify-between w-full gap-4">
                    <p className="text-left line-clamp-1">{course.value}</p>
                    {selectedAnnouncementType === course.id ? (
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
      </div>

      {/* LIST ANNOUNCEMENTS */}
      <div className="flex">
        <div className="w-[80%] max-lg:w-full flex flex-col gap-4">
          {mockAnnouncementLists.length > 0 ? (
            mockAnnouncementLists.map((question) => (
              <Announcement
                key={question._id}
                _id={question._id}
                title={question.title}
                description={question.description}
                tags={question.tags}
                files={question.files}
                author={question.author}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="There's no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
              link="/ask-question"
              linkTitle="Ask a question"
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-[20%] max-lg:hidden ml-2">
          <CategorySideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
