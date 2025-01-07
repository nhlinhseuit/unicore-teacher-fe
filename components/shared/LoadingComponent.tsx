import React from "react";
import { ring2 } from "ldrs";
const LoadingComponent = () => {
  ring2.register();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* <div className="bg-white w-20 h-20 flex rounded-xl items-center justify-center shadow-md"> */}
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.5"
        bg-opacity="0.1"
        speed="0.8"
        color="#5D87FF"
      ></l-ring-2>
      {/* </div> */}
    </div>
  );
};
export default LoadingComponent;