"use client";

import SubjectsDataTable from "@/components/shared/Table/UnicoreTable/SubjectsDataTable";
import TabsComponent from "@/components/shared/TabsComponent";
import React from "react";

const Subjects = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <TabsComponent type="subjects"/>

      <SubjectsDataTable />
    </div>
  );
};

export default Subjects;
