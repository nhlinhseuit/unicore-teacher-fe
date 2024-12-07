const TitleDescription = () => {
  return (
    <div className=" relative overflow-hidden mb-[40px] py-5 px-7 rounded-xl w-full bg-[#ecf2ff] text-[#2a3547]">
      <div className="flex flex-col justify-start gap-2">
        <p className=" text-[19px] font-semibold">Đăng đề tài</p>
        <p className=" text-[15px] font-medium">
          Thời hạn: 7/12/2024 - 28/12/2024
        </p>
      </div>

      <div className="absolute right-0 bottom-0 mr-5 translate-y-[30%]">
        <img
          alt="breadcrumbImg"
          width="140"
          height="140"
          src="https://modernize-nextjs.adminmart.com/_next/image?url=%2Fimages%2Fbreadcrumb%2FChatBc.png&w=256&q=75"
        ></img>
      </div>
    </div>
  );
};

export default TitleDescription;
