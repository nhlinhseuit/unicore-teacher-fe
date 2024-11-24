import React, { ReactNode } from "react";
import IconButton from "./Button/IconButton";

interface ShowOriginPostContainerProps {
  children: ReactNode;
  otherClasses?: string;
}

const ShowOriginPostContainer: React.FC<ShowOriginPostContainerProps> = ({
  children,
  otherClasses,
}) => {
  return (
    <div className="relative">
      {children}
      <IconButton
        text="Đi tới bài viết gốc"
        purple
        iconLeft="/assets/icons/eye-white.svg"
        otherClasses="absolute right-4 top-0 -translate-y-[40%]"
      />
    </div>
  );
};

export default ShowOriginPostContainer;
