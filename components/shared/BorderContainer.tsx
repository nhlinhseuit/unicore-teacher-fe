import React, { ReactNode } from "react";

interface BorderContainerProps {
  children: ReactNode;
  otherClasses?: string;
  onClick?: () => void;
}

const BorderContainer: React.FC<BorderContainerProps> = ({ children, otherClasses, onClick }) => {
  return (
    <div onClick={onClick} className={`border-[1px] light-border-2 rounded-lg ${otherClasses}`}>
      {children}
    </div>
  );
};

export default BorderContainer;
