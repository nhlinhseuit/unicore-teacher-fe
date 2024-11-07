import React from "react";
import Image from "next/image";
import RenderFile from "../shared/Annoucements/RenderFile";
import Avatar from "./Avatar";
import OtherComment from "./OtherComment";
import MyComment from "./MyComment";
import Divider from "../shared/Divider";
import { getAvatarName } from "@/lib/utils";
import GradingInPost from "./GradingInPost";

interface Comment {
  id: string;
  author: string;
  content: string;
}

interface Props {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  fileName: string;
  comments: Comment[];
  setGrading: () => void;
}

const ExercisePostItem = (params: Props) => {
  const mockSubmissionPost = {
    submissionNumber: 60,
    totalNumber: 62,
    lateTime: "2 ngày 12 tiếng",
    columnGrade: "Quá trình",
  };

  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <Avatar text="MT" />
          <p className="body-regular">{params.creator}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - {params.createdAt}
          </p>
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">{params.title}</p>

        <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-2 px-2"} />

        <Divider />

        <GradingInPost
          onClickBack={params.setGrading}
          submissionNumber={mockSubmissionPost.submissionNumber}
          totalNumber={mockSubmissionPost.totalNumber}
          lateTime={mockSubmissionPost.lateTime}
          columnGrade={mockSubmissionPost.columnGrade}
        />

        <Divider />

        <div className="flex flex-col gap-4">
          {params.comments.map((item, index) => (
            <OtherComment
              key={item.id}
              textAvatar={getAvatarName(item.author)}
              name={item.author}
              comment={item.content}
            />
          ))}
        </div>

        <Divider />

        <MyComment textAvatar="HL" />
      </div>
    </div>
  );
};

export default ExercisePostItem;
