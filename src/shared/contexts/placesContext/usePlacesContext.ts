import { useContext } from "react";
import { PlacesContext } from "./placesContext";

function usePlacesContext() {
  const contextValue = useContext(PlacesContext);
  if (contextValue === null) {
    throw Error("Context has not been Provided!");
  }
  return contextValue;
}

export { usePlacesContext };
