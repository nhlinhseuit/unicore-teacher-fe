"use client";


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TableDataMoreComponentItems } from "@/constants";
import Image from "next/image";

interface MoreButtonParams {
  actions?: any;
}

const MoreButtonComponent = (params: MoreButtonParams) => {
  const rederMoreComponentItems = params.actions
    ? params.actions
    : TableDataMoreComponentItems;

  return (
    <>
      <Menubar className="relative border-none bg-transparent shadow-none z-100">
        <MenubarMenu>
          <MenubarTrigger
            className="
           w-10 h-10"
          >
            <Image
              src="/assets/icons/more.svg"
              alt="edit"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </MenubarTrigger>

          <MenubarContent
            className="
          -translate-y-2
          absolute right-[-3rem] mt-0 min-w-[120px] rounded border py-2 bg-white  
          dark:border-dark-400 dark:bg-dark-300"
          >
            {rederMoreComponentItems.map((item: any) => (
              <MenubarItem
                className="
                      flex items-center gap-4 px-2.5 py-2 hover:bg-light-800
                      dark:focus:bg-dark-400 cursor-pointer"
                key={item.value}
                onClick={
                  undefined
                }
              >
                <p
                  className="
                  body-medium
                  text-black"
                >
                  {item.label}
                </p>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

    </>
  );
};

export default MoreButtonComponent;
