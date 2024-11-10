// /app/[courseId]/big-exercises/[bigExerciseId]/layout.tsx

"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Lấy pathname từ URL hiện tại
  const currentPath = usePathname(); // '/courses/[courseId]/big-exercises/[a]/[b]/[c]'

  // Tách pathname thành mảng dựa vào dấu "/"
  const pathArray = currentPath.split("/");

  // Tìm vị trí của "big-exercises"
  const indexOfBigExercises = pathArray.findIndex(
    (segment) => segment === "big-exercises"
  );

  // Nếu tìm thấy "big-exercises" trong mảng, cắt đường dẫn để giữ lại đến "big-exercises"
  const linkToBigExercises =
    indexOfBigExercises !== -1
      ? "/" + pathArray.slice(1, indexOfBigExercises + 1).join("/")
      : "/"; // Nếu không tìm thấy, quay về "/"

  return (
    <main
      className="
  background-light850_dark100
  relative"
    >
      <div
        aria-label="Tabs with underline"
        role="tablist"
        className="mb-4 flex text-center flex-wrap border-b border-gray-200 dark:border-gray-700"
      >
        <BackToPrev
          text={"Quay lại danh sách bài tập lớn"}
          linkPrev={linkToBigExercises}
        />
      </div>
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
