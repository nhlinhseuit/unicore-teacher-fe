import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props {
  text: string;
  onClick: () => void;
  icon?: string;
  otherClasses?: string;
}

const PureButton = (params: Props) => {
  return (
    <Button
      onClick={params.onClick}
      className="primary-gradient min-h-[56px] 
            px-4 py-3 !text-light-900 rounded-[10px]
          "
    >
      {params.text}
    </Button>
  );
};

export default PureButton;
