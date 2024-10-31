import React from "react";
interface Category {
  id: number;
  value: string;
}

interface CategoryProps {
  categoryList: Category[];
}

const Category = (params: CategoryProps) => {
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
        {params.categoryList.map((item) => (
          <div key={item.id} className="flex gap-2 w-full ">
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
  );
};

export default Category;
