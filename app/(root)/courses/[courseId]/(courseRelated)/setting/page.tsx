"use client";

import DataTable from "@/components/shared/Table/components/DataTable";
import { DataTableType } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { mockDataImportStudentList } from "@/mocks";
import { StudentDataItem } from "@/types";
import { useState } from "react";

const Setting = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<StudentDataItem[]>(
    mockDataImportStudentList
  );

  const { toast } = useToast();

  return (
    <div>
      <p className="ml-4 mt-12 paragraph-semibold">Danh sách sinh viên lớp</p>
      <DataTable
        type={DataTableType.Student}
        dataTable={dataTable}
        isEditTable={isEditTable}
        isMultipleDelete={isMultipleDelete}
        onClickEditTable={() => {
          setIsEditTable(true);
        }}
        onSaveEditTable={(localDataTable) => {
          setIsEditTable(false);
          // set lại data import hoặc patch API
          localDataTable = localDataTable as StudentDataItem[];
          setDataTable(localDataTable);
        }}
        onClickMultipleDelete={() => {
          setIsMultipleDelete(true);
        }}
        onClickDeleteAll={() => {
          setDataTable((prevData) => {
            return prevData.map((item) => ({
              ...item,
              isDeleted: true,
            }));
          });

          toast({
            title: "Xóa thành công",
            description: `Đã xóa tất cả sinh viên`,
            variant: "success",
            duration: 3000,
          });
        }}
        onClickDelete={(itemsSelected: string[]) => {
          // ? DELETE THEO MSSV
          setDataTable((prevData) => {
            return prevData.map((item) => {
              if (itemsSelected.includes(item.data["MSSV"])) {
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
            description: `${`Các sinh viên ${itemsSelected.join(
              ", "
            )} đã được xóa.`}`,
            variant: "success",
            duration: 3000,
          });
        }}
        onClickGetOut={() => {
          setIsMultipleDelete(false);
        }}
      />
    </div>
  );
};

export default Setting;
