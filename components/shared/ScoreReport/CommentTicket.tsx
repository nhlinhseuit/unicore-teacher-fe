import BorderContainer from "../BorderContainer";

interface Props {
  id: string;
  reviewer: string;
  onClick: () => void;
}

const ReviewPost = (params: Props) => {
  return (
    <BorderContainer
      otherClasses="cursor-pointer !bg-[#ecf2ff]"
      onClick={params.onClick}
    >
      <div className=" rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-medium">
            Phiếu nhận xét của GV: {params.reviewer}
          </p>
        </div>
      </div>
    </BorderContainer>
  );
};

export default ReviewPost;
