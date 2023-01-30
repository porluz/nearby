import { useCallback, useState } from "react";
import { useMapsServiceContext } from "../../../../shared/contexts/mapsServiceContext";
import { usePlacesContext } from "../../../../shared/contexts/placesContext";
import { useSearchContext } from "../../shared/contexts/searchContext";
import { useGetNearbyPlaces } from "./useGetNearbyPlaces";

function useSearchButtonContainer() {
  const {
    data: {
      refs: { listPlacesRef },
    },
    actions: { setNearbyPlaces },
  } = usePlacesContext();

  const {
    data: { searchKeyword, currentLocation, isFormValid },
  } = useSearchContext();

  const [searching, setSearching] = useState(false);
  const {
    data: { mapsService },
  } = useMapsServiceContext();
  const { getNearbyPlaces } = useGetNearbyPlaces(mapsService);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault();
      if (!currentLocation?.coords) {
        console.error("Missing a location");
        return;
      }
      setSearching(true);
      getNearbyPlaces({
        keyword: searchKeyword,
        coords: currentLocation.coords,
      })
        .then((result) => {
          setNearbyPlaces(result);
          listPlacesRef?.current?.focus();
        })
        .catch((error) => {
          console.log(error);
          setNearbyPlaces(null);
        })
        .finally(() => {
          setSearching(false);
        });
    },
    [
      listPlacesRef,
      currentLocation,
      getNearbyPlaces,
      searchKeyword,
      setNearbyPlaces,
    ]
  );

  const enabledSearchButton = isFormValid;
  const data = {
    listPlacesRef,
    enabledSearchButton,
    searching,
  };
  const actions = {
    handleClick,
    isFormValid,
  };

  return {
    data,
    actions,
  };
}

export { useSearchButtonContainer };
