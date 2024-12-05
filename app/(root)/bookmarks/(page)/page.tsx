"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ExercisePostItem from "@/components/shared/PostItem/Item/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/Item/PostItem";
import ReportPostItem from "@/components/shared/PostItem/Item/ReportPostItem";
import ShowOriginPostContainer from "@/components/shared/ShowOriginPostContainer";
import { mockBookmarkOptions, mockPostDataCourseIdPage } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const Bookmarks = () => {

  const [selectedBookmarkOption, setSelectedBookmarkOption] = useState(1);

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
                  selectedBookmarkOption !== -1
                    ? mockBookmarkOptions[selectedBookmarkOption - 1].value
                    : "Chọn lớp"
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
            {mockBookmarkOptions.map((course: any, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedBookmarkOption === course.id) {
                    setSelectedBookmarkOption(-1);
                  } else {
                    setSelectedBookmarkOption(course.id);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedBookmarkOption === course.id ? (
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

      {/* PostList */}
      <div className="mt-6 flex flex-col gap-8">
        {mockPostDataCourseIdPage.map((item) => {
          return (
            <ShowOriginPostContainer key={item.id}>
              {getRenderPostItem(item)}
            </ShowOriginPostContainer>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
