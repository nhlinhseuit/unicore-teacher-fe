// /app/[courseId]/big-exercises/[bigExerciseId]/layout.tsx

"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import NavbarButton from "@/components/shared/NavbarButton";
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
      ? "/" + pathArray.slice(1, indexOfBigExercises).join("/")
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
          gap-2
          items-center
          text-center
          whitespace-nowrap
          overflow-x-auto
          flex-nowrap
          mt-2 border-b border-gray
          pl-[200px]
          "
      >
        {BigExerciseTabItems.map((item) => {
          let isActive = false;

          if (item.route === "/") {
            if (
              `${linkToBigExercises}/big-exercises/${bigExerciseId}` ===
              pathName
            )
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
              key={`${linkToBigExercises}/big-exercises/${bigExerciseId}${item.route}`}
              href={`${linkToBigExercises}/big-exercises/${bigExerciseId}${item.route}`}
            >
              <NavbarButton isActive={isActive} label={item.label} />
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
