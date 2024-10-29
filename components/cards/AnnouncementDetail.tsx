import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import RenderFile from "../shared/RenderFile";

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
        <div className="absolute top-4 right-2">
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer`}
          />
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

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>

            <span className="mt-2 small-regular italic text-[#636363] ">
              {createdAt}
            </span>

            <p className="mt-2 body-regular text-dark200_light900 flex-1">
              {description}
            </p>

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
