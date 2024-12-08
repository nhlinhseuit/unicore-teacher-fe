import React from "react";
import InputForm from "./InputForm";
import CheckboxComponent from "../CheckboxComponent";

interface Props {
  acknowledgements: boolean;
  overviewVN: boolean;
  overviewEN: boolean;
  abbreviations: boolean;
  tableOfContents: boolean;

  handleClick: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SubGeneralOfReport = (params: Props) => {
  return (
    <div className="ml-4 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label className="base-regular w-[50%]">Lời cảm ơn</label>
        <div className="flex-grow">
          <input
            id={"acknowledgements"}
            name={"acknowledgements"}
            type="checkbox"
            checked={params.acknowledgements}
            onChange={params.handleClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      <div className="min-h-[40px] flex items-center gap-4">
        <label className="base-regular w-[50%]">Tóm tắt (TV) </label>
        <div className="flex-grow">
          <input
            id={"overviewVN"}
            name={"overviewVN"}
            type="checkbox"
            checked={params.overviewVN}
            onChange={params.handleClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      <div className="min-h-[40px] flex items-center gap-4">
        <label className="base-regular w-[50%]">Tóm tắt (TA) </label>
        <div className="flex-grow">
          <input
            id={"overviewEN"}
            name={"overviewEN"}
            type="checkbox"
            checked={params.overviewEN}
            onChange={params.handleClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      <div className="min-h-[40px] flex items-center gap-4">
        <label className="base-regular w-[50%]">Bảng KHVT </label>
        <div className="flex-grow">
          <input
            id={"abbreviations"}
            name={"abbreviations"}
            type="checkbox"
            checked={params.abbreviations}
            onChange={params.handleClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      <div className="min-h-[40px] flex items-center gap-4">
        <label className="base-regular w-[50%]">Mục lục </label>
        <div className="flex-grow">
          <input
            id={"tableOfContents"}
            name={"tableOfContents"}
            type="checkbox"
            checked={params.tableOfContents}
            onChange={params.handleClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SubGeneralOfReport;
