import React, { createContext } from "react";
import type { LocationInput } from "../../../shared/types";

type RefTypes = HTMLUListElement | null;

type SearchContextType = {
  data: {
    currentLocation: LocationInput | null;
    searchKeyword: string;
    showPlaces: boolean;
    isFormValid: boolean;
    nearbyPlaces: google.maps.places.PlaceResult[] | null;
    refs: Record<string, React.MutableRefObject<RefTypes>>;
  };
  actions: {
    setSearchKeyword: (searchKeyword: string) => void;
    setCurrentLocation: (currentLocation: LocationInput | null) => void;
    setShowPlaces: (showPlaces: boolean) => void;
    setNearbyPlaces: (
      nearbyPlaces: google.maps.places.PlaceResult[] | null
    ) => void;
  };
} | null;

const SearchContext = createContext<SearchContextType>(null);

export { SearchContext };
