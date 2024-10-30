import Image from "next/image";
import React, { ReactNode } from "react";

interface CollapsedButtonProps {
  children: ReactNode;
  onClose?: () => void;
}

const CollapsedButton: React.FC<CollapsedButtonProps> = ({
  children,
  onClose,
}) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-0 right-0 translate-x-[30%] -translate-y-[30%] flex items-center">
        <Image
          src="/assets/icons/close_circle.svg"
          alt="close"
          width={18}
          height={18}
          onClick={() => {
            if (onClose) onClose();
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CollapsedButton;
