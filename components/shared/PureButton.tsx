import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
  text: string;
  icon?: string;
  otherClasses?: string;
}

const PureButton = ({ icon, text, otherClasses }: Props) => {
  return (
    <Button
      className="primary-gradient min-h-[56px] 
            px-4 py-3 !text-light-900 rounded-[10px]
          "
    >
      Tạo thông báo
    </Button>
  );
};

export default PureButton;
