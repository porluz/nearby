import { createContext } from "react";

type RefTypes = HTMLUListElement | null;

type PlacesContextType = {
  data: {
    refs: Record<string, React.MutableRefObject<RefTypes>>;
    showPlaces: boolean;
    nearbyPlaces: google.maps.places.PlaceResult[] | null;
  };
  actions: {
    setShowPlaces: (showPlaces: boolean) => void;
    setNearbyPlaces: (nearbyPlaces: google.maps.places.PlaceResult[] | null) => void;
  };
};
const PlacesContext = createContext<PlacesContextType | null>(null);

export { PlacesContext };
