"use client";

import FileDataTable from "@/components/shared/Table/TableFile/FileDataTable";
import { toast } from "@/hooks/use-toast";
import { mockFileDataTable } from "@/mocks";
import { useState } from "react";

const Files = () => {
  const [dataTable, setDataTable] = useState<any[]>(mockFileDataTable);


  return (
    <FileDataTable
      isEditTable={false}
      isMultipleDelete={false}
      // @ts-ignore
      dataTable={dataTable}
      onClickDelete={(itemsSelected: string[]) => {
        // ? DELETE THEO MÃ LỚP
        setDataTable((prevData) => {
          return prevData.map((item) => {
            if (itemsSelected.includes(item.STT.toString())) {
              return {
                ...item,
                isDeleted: true,
              };
            }
            return item;
          });
        });

        toast({
          title: "Xóa thành công",
          description: `${`Các file ${itemsSelected.join(", ")} đã được xóa.`}`,
          variant: "success",
          duration: 3000,
        });
      }}
    />
  );
};

export default Files;
