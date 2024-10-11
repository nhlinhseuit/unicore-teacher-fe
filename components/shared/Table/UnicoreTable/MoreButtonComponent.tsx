import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TableDataMoreComponentItems } from "@/constants";
import Image from "next/image";
import React from "react";

interface MoreButtonParams {
  handleEdit: () => void;
}

const MoreButtonComponent = (params: MoreButtonParams) => {
  return (
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
          {TableDataMoreComponentItems.map((item) => (
            <MenubarItem
              className="
                    flex items-center gap-4 px-2.5 py-2 hover:bg-light-800
                    dark:focus:bg-dark-400 cursor-pointer"
              key={item.value}
              onClick={item.value === "edit" ? params.handleEdit : undefined}
            >
              {/* <Image src={item.icon} alt={item.value} width={20} height={20} /> */}
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
  );
};

export default MoreButtonComponent;
