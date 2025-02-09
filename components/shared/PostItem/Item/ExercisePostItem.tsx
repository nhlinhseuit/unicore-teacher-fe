"use client";

import { getAvatarName } from "@/lib/utils";
import { mockSubmissionPost } from "@/mocks";
import Image from "next/image";
import MyAvatar from "../../../courses/MyAvatar";
import GradingInPost from "../../../courses/GradingInPost";
import MyComment from "../../../courses/MyComment";
import OtherComment from "../../../courses/OtherComment";
import RenderFile from "../../Annoucements/RenderFile";
import StatusButton from "../../Button/StatusButton";
import Divider from "../../Divider";
import { usePathname, useRouter } from "next/navigation";
import parse from "html-react-parser";

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
  desc: string;
  fileName: string;
  comments?: Comment[];
  setGrading: () => void;
  isOnlyView?: boolean;
}

const ExercisePostItem = (params: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <MyAvatar text={params.creator} />
          <p className="body-regular">{params.creator}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - {params.createdAt}
          </p>
          <StatusButton
            green
            text="Bài tập"
            smallText
            otherClasses="rounded-md ml-4"
            infoComponent={
              <ul className="text-white text-[12px] text-left">
                <li role="menuitem">
                  <span>
                    Thời hạn nộp bài: 12h SA 8/11/2024 - 11h30 SA 15/11/2024
                  </span>
                </li>
                <li role="menuitem">
                  <span>
                    Thời hạn nộp trễ: 12h SA 8/11/2024 - 11h30 SA 15/11/2024
                  </span>
                </li>
                <li role="menuitem">
                  <span>Thời hạn đóng bài nộp: 12h SA 16/11/2024</span>
                </li>
              </ul>
            }
          />
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
            onClick={() => {
              router.push(`${pathName}/edit-exercise?id=${params.id}`);
            }}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">{params.title}</p>
        <p className="body-regular mt-2 ml-2 ">{parse(params.desc)}</p>

        {/* //! KHI NÀO CÓ NỘP FILE  */}
        {/* <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-3 px-2"} /> */}

        {params.isOnlyView ? null : (
          <>
            <Divider />

            <GradingInPost
              setGrading={params.setGrading}
              submissionNumber={mockSubmissionPost.submissionNumber}
              totalNumber={mockSubmissionPost.totalNumber}
              lateTime={mockSubmissionPost.lateTime}
              columnGrade={mockSubmissionPost.columnGrade}
            />
          </>
        )}

        <Divider />

        {params.comments ? (
          <>
            <div className="flex flex-col gap-4">
              {params.comments.map((item, index) => (
                <OtherComment
                  key={`${item.id}_${index}`}
                  textAvatar={getAvatarName(item.author)}
                  name={item.author}
                  comment={item.content}
                />
              ))}
            </div>
            <Divider />
          </>
        ) : null}

        <MyComment textAvatar="HL" />
      </div>
    </div>
  );
};

export default ExercisePostItem;
