import React from "react";
import Image from "next/image";

interface FooterProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

const Footer = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: FooterProps) => {
  return (
    <nav
      className="flex flex-col bg-gray shadow-sm -translate-y-1 rounded-b-lg md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white px-1">
          {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, totalItems)}
        </span>
        of
        <span className="font-semibold text-gray-900 dark:text-white px-1">
          {totalItems}
        </span>
      </p>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="search"
              width={21}
              height={21}
              className="cursor-pointer mr-2"
            />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ...
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            100
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="search"
              width={21}
              height={21}
              className="cursor-pointer mr-2"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
