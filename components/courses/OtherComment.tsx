import React from "react";
import SmallAvatar from "./SmallAvatar";

interface Props {
  textAvatar: string;
  name: string;
  comment: string;
}

const OtherComment = (params: Props) => {
  return (
    <div className="flex pl-2 gap-4 ">
      <SmallAvatar text={params.textAvatar} />
      <div>
        <p className="small-regular">{params.name}</p>
        <p className="body-regular mt-1">{params.comment}</p>
      </div>
    </div>
  );
};

export default OtherComment;
