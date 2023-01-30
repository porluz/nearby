import { useContext } from "react";
import { MapsServiceContext } from "./mapsServiceContext";

function useMapsServiceContext() {
  const contextValue = useContext(MapsServiceContext);
  if (contextValue === null) {
    throw Error("Context has not been Provided!");
  }
  return contextValue;
}

export { useMapsServiceContext };
