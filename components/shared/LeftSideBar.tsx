"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <section
      className="
    flex
    flex-col
    justify-between
    background-light900_dark200
    lg:w-[265px]
    max-sm:hidden

    light-border
    overflow-y-auto
    sticky
    left-0
    top-0
    border-r
    pt-36
    shadow-light-300
    dark:shadow-none
    custom-scrollbar
    
    "
    >
      <div
        className="
    flex  flex-col gap-6 px-6 h-full
    "
      >
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          if (item.route !== "/profile") {
            console.log(item.route);

            return (
              <Link
                href={item.route}
                key={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                }  flex items-center justify-start gap-4 
                  max-lg:w-[52px]
                  bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${isActive ? "base-bold" : "base-medium"} 
                    max-lg:hidden
                `}
                >
                  {item.label}
                </p>
              </Link>
            );
          }
        })}
      </div>

      <div
        className="
        mb-6 mt-6
        flex flex-col gap-3 mx-6
      "
      >
        {/* <SignedOut>
        </SignedOut> */}
        <Link
            href="/sign-in"
            className="flex 
                background-light800_dark400
                rounded-lg
          "
          >
            <Button
              className="
                        small-medium btn-secondary 
                        min-h-[41px] w-full rounded-lg
                        px-4 py-3 shadow-none
                        max-lg:hidden
                        "
            >
              <span
                className="
                max-lg:hidden
                primary-text-gradient"
              >
                Log in
              </span>
            </Button>
            <Image
              src="/assets/icons/account.svg"
              alt="login"
              width={20}
              height={20}
              className="
                invert-colors 
                flex 
                items-center 
                justify-start gap-4 
                max-lg:w-[52px]
                bg-transparent p-4
                lg:hidden"
            />
          </Link>

          <Link
            href="/sign-up"
            className=" flex 
                background-light700_dark300
                rounded-lg"
          >
            <Button
              className="
                        small-medium btn-tertiary light-border-2 
                        min-h-[41px] w-full rounded-lg
                        px-4 py-3 shadow-none text-dark400_light900
                        max-lg:hidden"
            >
              Sign up
            </Button>

            <Image
              src="/assets/icons/sign-up.svg"
              alt="signup"
              width={20}
              height={20}
              className="
                invert-colors 
                flex 
                items-center 
                justify-start gap-4 
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
