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

const RightSideBar = () => {
  return (
    <div className="w-full card-wrapper rounded-[10px]">
      <div className="relative flex w-full gap-4 p-4">
        {/* EDIT */}
        <div className="absolute top-4 right-2 z-10">
          <Image
            src={"/assets/icons/edit-black.svg"}
            width={26}
            height={26}
            alt={"edit"}
            className={`object-contain cursor-pointer`}
          />
        </div>

        {/* CONTENT */}
        <div className=" w-full sm:flex-row ml-2 mr-2">
          <div className="flex flex-col gap-4">
            <p className="base-semibold line-clamp-1 text-center">Danh mục</p>

            {categoryList.map((item) => (
              <div key={item.id} className="flex gap-4">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={(e) => {}}
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
