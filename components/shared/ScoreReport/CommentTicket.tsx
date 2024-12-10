interface Props {
  id: string;
  reviewer: string;
  onClick: () => void;
}

const ReviewPost = (params: Props) => {
  return (
    <div
      onClick={params.onClick}
      className="cursor-pointer card-wrapper  rounded-[10px]"
    >
      <div className=" rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-medium">
            Phiếu nhận xét của GV: {params.reviewer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
