
interface Props {
  id: string;
  name: string;
  creator: string;
  createdAt: string;
  happeningEvent: string;
  deadline: string;
}

const BigExerciseItem = (params: Props) => {
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-semibold">{params.name}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - Tạo bởi {params.creator}
          </p>
        </div>
        <p className="small-regular text-[#636363] line-clamp-1 ">
          {params.createdAt}
        </p>
        <p className="mt-4 small-regular line-clamp-1 ">
          <span className="italic">Sự kiện đang diễn ra: </span>{" "}
          {params.happeningEvent}
        </p>
        <p className="small-regular line-clamp-1 ">
          <span className="italic">Hạn cuối: </span> {params.deadline}
        </p>
      </div>
    </div>
  );
};

export default BigExerciseItem;
