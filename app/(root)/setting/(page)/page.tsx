"use client";

import IconButton from "@/components/shared/Button/IconButton";
import { mockCategoryList, mockNotiTypeList } from "@/mocks";
import { useState } from "react";

const Setting = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    mockCategoryList.map((item) => item.id)
  );
  const [selectedNotiTypes, setSelectedNotiTypes] = useState<number[]>(
    mockNotiTypeList.map((item) => item.id)
  );

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNotiTypeChange = (id: number) => {
    setSelectedNotiTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Notification Types:", selectedNotiTypes);
  };

  return (
    <div className="ml-4 flex flex-col gap-4">
      {/* Category */}
      <div className="mt-6 flex flex-col gap-4">
        <p className="paragraph-semibold">Tin tức</p>

        <div className="w-full ml-2 mr-2 sm:flex-row">
          <div className="flex gap-4 flex-wrap">
            {mockCategoryList.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center basis-[calc(25%-16px)] flex-grow-0 flex-shrink"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item.id)}
                  onChange={(e) => {
                    handleCategoryChange(item.id);
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0 whitespace-nowrap">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NOTI */}
      <div className="mt-6 flex flex-col gap-4">
        <p className="paragraph-semibold">Thông báo</p>

        <div className="w-full ml-2 mr-2 sm:flex-row">
          <div className="flex gap-4 flex-wrap">
            {mockNotiTypeList.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center basis-[calc(25%-16px)] flex-grow-0 flex-shrink"
              >
                <input
                  type="checkbox"
                  checked={selectedNotiTypes.includes(item.id)}
                  onChange={(e) => {
                    handleNotiTypeChange(item.id);
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0 whitespace-nowrap">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <IconButton text="Lưu" onClick={handleSave} />
      </div>
    </div>
  );
};

export default Setting;
