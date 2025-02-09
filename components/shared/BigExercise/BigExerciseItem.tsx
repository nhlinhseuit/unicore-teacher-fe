interface Props {
  isCentralizedExam?: boolean;
  id: string;
  name: string;
  creator: string;
  createdAt: string;
  happeningEvent?: string;
  deadline: string;
  onClick: () => void;
}

const BigExerciseItem = (params: Props) => {
  return (
    <div
      onClick={params.onClick}
      className="card-wrapper rounded-[10px] cursor-pointer"
    >
      <div className="rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-semibold">{params.name}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - Tạo bởi {params.creator}
          </p>
        </div>
        <p className="small-regular text-[#636363] line-clamp-1 mt-2">
          Tạo ngày: {params.createdAt}
        </p>
        {params.happeningEvent ? (
          <p className="mt-4 small-regular line-clamp-1 text-red-400">
            <span className="italic">Sự kiện đang diễn ra: </span>
            Đăng ký nhóm và đề tài báo cáo.
          </p>
        ) : null}
        {params.isCentralizedExam ? (
          <p className="mt-4 small-regular line-clamp-1">
            <span className="italic">Ngày diễn ra: </span>
            15/2/2025
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BigExerciseItem;
