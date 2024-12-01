"use client";

import Announcement from "@/components/announcements/Announcement";
import NoResult from "@/components/shared/Status/NoResult";
import BorderButton from "@/components/shared/Button/BorderButton";
import { AnnouncementTabs, FilterType } from "@/constants";
import { useState } from "react";
import CategorySideBar from "@/components/shared/Sidebar/CategorySideBar";
import MiniButton from "@/components/shared/Button/MiniButton";
import IconButton from "@/components/shared/Button/IconButton";
import Link from "next/link";
import Image from "next/image";
import FilterAnnoucements from "@/components/shared/Annoucements/FilterAnnoucements";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import { mockAnnouncementLists } from "@/mocks";



const Home = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(
    AnnouncementTabs[0].value
  );
  const [selectedMiniButton, setSelectedMiniButton] = useState(-1);

  var typeFilter = FilterType.SortNewer;

  return (
    <>
      {/* // ! SEARCH & FILTER */}
      {/* <div
        className="
      mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
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

        <Link href="/create-announcement">
          <IconButton text="Tạo thông báo" iconLeft="/assets/icons/add.svg" />
        </Link>
      </div> */}

      {/* AnnouncementTabs */}
      <div className="flex justify-between items-center">
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

        <div className="flex gap-1">
          {selectedMiniButton === 1 ? (
            <ClosedButton
              onClose={() => {
                setSelectedMiniButton(-1);
              }}
            >
              <TableSearch setSearchTerm={() => {}} searchTerm={""} />
            </ClosedButton>
          ) : (
            <MiniButton
              key={1}
              value={1}
              icon={"/assets/icons/search.svg"}
              iconColor={"invert"}
              onClick={(value) => {
                setSelectedMiniButton(value);
              }}
            />
          )}

          {selectedMiniButton === 2 ? (
            <div className="">
              <ClosedButton
                onClose={() => {
                  setSelectedMiniButton(-1);
                }}
              >
                <FilterAnnoucements typeFilter={typeFilter} />
              </ClosedButton>
            </div>
          ) : (
            <MiniButton
              key={2}
              value={2}
              icon={"/assets/icons/filter.svg"}
              onClick={(value) => {
                setSelectedMiniButton(value);
              }}
            />
          )}

          {selectedMiniButton === 3 ? (
            <ClosedButton
              onClose={() => {
                setSelectedMiniButton(-1);
              }}
            >
              <Link href="/create-announcement">
                <IconButton
                  text="Tạo thông báo"
                  iconLeft="/assets/icons/add.svg"
                />
              </Link>
            </ClosedButton>
          ) : (
            <MiniButton
              key={3}
              value={3}
              icon={"/assets/icons/add.svg"}
              bgColor="bg-primary-500"
              onClick={(value) => {
                setSelectedMiniButton(value);
              }}
            />
          )}
        </div>
      </div>

      {/* LIST ANNOUNCEMENTS */}
      <div className="flex">
        <div className="w-[80%] max-lg:w-full mt-6 flex flex-col gap-4">
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
        <div className="w-[20%] max-lg:hidden mt-6 ml-2">
          <CategorySideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
