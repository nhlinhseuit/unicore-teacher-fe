import { Tabs } from "flowbite-react";
import "./custom.css";
import React from "react";
import {
  Tabs as SubTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TabsComponentParams {
  type: string,
}

const TabsComponent = (params: TabsComponentParams) => {
  return (
    <Tabs
      aria-label="Tabs with underline"
      variant="underline"
      className="base-semibold"
    >
      <Tabs.Item active title={`Danh sách  ${params.type=="subjects" ? 'môn học' : 'lớp học'}`}>
        Danh sách {params.type=="subjects" ? 'môn học' : 'lớp học'}

      </Tabs.Item>
      <Tabs.Item title={`${params.type=="subjects" ? 'Môn học' : 'Lớp học'} có tham gia`}>
      ${params.type=="subjects" ? 'Môn học' : 'Lớp học'} có tham gia
        <SubTabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </SubTabs>
      </Tabs.Item>
    </Tabs>
  );
};

export default TabsComponent;
