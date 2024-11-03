import React from "react";
interface CategoryItem {
  id: number;
  value: string;
}

interface CategoryProps {
  item: CategoryItem;
  checked: boolean;
  onClick: () => void;
}

const CategoryItem = (params: CategoryProps) => {
  return (
    <div className="flex gap-2 w-full" onClick={params.onClick}>
      <input
        type="checkbox"
        checked={params.checked}
        onChange={(e) => e.stopPropagation()}
        className="w-4 h-4 cursor-pointer"
      />
      <p className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0">
        {params.item.value}
      </p>
    </div>
  );
};

export default CategoryItem;
