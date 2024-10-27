"use client";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      <section>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
