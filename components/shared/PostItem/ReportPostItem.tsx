import { getAvatarName } from "@/lib/utils";
import { mockSubmissionPost } from "@/mocks";
import Image from "next/image";
import MyAvatar from "../../courses/MyAvatar";
import GradingInPost from "../../courses/GradingInPost";
import MyComment from "../../courses/MyComment";
import OtherComment from "../../courses/OtherComment";
import RenderFile from "../Annoucements/RenderFile";
import StatusButton from "../Button/StatusButton";
import Divider from "../Divider";

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

const ReportPostItem = (params: Props) => {
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <MyAvatar text="MT" />
          <p className="body-regular">{params.creator}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - {params.createdAt}
          </p>
          <StatusButton
            orange
            text="Báo cáo"
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
          />
        </div>

        <div className=" mt-3 ml-2 flex gap-4 items-center">
          <p className="base-regular">{params.title}</p>
        </div>

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

export default ReportPostItem;
