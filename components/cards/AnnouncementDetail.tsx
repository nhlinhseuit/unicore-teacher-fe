import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import RenderFile from "../shared/RenderFile";
import { Dropdown } from "flowbite-react";

interface Props {
  _id: string;
  title: string;
  description: string;
  tags: {
    _id: string;
    name: string;
  }[];
  files: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  createdAt: String;
}

const object = {
  title:
    "Thông Báo Cập Nhật Thông Tin Thực Tập Doanh Nghiệp Học Kỳ 1 Năm Học 2024 - 2025",
  description:
    '<p><strong>Khoa C&ocirc;ng nghệ Phần mềm th&ocirc;ng b&aacute;o c&aacute;c sinh vi&ecirc;n đăng k&yacute; học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 v&agrave; SE501.P11.PMCL cập nhật th&ocirc;ng tin thực tập doanh nghiệp v&agrave;o c&aacute;c file sau từ nay đến ng&agrave;y&nbsp;15/09/2024.</strong><br><span style="text-decoration: underline;">Lớp SE501.P11&nbsp;</span><br><span style="text-decoration: underline;">Lớp SE501.P11.PMCL</span></p>\n<p><br>Lưu &yacute;: Sinh vi&ecirc;n n&agrave;o chưa li&ecirc;n hệ được nơi thực tập th&igrave; cập nhật v&agrave;o cột "Nơi thực tập" l&agrave; "Chưa c&oacute;".<br>Để nắm được c&aacute;c th&ocirc;ng tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị to&agrave;n bộ c&aacute;c sinh vi&ecirc;n lớp&nbsp;SE501.P11 v&agrave; SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA C&Ocirc;NG NGHỆ PHẦN MỀM cụ thể như sau:</p>\n<ol>\n<li>&nbsp;Thời gian: 15h00 thứ s&aacute;u ng&agrave;y 13/09/2024</li>\n<li>H&igrave;nh thức: online tr&ecirc;n MS Team với Passcode : r96y1rg</li>\n<li>Người tr&igrave;nh b&agrave;y: ThS. L&ecirc; Thanh Trọng_Ph&oacute; Trưởng khoa C&ocirc;ng nghệ Phần mềm</li>\n</ol>',
  photo: null,
  file: null,
  category: [],
  target: [],
  path: "/create-announcement",
};

const AnnouncementDetail = ({
  _id,
  title,
  description,
  tags,
  files,
  author,
  createdAt,
}: Props) => {
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
                  width={27}
                  height={27}
                  alt={"edit"}
                  className={`object-contain cursor-pointer`}
                />
              )}
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium text-center">
                  Nhật ký chỉnh sửa
                </span>
              </Dropdown.Header>
              <ul>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                    "
                  >
                    Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                    "
                  >
                    Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                    "
                  >
                    Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                    "
                  >
                    Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                    "
                  >
                    Huỳnh Hồ Thị Mộng Trinh - 8:30, 29/09/2024
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-[20%] ">
          <Image
            src={"/assets/images/department-annoucement.svg"}
            width={16}
            height={16}
            alt={"annoucement"}
            className={`w-full object-contain`}
          />
        </div>

        {/* CONTENT */}
        <div className="w-[80%] flex items-start justify-between sm:flex-row ml-2 mr-8">
          <div>
            <Link href={`/announcementDetailAnnouncementDetail/${_id}`}>
              <p className="base-semibold text-[#1F86E8] underline flex-1">
                {title}
              </p>
            </Link>

            <span className="block mt-2 small-regular italic text-[#636363] ">
              {createdAt}
            </span>

            <span className="mt-2 small-regular italic text-[#636363] ">
              Đăng bởi: GV. Trần Hạnh Xuân
            </span>

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>

            {/* <p className="mt-4 body-regular text-dark200_light900 flex-1">
              {description}
            </p> */}

            <div
              className="html-content
              mt-4 body-regular text-dark200_light900 flex-1"
              dangerouslySetInnerHTML={{ __html: object.description }}
            ></div>

            <div className="mt-2 flex flex-wrap gap-2">
              {files.map((tag) => (
                <RenderFile key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
