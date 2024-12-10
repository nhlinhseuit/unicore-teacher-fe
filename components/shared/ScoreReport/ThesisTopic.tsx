interface Props {
  id: string;
  name: string;
  supervisor: string;
  reportAt: string;
  onClick: () => void;
}

const ThesisTopic = (params: Props) => {
  return (
    <div
      onClick={params.onClick}
      className=" cursor-pointer card-wrapper !bg-[#e8f7ff] rounded-[10px]"
    >
      <div className=" rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-semibold">{params.name}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - GVHD: {params.supervisor}
          </p>
        </div>
        <p className="mt-4 small-regular line-clamp-1 ">
          Bảo vệ Khóa luận ngày: {params.reportAt}
        </p>
      </div>
    </div>
  );
};

export default ThesisTopic;
