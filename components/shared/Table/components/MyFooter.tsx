import React, { useState } from "react";
import Image from "next/image";

interface MyFooterProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const MyFooter: React.FC<MyFooterProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Luôn đảm bảo currentPage nằm trong range
  const getRangeForCurrentPage = (page: number): number[] => {
    const start = Math.max(1, page - 2); // Hiển thị 2 trang trước currentPage
    const end = Math.min(totalPages, page + 2); // Hiển thị 2 trang sau currentPage
    return [start, end];
  };

  const [visibleRange, setVisibleRange] = useState<number[]>(getRangeForCurrentPage(currentPage));


  const handleNextRange = () => {
    const start = visibleRange[0] + 5;
    const end = Math.min(start + 4, totalPages);
    setVisibleRange([start, end]);
  };

  const handlePrevRange = () => {
    const start = Math.max(visibleRange[0] - 5, 1);
    const end = start + 4;
    setVisibleRange([start, Math.min(end, totalPages)]);
  };

  return (
    <nav
      className="flex flex-col bg-gray shadow-sm -translate-y-1 rounded-b-lg md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Hiển thị
        <span className="font-semibold text-gray-900 dark:text-white px-1">
          {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, totalItems)}
        </span>
        trong tổng số
        <span className="font-semibold text-gray-900 dark:text-white px-1">
          {totalItems}
        </span>
      </p>

      <ul className="inline-flex items-stretch -space-x-px">
        {/* Chuyển trang trước */}
        <li>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Image
              src="/assets/icons/chevron-left-table.svg"
              alt="previous"
              width={21}
              height={21}
              className="cursor-pointer"
            />
          </button>
        </li>

        {/* Chuyển range */}
        {visibleRange[0] > 1 && (
          <li>
            <button
              onClick={handlePrevRange}
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Image
                src="/assets/icons/chevron-double-left.svg"
                alt="next"
                width={21}
                height={21}
                className="cursor-pointer"
              />
            </button>
          </li>
        )}

        {/* Dấu "..." trước */}
        {visibleRange[0] > 2 && (
          <li>
            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300">
              ...
            </span>
          </li>
        )}

        {/* Các trang hiện tại */}
        {Array.from(
          {
            length: Math.min(visibleRange[1] - visibleRange[0] + 1, totalPages),
          },
          (_, i) => visibleRange[0] + i
        ).map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                currentPage === page
                  ? "text-white bg-primary-500 border border-primary-500"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Dấu "..." sau */}
        {visibleRange[1] < totalPages - 1 && (
          <li>
            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300">
              ...
            </span>
          </li>
        )}

        {/* Chuyển range */}
        {visibleRange[1] < totalPages && (
          <li>
            <button
              onClick={handleNextRange}
              className="flex items-center justify-center h-full py-1.5 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Image
                src="/assets/icons/chevron-double-right.svg"
                alt="next"
                width={21}
                height={21}
                className="cursor-pointer"
              />
            </button>
          </li>
        )}

        {/* Chuyển trang sau */}
        <li>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Image
              src="/assets/icons/chevron-right-table.svg"
              alt="next"
              width={21}
              height={21}
              className="cursor-pointer"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MyFooter;
