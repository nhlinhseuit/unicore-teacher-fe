import React from "react";

const Divider = ({ otherClasses }: { otherClasses?: string }) => {
  return (
    <div className={`my-4 h-[2px] w-full bg-gray-100 ${otherClasses}`}></div>
  );
};

export default Divider;
