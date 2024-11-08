import React, { ReactNode } from "react";

interface BorderContainerProps {
  children: ReactNode;
  otherClasses?: string;
}

const BorderContainer: React.FC<BorderContainerProps> = ({ children, otherClasses }) => {
  return (
    <div className={`border-[1px] light-border-2 rounded-lg ${otherClasses}`}>
      {children}
    </div>
  );
};

export default BorderContainer;
