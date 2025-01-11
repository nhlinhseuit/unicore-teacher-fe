"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import CreateExercise from "@/components/shared/PostItem/CreateExercise";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const pathName = usePathname();

   // Lấy id từ query string
   const searchParams = useSearchParams(); 
   const exerciseId = searchParams.get("id");
 
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
      <CreateExercise isEdit exerciseId={exerciseId ?? ''}/>
    </div>
  );
};

export default page;
