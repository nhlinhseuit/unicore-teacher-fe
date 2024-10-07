import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
  text: string;
  icon?: string;
  otherClasses?: string;
}

const IconButton = ({ icon, text, otherClasses }: Props) => {
  return (
    <Button
      className="primary-gradient min-h-[56px] 
            px-4 py-3 !text-light-900 rounded-[10px]
          "
    >
      <div className="flex-between gap-2">
        <Image
          src={"/assets/icons/add.svg"}
          width={18}
          height={18}
          alt="DevFlow"
        />
        Tạo thông báo
      </div>
    </Button>
  );
};

export default IconButton;
