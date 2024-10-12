import LeftSideBar from "@/components/shared/LeftSideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      {/* NAVBAR */}
      {/* <Navbar /> */}
      
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <LeftSideBar />

        {/* CONTENT */}
        <section
          className="
      flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14"
        >
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        {/* RIGHT SIDEBAR */}
        {/* <RightSideBar /> */}
      </div>

      {/* Toaster */}
    </main>
  );
};

export default Layout;
