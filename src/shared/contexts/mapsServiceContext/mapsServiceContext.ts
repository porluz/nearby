import { createContext } from "react";

type MapsServiceContextType = {
  data: {
    mapsService: google.maps.places.PlacesService | null;
    loading: boolean;
    loaded: boolean;
  };
} | null;

const MapsServiceContext = createContext<MapsServiceContextType>(null);

export { MapsServiceContext };
