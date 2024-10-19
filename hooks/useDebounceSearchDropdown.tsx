import { normalizeSearchItem } from "@/lib/utils";
import { useEffect } from "react";

const useDebounceSearchDropdown = (
  debouncedSearchTerm: any,
  setFilteredData: any,
  filteredData: any
) => {
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      console.log('if')
      setFilteredData(filteredData); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu
    } else {
      console.log('else')
      const filteredResult = filteredData.filter((dataItem: any) => {
        console.log('dataItem', normalizeSearchItem(dataItem))
        console.log('debouncedSearchTerm', normalizeSearchItem(debouncedSearchTerm))

        return normalizeSearchItem(dataItem).includes(
          normalizeSearchItem(debouncedSearchTerm)
        );
      });
      setFilteredData(filteredResult);
    }
  }, [debouncedSearchTerm, filteredData]);
};

export default useDebounceSearchDropdown;
