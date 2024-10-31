import Image from "next/image";
import React from "react";

const categoryList = [
  { id: 1, value: "Thông báo - tin tức" },
  { id: 2, value: "Khoa học - Công nghệ" },
  { id: 3, value: "Sự kiện nổi bật" },
  { id: 4, value: "Thông báo - tin tức" },
  { id: 5, value: "Khoa học - Công nghệ" },
  { id: 6, value: "Sự kiện nổi bật" },
  { id: 7, value: "Thông báo - tin tức" },
  { id: 8, value: "Khoa học - Công nghệ" },
  { id: 9, value: "Sự kiện nổi bật" },
];

const Category = () => {
  return (
    <div
      className="w-full rounded-[10px]
        no-focus
        paragraph-regular
        background-light900_dark300
        light-border-2
        text-dark300_light700
        border
"
    >
      <div className="flex flex-wrap w-full gap-4 p-4">
        {categoryList.map((item) => (
          <div key={item.id} className="flex items-center gap-2 w-full ">
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => {}}
              className="w-4 h-4 cursor-pointer"
            />
            <p className="body-regular text-dark200_light900 line-clamp-2 flex-1 m-0">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
