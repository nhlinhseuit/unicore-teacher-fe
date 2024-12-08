"use client";
import TitleDescription from "@/components/shared/TitleDescription";
import UploadTopicResult from "./(UploadTopicResult)/UploadTopicResult";

const UploadTopic = () => {
  return (
    <div>
      <TitleDescription
        title="Đăng đề tài"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />
      <UploadTopicResult />
    </div>
  );
};

export default UploadTopic;
