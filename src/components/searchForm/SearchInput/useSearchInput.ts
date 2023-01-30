import { useCallback } from "react";
import { useSearchContext } from "../../../shared/contexts/searchContext";

function useSearchInput() {
  const {
    data: { searchKeyword },
    actions: { setSearchKeyword },
  } = useSearchContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(event.target.value);
    },
    [setSearchKeyword]
  );

  const data = {
    searchKeyword,
  };
  const actions = {
    handleChange,
  };

  return {
    data,
    actions,
  };
}

export { useSearchInput };
