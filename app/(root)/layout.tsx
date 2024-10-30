"use client";

import LeftSideBar from "@/components/shared/LeftSideBar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isBrowser = () => typeof window !== "undefined";

  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      {/* NAVBAR */}
      {/* <Navbar /> */}

      <div className="relative flex">
        {/* SCROLL TO TOP */}
        {/* <div className="absolute bottom-4 right-4 z-50 translate-x-[50% sticky]">
          <IconButton
            text="Top"
            iconWidth={16}
            iconHeight={16}
            onClick={() => {
              // if (!isBrowser()) return;
              const teachersTable = document.getElementById("teachers-data-table");
              if (teachersTable) {
                teachersTable.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        </div> */}

        {/* LEFT SIDEBAR */}
        <LeftSideBar />

        {/* CONTENT */}
        <section
          className="
       overflow-auto max-h-screen flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-8"
        >
          <div className="w-full">{children}</div>
        </section>

        {/* TOAST */}
        <div className="fixed top-10 right-10 z-50">
          <Toaster />
        </div>
      </div>

      {/* Toaster */}
    </main>
  );
};

export default Layout;
