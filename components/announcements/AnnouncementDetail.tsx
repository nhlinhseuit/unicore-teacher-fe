import Image from "next/image";
import { useEffect } from "react";
import RenderFile from "../shared/Annoucements/RenderFile";
import RenderTag from "../shared/Annoucements/RenderTag";

import parse from "html-react-parser";
import Prism from "prismjs";

import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-r";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

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
  description: `
    <p>Th&ocirc;ng tin chi tiết của th&ocirc;ng b&aacute;o. Tối thiểu 20 k&iacute; tự Th&ocirc;ng tin chi tiết của th&ocirc;ng b&aacute;o. Tối thiểu 20 k&iacute; tự</p>
    <p>&nbsp;</p>
    <pre class="language-javascript"><code>const innerObject = {
      description: \`&lt;pre class="language-markup"&gt;&lt;code&gt;&amp;lt;div class="w-[20%]"&amp;gt;
        &amp;lt;Image
          src="/assets/images/department-announcement.svg"
          width="16"
          height="16"
          alt="announcement"
          class="w-full object-contain"
        /&amp;gt;
      &amp;lt;/div&amp;gt;&lt;/code&gt;&lt;/pre&gt;
      &lt;p&gt;c&amp;aacute;c em l&amp;agrave;m b&amp;agrave;i tập n&amp;agrave;y nh&amp;eacute;&lt;/p&gt;\`,
    };</code></pre>
  `,
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
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="relative flex w-full gap-4 p-4">
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
            <p className="normal-semibold text-[#1F86E8] underline flex-1">
              {title}
            </p>
            <span className="block mt-2 small-regular italic text-[#636363] ">
              {createdAt}
            </span>

            <span className="mt-2 small-regular italic text-[#636363] ">
              Đăng bởi: GV. Trần Hạnh Xuân
            </span>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>

            <div className="flex-1 mt-4 body-regular text-dark200_light900">
              {parse(object.description)}
            </div>

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

export default AnnouncementDetail;
