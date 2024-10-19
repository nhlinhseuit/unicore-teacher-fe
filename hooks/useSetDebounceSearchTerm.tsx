import { useEffect } from "react";

const useSetDebounceSearchTerm = (
    setDebouncedSearchTerm: any,
    searchTerm: any,
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler); // Clear timeout nếu searchTerm thay đổi trong vòng 300ms
    };
  }, [searchTerm]);
};

export default useSetDebounceSearchTerm;
