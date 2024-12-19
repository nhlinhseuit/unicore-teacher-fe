import { PostDataGradingReviewItem } from "@/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import MyAvatar from "../../../courses/MyAvatar";
import RenderFile from "../../Annoucements/RenderFile";
import IconButton from "../../Button/IconButton";
import Divider from "../../Divider";
import ReviewGradeTable from "./ReviewGradeTable";

interface Props {
  postScoreDetail: PostDataGradingReviewItem;
  isEdit: boolean;
  setGrading: () => void;
}

const PostReviewScoreItem = (params: Props) => {
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <MyAvatar text="MT" />
          <p className="body-regular">{params.postScoreDetail.creator}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - {params.postScoreDetail.createdAt}
          </p>
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
          />
          <IconButton text="Đi tới" green otherClasses="ml-4" />
        </div>

        <div className=" mt-3 ml-2 flex gap-4 items-center">
          <p className="base-regular">{params.postScoreDetail.title}</p>
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <Image
                src={"/assets/icons/info.svg"}
                width={18}
                height={18}
                alt={"edit"}
                className={`object-contain cursor-pointer`}
              />
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-center truncate">
                Thông tin
              </span>
            </Dropdown.Header>
            <div className="scroll-container scroll-container-dropdown-content">
              <ul>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp bài:</span>
                    <span> 12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">Thời hạn nộp trễ:</span>
                    <span>12h SA 8/11/2024 - 11h30 SA 15/11/2024</span>
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                  >
                    <span className="font-semibold">
                      Thời hạn đóng bài nộp:
                    </span>
                    <span>12h SA 16/11/2024</span>
                  </button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>

        <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-2 px-2"} />

        <Divider />

        <ReviewGradeTable dataTable={params.postScoreDetail.scoreDetail} />
      </div>
    </div>
  );
};

export default PostReviewScoreItem;
