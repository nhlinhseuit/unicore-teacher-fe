"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TeacherAnnouncementsTabItems } from "@/constants";
import NavbarButton from "@/components/shared/NavbarButton";

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
          "
      >
        {TeacherAnnouncementsTabItems.map((item) => {
          let isActive =
            pathName === item.route || pathName.includes(`${item.route}`);
          if (pathName.startsWith("/announcements") && item.route === "/") {
            isActive = true;
          }

          return (
            <Link key={item.route} href={item.route}>
              <NavbarButton isActive={isActive} label={item.label} />
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
