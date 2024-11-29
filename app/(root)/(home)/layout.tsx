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
        className="mb-4 flex text-center flex-wrap mt-2 items-center gap-2 "
      >
        {TeacherAnnouncementsTabItems.map((item) => {
          let isActive =
            pathName === item.route || pathName.includes(`/${item.route}`);
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
