import React from "react";

interface Props {
  isActive: boolean;
  label: string;
}

const NavbarButton = (params: Props) => {
  return (
    <button
      type="button"
      className={`${
        !params.isActive ? "hover:bg-[#ECF2FFFF] hover:text-[#5D87FFFF]" : ""
      } rounded-lg flex items-center justify-center px-4 py-2 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500  ${
        params.isActive ? "bg-primary-500 text-white" : ""
      }`}
      role="tab"
    >
      {params.label}
    </button>
  );
};

export default NavbarButton;
