import MyAvatar from "@/components/courses/MyAvatar";
import { getAvatarName } from "@/lib/utils";
import { mockSubmissionPost } from "@/mocks";
import Image from "next/image";
import StatusButton from "../../Button/StatusButton";
import RenderFile from "../../Annoucements/RenderFile";
import Divider from "../../Divider";
import GradingInPost from "@/components/courses/GradingInPost";
import OtherComment from "@/components/courses/OtherComment";
import MyComment from "@/components/courses/MyComment";
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
  isFinalReport?: boolean;
  isOnlyView?: boolean;
}

const ReportPostItem = (params: Props) => {
  const router = useRouter();
  const pathName = usePathname();

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
            onClick={() => {
              console.log("123123");
              const id = "67813602b925f9491c589889";

              router.push(`${pathName}/edit-report?id=${id}`);
            }}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">{params.title}</p>
        <p className="body-regular mt-2 ml-2 ">{parse(params.desc)}</p>

        <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-3 px-2"} />

        {params.isOnlyView ? null : (
          <>
            <Divider />

            <GradingInPost
              isFinalReport={params.isFinalReport}
              setGrading={params.setGrading}
              submissionNumber={mockSubmissionPost.submissionNumber}
              totalNumber={mockSubmissionPost.totalNumber}
              lateTime={mockSubmissionPost.lateTime}
              columnGrade={mockSubmissionPost.columnGrade}
            />
          </>
        )}

        <Divider />

        <div className="flex flex-col gap-4">
          {params.comments &&
            params.comments.map((item, index) => (
              <>
                <OtherComment
                  key={item.id}
                  textAvatar={getAvatarName(item.author)}
                  name={item.author}
                  comment={item.content}
                />
                <Divider />
              </>
            ))}
        </div>

        <MyComment textAvatar="HL" />
      </div>
    </div>
  );
};

export default ReportPostItem;
