import React from "react";
import { Input } from "../ui/input";
import SmallAvatar from "./SmallAvatar";

interface Props {
  textAvatar: string;
}

const MyComment = (params: Props) => {
  let inputValue = "";
  const handleInputChange = () => {};

  return (
    <div className="pl-2 flex items-center gap-4">
      <SmallAvatar text={params.textAvatar} bgColor={"bg-[#DA3B01]"} />
      <div className="border-b-[1px]">
        <Input
          type="text"
          placeholder="Bình luận"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: 200 }}
          className="
            paragraph-regular no-focus placeholder
            shadow-none outline-none border-none truncate"
        />
      </div>
    </div>
  );
};

export default MyComment;
