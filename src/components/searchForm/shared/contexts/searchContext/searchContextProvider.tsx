import { useMemo, useRef, useState } from "react";
import { EmptyPropsWithChildren, LocationInput, MapsService } from "../../../../../shared/types";
import { SearchContext } from "./searchContext";

function SearchContextProvider({ children }: EmptyPropsWithChildren) {
  const [currentLocation, setCurrentLocation] = useState<LocationInput | null>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showPlaces, setShowPlaces] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);

  const locationLabel = currentLocation?.label;

  const isFormValid = useMemo(() => {
    const validSearchInput = searchKeyword.length > 2;
    return !!(locationLabel && validSearchInput);
  }, [locationLabel, searchKeyword.length]);


  const data = {
    currentLocation,
    searchKeyword,
    showPlaces,
    isFormValid,
    nearbyPlaces,
  };

  const actions = {
    setSearchKeyword,
    setCurrentLocation,
    setShowPlaces,
    setNearbyPlaces,
  };

  const searchContextValue = {
    data,
    actions,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
}
export { SearchContextProvider };
