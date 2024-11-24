import { mockPostDataGradingDetail } from "@/mocks";
import { PostDataGradingDetailItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import BackToPrev from "../BackToPrev";
import IconButton from "../Button/IconButton";
import PostScoreColumnDetailItem from "./PostScoreColumnDetailItem";
import { sErrorList } from "./(store)/scoreDetailStore";

interface Props {
  onClickPrev: () => void;
}

const ScoreColumnDetailPage = (params: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const refData = useRef(mockPostDataGradingDetail);

  const [isPercentageValid, setIsPercentageValid] = useState(true);
  const [totalScore, setTotalScore] = useState(0);

  const totalScorePercentage = (data: PostDataGradingDetailItem[]): number => {
    const totalPercentage = data.reduce((total, post) => {
      const percentage = post.scoreDetail["Tỉ lệ điểm"];
      return (
        total +
        (typeof percentage === "number" ? percentage : parseInt(percentage))
      );
    }, 0);

    return totalPercentage;
  };

  return (
    <>
      <BackToPrev text="Quay lại Bảng điểm" onClickPrev={params.onClickPrev} />

      {/* <div className="flex justify-between mb-6">
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">
            Chi tiết cột điểm Quá trình - Sinh viên Nguyễn Hoàng Linh - MSSV
            21522289
          </p>
          {isEdit ? (
            <IconButton
              text="Lưu"
              onClick={() => {
                const hasError = sErrorList.value.some(
                  (item) => item.errorList.length > 0
                );

                if (hasError) return;
                if (totalScorePercentage(refData.current) !== 100) {
                  setTotalScore(totalScorePercentage(refData.current));
                  setIsPercentageValid(false);
                  return;
                }

                // ? Gọi API với ref.current data
                setIsEdit(false);
                setIsPercentageValid(true);
              }}
            />
          ) : (
            <IconButton
              text="Chỉnh sửa"
              onClick={() => {
                setIsEdit(true);
              }}
            />
          )}
          {isPercentageValid ? (
            <></>
          ) : (
            <p className="text-[0.8rem] font-medium dark:text-red-900 text-red-500">
              * Tổng tỉ lệ điểm các bài tập không bằng 100% ({totalScore}%)
            </p>
          )}
        </div>
      </div> */}

      {/* <div className="mt-6 flex flex-col gap-4">
        {mockPostDataGradingDetail.map((item, index) => (
          <PostScoreColumnDetailItem
            key={item.id}
            // id={item.id}
            // creator={item.creator}
            // createdAt={item.createdAt}
            // title={item.title}
            // fileName={item.fileName}
            // scoreDetail={item.scoreDetail}
            postScoreDetail={item}
            setGrading={() => {
              // setIsGrading(true);
            }}
            isEdit={isEdit}
            savePostScoreDetail={(
              newPostScoreDetailItem: PostDataGradingDetailItem
            ) => {
              refData.current = mockPostDataGradingDetail.map((item) => {
                if (item.id === newPostScoreDetailItem.id)
                  return newPostScoreDetailItem;
                else return item;
              });
            }}
          />
        ))}
      </div> */}
    </>
  );
};

export default ScoreColumnDetailPage;
