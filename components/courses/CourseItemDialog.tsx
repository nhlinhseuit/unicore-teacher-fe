interface Props {
  id: string;
  teacher: string;
  color: string;
  type: string;
  otherClasses?: string;
}

const CourseItemDialog = (params: Props) => {
  const getTitle = () => {
    if (params.type === "") return params.id;

    if (params.type === "theory" || params.type === "pratice") {
      return params.id + `${params.type === "theory" ? " - LT" : " - TH"}`;
      // general, advisor
    } else {
      return `${params.type === "advisor" ? "GVHD" : params.id}`;
    }
  };
  return (
    <div
      className={`
        relative flex items-center justify-between
        rounded-lg cursor-pointer shadow-md text-black p-4 ${params.otherClasses}
      `}
      style={{ backgroundColor: params.color }}
    >
      <div className="text-center flex flex-col justify-between w-full">
        <h4 className="body-bold">{getTitle()}</h4>
        <p className="small-regular mt-4">GV: {params.teacher}</p>
      </div>
    </div>
  );
};

export default CourseItemDialog;
