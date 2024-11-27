import React from "react";
import SmallAvatar from "./SmallAvatar";
import { getAvatarName } from "@/lib/utils";

interface Props {
  name: string;
  email: string;
}

const UserInfoWithEmail = (params: Props) => {
  return (
    <div className="flex pl-2 gap-4 ">
      <SmallAvatar text={getAvatarName(params.name)} />
      <div>
        <p className="small-regular">{params.name}</p>
        <p className="body-regular mt-1 underline">{params.email}</p>
      </div>
    </div>
  );
};

export default UserInfoWithEmail;
