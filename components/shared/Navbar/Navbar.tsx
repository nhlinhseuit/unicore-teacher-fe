"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../Search/GlobalSearch";
import TabsComponent from "../TabsComponent";

const Navbar = () => {
  return (
    // shadow-light-300

    <nav
      className="
    flex-between
    background-light900_dark200
    fixed z-50 w-full gap-5 px-0 py-2
    sm:px-12
    shadow-md
     "
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="DevFlow"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Uni <span className="text-primary-500">Core</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* <TabsComponent type="courses" /> */}

        {/* MOBILE NAV */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
