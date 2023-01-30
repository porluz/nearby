import { useContext } from "react";
import { SearchContext } from "./searchContext";

function useSearchContext() {
  const contextValue = useContext(SearchContext);
  if (contextValue === null) {
    throw Error("Context has not been Provided!");
  }
  return contextValue;
}

export { useSearchContext };
