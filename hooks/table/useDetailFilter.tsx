import { useState} from "react";
import useSetDebounceSearchTerm from "./useSetDebounceSearchTerm";
import useDebounceSearchDropdown from "./useDebounceSearchDropdown";

type FilterValue = string | number;

export default function useDetailFilter<T extends FilterValue>(
  originalValues: T[]
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredValues, setFilteredValues] = useState<T[]>(originalValues);

  // Sử dụng custom hook để handle debounce search term
  useSetDebounceSearchTerm(setDebouncedSearchTerm, searchTerm);

  // Sử dụng custom hook để handle search
  useDebounceSearchDropdown(
    debouncedSearchTerm,
    setFilteredValues,
    originalValues
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredValues
  };
}
