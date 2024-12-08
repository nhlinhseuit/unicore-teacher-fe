import React from "react";
import InputForm from "./InputForm";

interface Props {
  totalPages: string;
  totalChapters: string;
  totalFigures: string;
  totalTables: string;
  totalReferences: string;
  overviewComment: string;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const GeneralOfReport = (params: Props) => {
  return (
    <div className="ml-4 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label className="base-regular w-[25%]">Số trang: </label>
        <div className="flex-grow">
          <InputForm
            placeholder="Nhập số trang"
            name="totalPages"
            value={params.totalPages}
            onChange={params.handleChange}
            otherClassess="w-full"
          />
        </div>
      </div>

      <div className=" flex items-center gap-4">
        <label className="base-regular w-[25%]">Số chương: </label>
        <div className="flex-grow">
          <InputForm
            placeholder="Nhập số chương"
            name="totalChapters"
            value={params.totalChapters}
            onChange={params.handleChange}
            otherClassess="w-full"
          />
        </div>
      </div>

      <div className=" flex items-center gap-4">
        <label className="base-regular w-[25%]">Số hình vẽ: </label>
        <div className="flex-grow">
          <InputForm
            placeholder="Nhập số hình vẽ"
            name="totalFigures"
            value={params.totalFigures}
            onChange={params.handleChange}
            otherClassess="w-full"
          />
        </div>
      </div>

      <div className=" flex items-center gap-4">
        <label className="base-regular w-[25%]">Số bảng biểu: </label>
        <div className="flex-grow">
          <InputForm
            placeholder="Nhập số bảng biểu"
            name="totalTables"
            value={params.totalTables}
            onChange={params.handleChange}
            otherClassess="w-full"
          />
        </div>
      </div>

      <div className=" flex items-center gap-4">
        <label className="base-regular w-[25%]">Số tài liệu tham khảo: </label>
        <div className="flex-grow">
          <InputForm
            placeholder="Nhập số tài liệu tham khảo"
            name="totalReferences"
            value={params.totalReferences}
            onChange={params.handleChange}
            otherClassess="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralOfReport;
