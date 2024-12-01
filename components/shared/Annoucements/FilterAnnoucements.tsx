import { FilterType } from "@/constants";
import { Dropdown } from "flowbite-react";
import React from "react";
import IconButton from "../Button/IconButton";

const FilterAnnoucements = (typeFilter: any) => {
  return (
    <Dropdown
      className="z-30 rounded-lg w-[25%]"
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <div>
          <IconButton
            text="Bộ lọc"
            iconLeft={
              typeFilter === FilterType.None
                ? "/assets/icons/filter.svg"
                : "/assets/icons/filter_active.svg"
            }
            iconRight={"/assets/icons/chevron-down.svg"}
            bgColor="bg-white"
            textColor="text-black"
            border
          />
        </div>
      )}
    >
      <Dropdown.Header>
        <span
          onClick={() => {
            // cancelDetailFilter();
            // handleChooseFilter(FilterType.None);
          }}
          className="block truncate text-sm font-medium cursor-pointer"
        >
          Bỏ bộ lọc
        </span>
      </Dropdown.Header>
      <ul className=" text-sm" aria-labelledby="filterDropdownButton">
        <li
          className="flex items-center
        w-full
        justify-start
        px-4
        py-2
        text-sm
        text-gray-700
        focus:outline-none
        "
        >
          <input
            checked={typeFilter === FilterType.SortNewer}
            id="SortNewer"
            type="radio"
            name="filterOptions"
            value={FilterType.SortNewer}
            onChange={() => {
              // handleChooseFilter(FilterType.SortNewer)
            }}
            className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
          />
          <label
            htmlFor="SortNewer"
            className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Mới nhất
          </label>
        </li>

        <li
          className="flex items-center
        w-full
        justify-start
        px-4
        py-2
        text-sm
        text-gray-700
        focus:outline-none
        "
        >
          <input
            // checked={typeFilter === FilterType.SortOlder}
            checked={true}
            id="SortOlder"
            type="radio"
            name="filterOptions"
            value={FilterType.SortOlder}
            onChange={() => {
              // handleChooseFilter(FilterType.SortOlder)
            }}
            className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
          />
          <label
            htmlFor="SortOlder"
            className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Cũ nhất
          </label>
        </li>
      </ul>
    </Dropdown>
  );
};

export default FilterAnnoucements;
