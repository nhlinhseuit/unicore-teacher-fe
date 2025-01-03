import Link from "next/link";
import React, { useEffect } from "react";
import RenderTag from "../shared/Annoucements/RenderTag";
import Image from "next/image";
import RenderFile from "../shared/Annoucements/RenderFile";
import { Dropdown } from "flowbite-react";

import Prism from "prismjs";
import parse from "html-react-parser";

import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {}

const CourseDetail = ({}: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex w-full gap-4 p-4">
        {/* EDIT */}
        <div className="absolute top-4 right-3 flex justify-end w-[50%]">
          <div className="flex gap-1">
            <Image
              src={"/assets/icons/edit-black.svg"}
              width={26}
              height={26}
              alt={"edit"}
              className={`object-contain cursor-pointer`}
            />
            <Dropdown
              className="z-30 rounded-lg"
              label=""
              renderTrigger={() => (
                <Image
                  src={"/assets/icons/history.svg"}
                  width={18}
                  height={18}
                  alt={"edit"}
                  className={`object-contain cursor-pointer`}
                />
              )}
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-center truncate">
                  Nhật ký chỉnh sửa
                </span>
              </Dropdown.Header>
              <div className="scroll-container scroll-container-dropdown-content">
                <ul>
                  <li role="menuitem">
                    <button
                      type="button"
                      className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                    >
                      Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                    </button>
                  </li>
                  <li role="menuitem">
                    <button
                      type="button"
                      className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                    >
                      Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                    </button>
                  </li>
                  <li role="menuitem">
                    <button
                      type="button"
                      className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                    >
                      Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                    </button>
                  </li>
                </ul>
              </div>
            </Dropdown>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-[20%] ">
          <Image
            src={"/assets/images/department-announcement.svg"}
            width={16}
            height={16}
            alt={"announcement"}
            className={`w-full object-contain`}
          />
        </div>

        {/* CONTENT */}
        <div className="w-[80%] flex items-start justify-between sm:flex-row ml-2 mr-8">
          <div className="w-full">
            <p className="base-semibold text-[#1F86E8] underline flex-1">
              title
            </p>

            <span className="block mt-2 small-regular italic text-[#636363] ">
              createdAt
            </span>

            <span className="mt-2 small-regular italic text-[#636363] ">
              Đăng bởi: GV. Trần Hạnh Xuân
            </span>

            <div className="flex flex-wrap gap-2 mt-2">tags</div>

            <div className="flex-1 mt-4 body-regular text-dark200_light900">
              123123123123
            </div>

            <div className="flex flex-wrap gap-2 mt-2">files</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
