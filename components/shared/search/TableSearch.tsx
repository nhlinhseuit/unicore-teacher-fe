import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface TableSearchParams {
    searchTerm: string
    setSearchTerm: (value: string) => void

}

const TableSearch = (params: TableSearchParams) => {
  return (
    <form className="flex items-center">
      <label className="sr-only">Tìm kiếm</label>
      <div className="relative w-full bg-white border border-gray-300 rounded-md">
        {/* searchTerm */}
        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="Search"
            value={params.searchTerm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Ngăn không cho hành động mặc định xảy ra
              }
            }}
            onChange={(e) => params.setSearchTerm(e.target.value)}
            className=" 
          h-auto
          pl-12 text-sm 
          paragraph-regular no-focus placeholder 
          bg-gray-50
          shadow-none outline-none border-none truncate"
          />
          {params.searchTerm !== "" && (
            <Image
              src="/assets/icons/close_circle.svg"
              alt="search"
              width={21}
              height={21}
              onClick={() => {
                params.setSearchTerm("");
              }}
              className="cursor-pointer mr-2"
            />
          )}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer invert"
          />
        </div>
      </div>
    </form>
  );
};

export default TableSearch;
