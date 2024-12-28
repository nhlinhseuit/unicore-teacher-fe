import { InternReportCouncilDataItem } from "@/types";
import BorderContainer from "../BorderContainer";
import StatusButton from "../Button/StatusButton";

interface Props {
  topic: InternReportCouncilDataItem;
  onClick?: () => void;
}

const InternTopic = (params: Props) => {
  return (
    <BorderContainer otherClasses="cursor-pointer" onClick={params.onClick}>
      <div className="rounded-[10px] relative flex-col w-full p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="base-semibold">{params.topic.council}</p>
            <StatusButton
              orange={
                !(
                  params.topic.numberOfStudents ===
                  params.topic.numberOfCompletedGradingForStudents
                )
              }
              green={
                params.topic.numberOfStudents ===
                params.topic.numberOfCompletedGradingForStudents
              }
              text={
                params.topic.numberOfStudents ===
                params.topic.numberOfCompletedGradingForStudents
                  ? "Đã hoàn thành nhập điểm"
                  : `Đã nhập điểm ${params.topic.numberOfCompletedGradingForStudents}/${params.topic.numberOfStudents} sinh viên báo cáo`
              }
              smallText
              otherClasses="rounded-md ml-4"
            />
          </div>
          <div className="flex gap-2">
            <p className="body-semibold whitespace-nowrap">Thời gian:</p>
            <p className="body-regular">{params.topic.councilInfo}</p>
          </div>
          <div className="flex gap-2">
            <p className="body-semibold line-clamp-1 ">Số đề tài: </p>
            <p className="body-regular">{params.topic.councilInfo}</p>
          </div>
          <p className="body-semibold line-clamp-1 ">Hội đồng chấm: </p>
          <p className="body-regular line-clamp-1 ">
            - Chủ tịch: {params.topic.president}
          </p>
          <p className="body-regular line-clamp-1 ">
            - Thư ký: {params.topic.secretary}
          </p>
          <p className="body-regular line-clamp-1 ">
            - Ủy viên: {params.topic.member}
          </p>
        </div>
      </div>
    </BorderContainer>
  );
};

export default InternTopic;
