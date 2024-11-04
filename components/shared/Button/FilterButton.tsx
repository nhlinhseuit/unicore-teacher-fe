import React from "react";
import Image from "next/image";

const FilterButton = () => {
  return (
    <div className="flex-center gap-2 paragraph-semibold max-lg:hidden cursor-pointer">
      <Image
        src={"/assets/icons/sort.svg"}
        width={22}
        height={22}
        alt="Filter"
      />
      Mới nhất
    </div>
  );
};

export default FilterButton;
