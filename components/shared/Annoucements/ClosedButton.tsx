import Image from "next/image";
import React, { ReactNode } from "react";

interface ClosedButtonProps {
  children: ReactNode;
  _id?: string | number;
  onClose?: (index: number) => void;
}

const ClosedButton: React.FC<ClosedButtonProps> = ({
  children,
  onClose,
  _id,
}) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-0 right-0 translate-x-[30%] -translate-y-[40%] flex items-center">
        <Image
          src="/assets/icons/close_circle.svg"
          alt="close"
          width={18}
          height={18}
          onClick={() => {
            if (onClose) onClose(_id as number);
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ClosedButton;
