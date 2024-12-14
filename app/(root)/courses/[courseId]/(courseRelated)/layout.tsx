"use client";

import NavbarButton from "@/components/shared/NavbarButton";
import { BigExerciseTabItems, TeacherCourseTabItems } from "@/constants";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const params = useParams() as { courseId: string };
  const { courseId } = params;
  // TODO: Get API lấy tên lớp học

  //! CALL API để xem SUBCOURSE này có phải có type là advisor hay không
  let title = courseId;
  if (courseId.includes("800")) title = "SE501.N21.PMCL - GVHD";

  //! CALL API để xem course này có phải có type là internCourse hay thesisCourse hay không
  //! nếu internCourse hay thesisCourse là bigExercise, nên kh có tab events
  //! còn regular course mới có tab events có bài tập lớn và thi tập trung

  //? Chỉ check để handle có tab events hay kh, còn lớp của Khoa hay lớp GVHD thì đều có các action
  //? !!!CẦN HANDLE: Nếu lớp của Khoa thì kh được đăng
 
  //TODO: GV thì được tương tác với regularCourse
  const isNotRegularCourse = false;
  const renderTeacherCourseTabItems = isNotRegularCourse
    ? BigExerciseTabItems
    : TeacherCourseTabItems;

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
          custom-scrollbar-navbar
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
          pr-[230px]
        "
      >
        {renderTeacherCourseTabItems.map((item) => {
          let isActive;

          // TODO: handle cho COURSE ITEM
          if (pathName === `/courses/${courseId}` && item.route === "/") {
            isActive = true;
          } else {
            isActive =
              (pathName.includes(item.route) && item.route.length > 1) ||
              pathName === item.route;
          }

          return (
            <Link
              key={`/courses/${courseId}${item.route}`}
              href={`/courses/${courseId}${item.route}`}
            >
              <NavbarButton isActive={isActive} label={item.label} />
            </Link>
          );
        })}
      </div>

      {/* TÊN LỚP HỌC */}
      <div
        className="h-[50px]
        px-2
        bg-white
        flex
        items-center
        absolute
        top-0
        bottom-0
        right-0
        space-x-2"
      >
        <div
          className="w-[4px] primary-gradient rounded-sm"
          style={{ height: "calc(100% - 12px)" }}
        ></div>

        <div className="max-w-[200px] py-1 text-sm font-medium rounded-md ">
          <div className="flex">
            <p className="text-left overflow-hidden text-ellipsis whitespace-nowrap body-semibold text-primary-500">
              {title}
            </p>
            <Dropdown
              className="z-30 rounded-lg"
              label=""
              renderTrigger={() => (
                <Image
                  src="/assets/icons/info.svg"
                  alt="search"
                  width={18}
                  height={18}
                  className="ml-2 cursor-pointer"
                />
              )}
            >
              <div className="scroll-container scroll-container-dropdown-content">
                <ul>
                  <li role="menuitem">
                    <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                      {courseId}
                    </p>
                  </li>
                  <li role="menuitem">
                    <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                      Nhập môn ứng dụng di động
                    </p>
                  </li>
                  <li role="menuitem">
                    <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                      GV: Huỳnh Hồ Thị Mộng Trinh
                    </p>
                  </li>
                </ul>
              </div>
            </Dropdown>
          </div>

          <p className="text-left line-clamp-1 body-regular ">
            Nhập môn ứng dụng di động
          </p>
        </div>
      </div>

      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
