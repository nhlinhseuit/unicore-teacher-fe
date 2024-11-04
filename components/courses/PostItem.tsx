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
import Avatar from "./Avatar";
import OtherComment from "./OtherComment";
import MyComment from "./MyComment";
import Divider from "../shared/Divider";

interface Props {}

const PostItem = ({}: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <Avatar text="MT" />
          <p className="body-regular">Huỳnh Hồ Thị Mộng Trinh</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - 29/8/2024 7:23AM
          </p>
          <Image
            src={"/assets/icons/edit-black.svg"}  
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer ml-4`}
          />
        </div>

        <p className="base-regular mt-3 ml-2 ">Bài tập ngày 29/9/2024</p>

        <RenderFile _id={1} name={"exercise.docx"} otherClasses={"mt-2 px-2"} />

        <Divider />

        <OtherComment
          textAvatar="MT"
          name="Huỳnh Hồ Thị Mộng Trinh"
          comment="Các em mau chóng đăng ký nhóm đúng hạn"
        />

        <Divider />

        <MyComment textAvatar="HL" />
      </div>
    </div>
  );
};

export default PostItem;
