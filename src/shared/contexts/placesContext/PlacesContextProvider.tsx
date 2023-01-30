import { useRef, useState } from "react";
import { EmptyPropsWithChildren } from "../../types";
import { PlacesContext } from "./placesContext";

function PlacesContextProvider({ children }: EmptyPropsWithChildren) {
  const [showPlaces, setShowPlaces] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<google.maps.places.PlaceResult[] | null>(null);

  const listPlacesRef = useRef<HTMLUListElement>(null);

  const refs = {
    listPlacesRef,
  };

  const data = {
    refs,
    showPlaces,
    nearbyPlaces,
  };

  const actions = {
    setShowPlaces,
    setNearbyPlaces,
  };

  const searchContextValue = {
    data,
    actions,
  };

  return <PlacesContext.Provider value={searchContextValue}>{children}</PlacesContext.Provider>;
}
export { PlacesContextProvider };
