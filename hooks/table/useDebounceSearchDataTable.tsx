import { FilterType } from "@/constants";
import { normalizeSearchItem } from "@/lib/utils";
import { CourseDataItem, StudentDataItem, SubjectDataItem } from "@/types";
import { useEffect } from "react";

const useDebounceSearchDataTable = (
  debouncedSearchTerm: any,
  setFilteredDataTable: any,
  applyFilter: any,
  cancleDetailFilter: any,
  handleChooseFilter: any,
  dataSource:
    | CourseDataItem[]
    | SubjectDataItem[]
    | StudentDataItem[]
    | (CourseDataItem | SubjectDataItem | StudentDataItem)[],
  currentItems:
    | CourseDataItem[]
    | SubjectDataItem[]
    | StudentDataItem[]
    | (CourseDataItem | SubjectDataItem | StudentDataItem)[]
) => {
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredDataTable(currentItems); // TODO: Nếu không có từ khóa tìm kiếm, hiển thị dữ liệu về dạng pagination
      applyFilter();

      // TODO 1: => nếu đang có search thì debounce search làm cho dataTable về data search filter lại
      // TODO 2: => Còn đang có filter thì phải apply filter để từ dataTable lọc theo filter ra (thay vì sử dụng currentItems)

      // ! CASE 2: Khi save data => dataTable thay đổi và render lại => APPLY FILTER LẤY DATA SOURCE LÀ DATATABLE XONG LỌC QUA FILTER VÌ FILTER KHÁC DEFAULT
    } else {
      // ! CASE 1: ĐANG Ở SEARCH DATA, SAU SAVE DATA THÌ DATATABLE CẬP NHẬT => NHƯNG DEBOUNCE SEARCH LỌC GIÁ TRỊ TỪ DATATABLE VÌ SEARCHTERM != ''
      // ? ĐỐI VỚI SEARCH THÌ CÓ DEBOUNCE
      cancleDetailFilter();
      handleChooseFilter(FilterType.None);

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
