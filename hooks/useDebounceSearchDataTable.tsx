import { normalizeSearchItem } from "@/lib/utils";
import { CourseDataItem, SubjectDataItem } from "@/types";
import { useEffect } from "react";

const useDebounceSearchDataTable = (
  debouncedSearchTerm: any,
  setFilteredDataTable: any,
  dataSource: | CourseDataItem[]
  | SubjectDataItem[]
  | (CourseDataItem | SubjectDataItem)[],
) => {
    useEffect(() => {
        if (debouncedSearchTerm.trim() === "") {
          setFilteredDataTable(dataSource); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu
        } else {
          const filteredData = dataSource.filter((dataItem) => {
            return Object.values(dataItem.data).some((value) => {
              return normalizeSearchItem(value).includes(
                normalizeSearchItem(debouncedSearchTerm)
              );
            });
          });
          setFilteredDataTable(filteredData);
        }
      }, [debouncedSearchTerm, dataSource]);
};

export default useDebounceSearchDataTable;
