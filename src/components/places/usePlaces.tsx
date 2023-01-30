import { usePlacesContext } from "../../shared/contexts/placesContext/usePlacesContext";

function usePlaces() {
  const {
    data: {
      refs: { listPlacesRef },
      nearbyPlaces,
      showPlaces,
    },
  } = usePlacesContext();

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
