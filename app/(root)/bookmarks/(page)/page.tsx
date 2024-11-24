"use client";

import BorderButton from "@/components/shared/Button/BorderButton";
import ExercisePostItem from "@/components/shared/PostItem/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/PostItem";
import ReportPostItem from "@/components/shared/PostItem/ReportPostItem";
import ShowOriginPostContainer from "@/components/shared/ShowOriginPostContainer";
import { BookmarksTabs } from "@/constants";
import { mockPostDataCourseIdPage } from "@/mocks";
import { useState } from "react";

const Bookmarks = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(
    BookmarksTabs[0].value
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
      {/* ReviewTabs */}
      <div className="mt-6 flex gap-2">
        {BookmarksTabs.map((item) => {
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
