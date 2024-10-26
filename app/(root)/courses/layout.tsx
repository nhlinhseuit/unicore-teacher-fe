import LeftSideBar from "@/components/shared/LeftSideBar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
        <Link href={"/courses"}>
          <button
            type="button"
            className="
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
            active
            rounded-t-lg
            border-b-2
            border-gray-400
            "
            role="tab"
          >
            Danh sách môn học
          </button>
        </Link>

        <Link href={"/courses/joined"}>
          <button
            type="button"
            aria-controls=":R17rqfj6:-tabpanel-1"
            aria-selected="false"
            className="
            flex
            items-center
            justify-center
            p-4
            text-sm
            font-medium
            first:ml-0
            focus:outline-none
            disabled:cursor-not-allowed
            disabled:text-gray-400
            disabled:dark:text-gray-500
            rounded-t-lg
            border-b-2
            border-transparent
            hover:border-gray-300
            hover:text-gray-600
            dark:text-gray-400
            dark:hover:text-gray-300"
            id=":R17rqfj6:-tab-1"
            role="tab"
          >
            Lớp học có tham gia
          </button>
        </Link>
      </div>
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
    //   <main
    //     className="
    // background-light850_dark100
    // relative"
    //   >
    //     {/* NAVBAR */}
    //     {/* <Navbar /> */}

    //     <div className="flex">
    //       {/* LEFT SIDEBAR */}
    //       <LeftSideBar />

    //       {/* CONTENT */}
    //       <section
    //         className="
    //      overflow-auto max-h-screen flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14"
    //       >
    //         <div className="w-full">{children}</div>
    //       </section>

    //       {/* RIGHT SIDEBAR */}
    //       {/* <RightSideBar /> */}

    //       {/* TOAST */}
    //       <div className="fixed top-10 right-10 z-50">
    //         <Toaster />
    //       </div>
    //     </div>

    //     {/* Toaster */}
    //   </main>
  );
};

export default Layout;
