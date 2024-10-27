"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DepartmentSubjectsTabItems } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      <div
        aria-label="Tabs with underline"
        role="tablist"
        className="flex text-center -mb-px flex-wrap border-b border-gray-200 dark:border-gray-700"
      >
        {DepartmentSubjectsTabItems.map((item) => {
          const isActive =
          pathName === item.route || pathName.startsWith(`/${item.route}/`);

          return (
            <Link href={item.route}>
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
                  ${isActive ? "border-b-2 border-gray-400" : ""}`}
                role="tab"
              >
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
