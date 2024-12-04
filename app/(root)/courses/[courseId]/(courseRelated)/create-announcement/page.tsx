"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import CreateAnnouncement from "@/components/shared/PostItem/CreateAnnoucement";
import { usePathname, useRouter } from "next/navigation";

const page = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <div>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={handleClick}
      />
      <CreateAnnouncement />;
    </div>
  );
};

export default page;
