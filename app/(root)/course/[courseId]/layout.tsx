"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DepartmentCourseTabItems } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const params = useParams() as { courseId: string };
  const { courseId } = params;

  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      <div
        aria-label="Tabs with underline"
        role="tablist"
        className="relative mb-4 flex text-center flex-wrap border-b border-gray-200 dark:border-gray-700"
      >
        {DepartmentCourseTabItems.map((item) => {
          let isActive;

          // TODO: handle cho COURSE ITEM
          if (pathName === `/course/${courseId}` && item.route === "/") {
            isActive = true;
          } else {
            isActive =
              (pathName.includes(item.route) && item.route.length > 1) ||
              pathName === item.route;
          }

          return (
            <Link
              key={`/course/${courseId}${item.route}`}
              href={`/course/${courseId}${item.route}`}
            >
              <button
                type="button"
                className={`
                  flex
                  items-center
                  justify-center
                  p-4
                  text-sm
                  font-medium
                  first:ml-0
                  disabled:cursor-not-allowed
                  disabled:text-gray-400
                  disabled:dark:text-gray-500
                  rounded-t-lg
                  ${isActive ? "border-b-[1.5px] border-gray-300" : ""}`}
                role="tab"
              >
                {item.label}
              </button>
            </Link>
          );
        })}

        {/* <div className="absolute bg-gray-200 right-[20%] top-0 bottom-0">
          <div className="absolute w-[4px] right-[20%] top-0 bottom-0 my-2 primary-gradient rounded-sm"></div>
          </div> */}

        <div className="absolute w-[4px] right-[20%] top-0 bottom-0 my-2 primary-gradient rounded-sm">
          12312312123123
          Nhập tên môn ở đây
          1 absoulute div có tên có border left
        </div>
      </div>
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
