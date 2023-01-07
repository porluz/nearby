import { useSearchContext } from "../../shared/contexts/searchContext";

function usePlaces() {
  const {
    data: {
      refs: { listPlacesRef },
      nearbyPlaces,
      showPlaces,
    },
  } = useSearchContext();

  const data = {
    listPlacesRef: listPlacesRef as React.MutableRefObject<HTMLUListElement>,
    nearbyPlaces,
    showPlaces,
  };
  const actions = {};

  return {
    data,
    actions,
  };
}

export { usePlaces };
