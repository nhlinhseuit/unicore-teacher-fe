import { DataGradingDetailItem, PostDataGradingDetailItem } from "@/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import MyAvatar from "../../courses/MyAvatar";
import RenderFile from "../Annoucements/RenderFile";
import IconButton from "../Button/IconButton";
import Divider from "../Divider";
import ScoreColumnDetailItemTable from "./ScoreColumnDetailItemTable";

interface Props {
  postScoreDetail: PostDataGradingDetailItem;
  isEdit: boolean;
  setGrading: () => void;
  savePostScoreDetail: (
    newPostScoreDetailItem: PostDataGradingDetailItem
  ) => void;
}

const PostScoreColumnDetailItem = (params: Props) => {
  // const errorList = sErrorList.use();
  // sErrorList.set((prev) => {
  //   // Kiểm tra nếu chưa có item với id là params.postScoreDetail.id
  //   const existingItem = prev.value.find(
  //     (item) => item.id === params.postScoreDetail.id
  //   );

  //   if (!existingItem) {
  //     // Nếu không có item, thêm một item mới vào
  //     prev.value.push({
  //       id: params.postScoreDetail.id,
  //       errorList: [],
  //     });
  //   }
  // });

  // const getErrorItem = () => {
  //   return errorList.find((item) => item.id === params.postScoreDetail.id);
  // };

  // const validateScoreProgress = (inputValue: string) => {
  //   const list: string[] = [];

  //   // Kiểm tra giá trị có phải là số hay không
  //   if (isNaN(parseInt(inputValue))) {
  //     list.push("Hệ số điểm phải là chữ số");
  //   }

  //   // Kiểm tra giá trị trong khoảng từ 0 đến 100
  //   const score = parseInt(inputValue);
  //   if (!isNaN(score) && (score < 0 || score > 100)) {
  //     list.push("Hệ số điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100");
  //   }

  //   // Cập nhật danh sách lỗi
  //   sErrorList.set((prev) => {
  //     prev.value = prev.value.map((item) => {
  //       if (item.id === params.postScoreDetail.id) {
  //         return {
  //           id: params.postScoreDetail.id,
  //           errorList: list,
  //         };
  //       }
  //       return item;
  //     });
  //   });

  //   // Trả về true nếu không có lỗi, ngược lại trả về false
  //   return errorList.length === 0;
  // };

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

        <ScoreColumnDetailItemTable
          isEditTable={params.isEdit}
          isMultipleDelete={false}
          dataTable={params.postScoreDetail.scoreDetail}
          savePostScoreDetail={(newScoreDetail: DataGradingDetailItem) => {
            // @ts-ignore
            // if (validateScoreProgress(newScoreDetail["Tỉ lệ điểm"])) {
              params.savePostScoreDetail({
                ...params.postScoreDetail,
                scoreDetail: newScoreDetail,
              });
            // }
          }}
        />

        {/* {!(errorList.length === 1 && errorList[0].errorList.includes("")) ? (
          <div className="mt-4 flex justify-end">
            {
              // Nếu tìm thấy errorItem và errorList của nó có lỗi, hiển thị lỗi
              getErrorItem()?.errorList?.map((item, index) => (
                <p
                  key={index}
                  className="text-[0.8rem] font-medium dark:text-red-900 text-red-500"
                >
                  * {item}
                </p>
              ))
            }
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default PostScoreColumnDetailItem;
