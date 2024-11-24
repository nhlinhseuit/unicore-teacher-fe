import Link from "next/link";
import React from "react";
import RenderTag from "../shared/Annoucements/RenderTag";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import RenderFile from "../shared/Annoucements/RenderFile";

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

const Announcement = ({
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
        <div className="w-[20%]">
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
          <div>
            <Link href={`/announcements/${_id}`}>
              <p className="normal-semibold text-[#1F86E8] line-clamp-1 underline flex-1">
                {title}
              </p>
            </Link>

            <span className="mt-2 small-regular italic text-[#636363] line-clamp-1 ">
              {createdAt}
            </span>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>

            <p className="flex-1 mt-4 body-regular text-dark200_light900 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
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

export default Announcement;
