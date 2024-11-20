"use client";

import AnnouncementDetail from "@/components/announcements/AnnouncementDetail";
import BackToPrev from "@/components/shared/BackToPrev";
import { mockAnnouncementDetailLists } from "@/mocks";
import { useParams } from "next/navigation";

const page = () => {
  // ! Get ID từ param, muốn truyền cả object qua route mới thì sd Context / Redux
  const params = useParams() as { announcementId: string };
  const { announcementId } = params;
  const question: any = mockAnnouncementDetailLists[parseInt(announcementId) - 1];

  return (
    <>
      <BackToPrev text={"Quay lại danh sách thông báo"} linkPrev={"/"} />

      <AnnouncementDetail
        key={question._id}
        _id={question._id}
        title={question.title}
        description={question.description}
        tags={question.tags}
        files={question.files}
        author={question.author}
        createdAt={question.createdAt}
      />
    </>
  );
};

export default page;
