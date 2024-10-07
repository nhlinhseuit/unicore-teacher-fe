import React from "react";
import Image from "next/image";


const FilterButton = () => {
  return (
    <div className="flex-between gap-2 paragraph-semibold">
      <Image
        src={"/assets/icons/filter.svg"}
        width={22}
        height={22}
        alt="Filter"
      />
      Mới nhất
    </div>
  );
};

export default FilterButton;
