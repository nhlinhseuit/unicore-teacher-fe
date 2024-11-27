// /app/[courseId]/big-exercises/[bigExerciseId]/layout.tsx

"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import { BigExerciseTabItems } from "@/constants";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname(); // '/courses/[courseId]/big-exercises/[a]/[b]/[c]'

  const pathArray = pathName.split("/");

  // Tìm vị trí của "big-exercises"
  const indexOfBigExercises = pathArray.findIndex(
    (segment) => segment === "big-exercises"
  );

  const linkToBigExercises =
    indexOfBigExercises !== -1
      ? "/" + pathArray.slice(1, indexOfBigExercises + 1).join("/")
      : "/"; // Nếu không tìm thấy, quay về "/"

  const params = useParams() as { bigExerciseId: string };
  const { bigExerciseId } = params;

  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      <div
        aria-label="Tabs with underline"
        role="tablist"
        className="relative
          scroll-container-noscroll
          h-[54px]
          mb-4
          flex
          text-center
          whitespace-nowrap
          overflow-x-auto
          flex-nowrap
          border-b
          border-gray-200
          dark:border-gray-700
          pl-[200px]
          "
      >
        {BigExerciseTabItems.map((item) => {
          let isActive = false;

          if (item.route === "/") {
            if (`${linkToBigExercises}/${bigExerciseId}` === pathName)
              isActive = true;
          } else {
            isActive = pathName.includes(item.route);
          }

          // let isActive = true;

          // // TODO: handle cho COURSE ITEM
          // if (pathName === `/courses/${courseId}` && item.route === "/") {
          //   isActive = true;
          // } else {
          //   let isActive =
          //     pathName.includes(item.route)
          // }

          return (
            <Link
              key={`${linkToBigExercises}/${bigExerciseId}${item.route}`}
              href={`${linkToBigExercises}/${bigExerciseId}${item.route}`}
            >
              <button
                type="button"
                className={`flex items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 rounded-t-lg ${
                  isActive ? "border-b-[1.5px] border-[#7fc9fa]" : ""
                }`}
                role="tab"
              >
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>

      {/* TÊN BÀI TẬP LỚN */}
      <div
        className="h-[50px]
        px-2
        bg-white
        flex
        gap-[3px]
        items-center
        absolute
        top-0
        bottom-0
        left-0
        space-x-2"
      >
        {/* //! HERE */}
        <div className="mt-2">
          <BackToPrev
            text={"Seminar Giữa kỳ"}
            bold
            linkPrev={linkToBigExercises}
          />
        </div>
        <div
          className=" w-[4px] primary-gradient rounded-sm"
          style={{ height: "calc(100% - 24px)" }}
        ></div>
      </div>

      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}
