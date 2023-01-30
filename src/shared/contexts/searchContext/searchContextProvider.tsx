import { useMemo, useRef, useState } from "react";
import { EmptyPropsWithChildren, LocationInput, MapsService } from "../../types";
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
  const listPlacesRef = useRef<HTMLUListElement>(null);

  const isFormValid = useMemo(() => {
    const validSearchInput = searchKeyword.length > 2;
    return !!(locationLabel && validSearchInput);
  }, [locationLabel, searchKeyword.length]);

  const refs = {
    listPlacesRef,
  };

  const data = {
    refs,
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
