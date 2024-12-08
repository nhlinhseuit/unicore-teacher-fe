interface Props {
  title: string;
  description: string[];
}

const TitleDescription = (params: Props) => {
  return (
    <div className=" relative overflow-hidden mb-[40px] py-5 px-7 rounded-xl w-full bg-[#ecf2ff] text-[#2a3547]">
      <div className="flex flex-col justify-start gap-2">
        <p className=" text-[19px] font-semibold">{params.title}</p>
        <div>
          {params.description.map((item, index) => (
            <p key={index} className="text-[15px] font-medium">
              {item}
            </p>
          ))}
        </div>
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
