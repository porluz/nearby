import { createContext } from "react";
import type { LocationInput } from "../../../../../shared/types";

type SearchContextType = {
  data: {
    currentLocation: LocationInput | null;
    searchKeyword: string;
    isFormValid: boolean;
  };
  actions: {
    setSearchKeyword: (searchKeyword: string) => void;
    setCurrentLocation: (currentLocation: LocationInput | null) => void;
  };
} | null;

const SearchContext = createContext<SearchContextType>(null);

export { SearchContext };
