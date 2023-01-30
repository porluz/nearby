import { EmptyPropsWithChildren } from "../../types";
import { useLoadMapsServiceAsync } from "./hooks";
import { MapsServiceContext } from "./mapsServiceContext";


function MapsServiceContextProvider({ children }: EmptyPropsWithChildren) {

  const { mapsService, loading, loaded } = useLoadMapsServiceAsync();

  const data = {
    mapsService,
    loading,
    loaded,
  };

  const mapsServiceContext = {
    data,
  };

  return (
    <MapsServiceContext.Provider value={mapsServiceContext}>
      {children}
    </MapsServiceContext.Provider>
  );
}
export { MapsServiceContextProvider };
