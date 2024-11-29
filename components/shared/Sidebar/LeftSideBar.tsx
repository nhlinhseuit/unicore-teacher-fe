"use client";

import { Button } from "@/components/ui/button";
import { TeacherCoursesTabItems, sidebarTeacherLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const LeftSideBar = () => {
  const pathName = usePathname();

  const isOriginalRoute = () => {
    return TeacherCoursesTabItems.find((item) => {
      if (item.route === "/courses") {
        return undefined;
      } else {
        return pathName.includes(item.route);
      }
    });
  };

  const getCourseId = () => {
    let courseId;
    // * ROUTE CỦA SUB COURSE: courses/SE114.O12.PMCL
    if (!isOriginalRoute() && pathName.includes("courses/")) {
      const parts = pathName.split("/");
      const coursesIndex = parts.indexOf("courses");

      if (coursesIndex !== -1 && parts[coursesIndex + 1]) {
        courseId = parts[coursesIndex + 1];
      }
      return courseId;
    }
  };

  return (
    <section
      className="
    flex
    flex-col
    justify-between
    background-light900_dark200
    min-w-[250px]
    max-w-[250px]
    max-lg:min-w-fit

    max-h-screen
    z-50
    max-sm:hidden
    overflow-y-auto
    left-
    top-0
    border-r
    pt-4
    shadow-light-300
    dark:shadow-none
    custom-scrollbar
    
    "
    >
      {/* LOGO */}
      <div className="px-6 mb-2 ml-2">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            width={23}
            height={23}
            alt="DevFlow"
          />

          <p className="ml-1 h1-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-lg:hidden">
            Uni<span className="text-primary-500 ml-[2px]">Core</span>
          </p>
        </Link>
      </div>

      {/* <div className="h-[1px] mx-4 bg-[#ECECEC]"></div> */}

      <div className="flex flex-col h-full gap-4 px-6 mt-6 ">
        {/* ITEM */}
        {sidebarTeacherLinks.map((item, index) => {
          let isActive;
          // TODO: handle cho tab HOME
          if (
            (pathName === "/create-announcement" ||
              pathName.startsWith("/announcements")) &&
            item.route === "/"
          ) {
            isActive = true;
          } else {
            isActive =
              (pathName.startsWith(item.route) && item.route.length > 1) ||
              pathName === item.route;
          }

          if (item.route !== "/profile") {
            if (item.route === "/courses" && getCourseId()) {
              isActive = true;

              return (
                <Fragment key={`${index}_${item.route}`}>
                  <Link
                    href={item.route}
                    className={`${
                      isActive
                        ? "primary-gradient rounded-lg text-light-900"
                        : "text-dark300_light900"
                    }  flex items-center justify-start gap-4
                    max-lg:w-[52px]
                    bg-transparent px-4 py-3`}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={`${isActive ? "" : "invert-colors"}`}
                    />
                    <p
                      className={`${isActive ? "normal-bold" : "normal-medium"} 
                      max-lg:hidden
                  `}
                    >
                      {item.label}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="primary-gradient w-[6px] h-full rounded-sm ml-1"></div>
                    <p className="body-semibold text-right cursor-pointer text-primary-500 line-clamp-1">
                      {getCourseId()}
                    </p>
                  </div>
                </Fragment>
              );
            } else {
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`${
                    isActive
                      ? "primary-gradient rounded-lg text-light-900"
                      : "text-dark300_light900"
                  }  flex items-center justify-start gap-4
                  max-lg:w-[52px]
                  bg-transparent px-4 py-2`}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={`${isActive ? "" : "invert-colors"}`}
                  />
                  <p
                    className={`${isActive ? "normal-bold" : "normal-medium"} 
                max-lg:hidden
            `}
                  >
                    {item.label}
                  </p>
                </Link>
              );
            }
          }
        })}
      </div>

      <div className="flex flex-col gap-3 mx-6 mt-6 mb-6 ">
        {/* <SignedOut>
        </SignedOut> */}
        <Link
          href="/sign-in"
          className="flex rounded-lg background-light800_dark400 "
        >
          <Button
            className="
                        small-medium btn-secondary 
                        min-h-[41px] w-full rounded-lg
                        px-4 py-3 shadow-none
                        max-lg:hidden
                        "
          >
            <span className=" max-lg:hidden primary-text-gradient">
              Đăng nhập
            </span>
          </Button>
          <Image
            src="/assets/icons/account.svg"
            alt="login"
            width={20}
            height={20}
            className="
                invert-colors 
                max-lg:w-[52px]
                bg-transparent p-4
                lg:hidden"
          />
        </Link>

        <Link
          href="/sign-up"
          className="flex rounded-lg background-light700_dark300"
        >
          <Button
            className="
                        small-medium btn-tertiary light-border-2 
                        min-h-[41px] w-full rounded-lg
                        px-4 py-3 shadow-none text-dark400_light900
                        max-lg:hidden"
          >
            Đăng ký
          </Button>

          <Image
            src="/assets/icons/sign-up.svg"
            alt="signup"
            width={20}
            height={20}
            className="
                invert-colors 
                max-lg:w-[52px]
                bg-transparent p-4
                lg:hidden"
          />
        </Link>
      </div>
    </section>
  );
};

export default LeftSideBar;

// dark:shadow-none
