import { useCallback, useState } from "react";
import { usePlacesContext } from "../../../../shared/contexts/placesContext";
import { useSearchContext } from "../../shared/contexts/searchContext";
import { useGetNearbyPlaces } from "./useGetNearbyPlaces";

function useSearchActions() {
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

  const { getNearbyPlacesAsync } = useGetNearbyPlaces();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault();
      if (!currentLocation?.coords) {
        console.error("Missing a location");
        return;
      }
      setSearching(true);
      getNearbyPlacesAsync({
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
    [listPlacesRef, currentLocation, getNearbyPlacesAsync, searchKeyword, setNearbyPlaces]
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

export { useSearchActions };
