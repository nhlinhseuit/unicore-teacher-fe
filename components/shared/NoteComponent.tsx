import React from "react";
import BorderContainer from "./BorderContainer";

interface Props {
  text: string;
}

const NoteComponent = (params: Props) => {
  return (
    <BorderContainer otherClasses="mb-4 p-6 flex flex-col gap-4">
      <p className="paragraph-semibold italic underline text-red-500">
        * Lưu ý:
      </p>
      <p className="text-sm">{params.text}</p>
    </BorderContainer>
  );
};

export default NoteComponent;
