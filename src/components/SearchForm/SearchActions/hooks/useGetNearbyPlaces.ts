import { useMapsServiceContext } from "../../../../shared/contexts/mapsServiceContext";

type GetNearbyPlacesProps = {
  keyword: string;
  coords: number[];
};

const SEARCH_RADIUS = 500;
const DETAIL_FIELDS = ["formatted_address", "url"];

function useGetNearbyPlaces() {
  const {
    data: { mapsService },
  } = useMapsServiceContext();

  function getNearbyPlacesAsync({
    keyword,
    coords: [lat, lng],
  }: GetNearbyPlacesProps): Promise<google.maps.places.PlaceResult[]> {
    const location = new google.maps.LatLng(lat, lng);

    const request = {
      keyword,
      radius: SEARCH_RADIUS,
      location: location,
    };

    if (mapsService === null) {
      return Promise.reject("Maps Service is not loaded");
    }

    return new Promise((resolve, reject) => {
      mapsService.nearbySearch(
        request,
        async (
          nearbySearchResults: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && nearbySearchResults) {
            if (nearbySearchResults.length === 0) {
              return resolve(nearbySearchResults);
            }

            const placeDetailResults = await fetchPlacesDetailsAsync(mapsService, nearbySearchResults);
            placeDetailResults.forEach((placeDetailResult, index) => {
              if (placeDetailResult.status === "fulfilled") {
                nearbySearchResults[index].url = placeDetailResult.value?.url;
                nearbySearchResults[index].formatted_address = placeDetailResult.value?.formatted_address;
              }
            });
            resolve(nearbySearchResults);
          } else {
            reject(nearbySearchResults);
          }
        }
      );
    });
  }

  return { getNearbyPlacesAsync };
}

function fetchPlacesDetailsAsync(
  mapsService: google.maps.places.PlacesService,
  nearbySearchResults: google.maps.places.PlaceResult[]
) {
  const placeDetailPromises = nearbySearchResults.map((nearbySearchResult) => {
    if (!nearbySearchResult.place_id) {
      return Promise.resolve(nearbySearchResult);
    }
    return fetchPlaceDetailsAsync(mapsService, nearbySearchResult.place_id);
  });

  return Promise.allSettled(placeDetailPromises);
}

function fetchPlaceDetailsAsync(
  service: google.maps.places.PlacesService,
  placeId: string
): Promise<google.maps.places.PlaceResult | null> {
  const request: google.maps.places.PlaceDetailsRequest = {
    placeId,
    fields: DETAIL_FIELDS,
  };
  return new Promise((resolve, reject) => {
    service.getDetails(
      request,
      (results: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          reject(results);
        }
      }
    );
  });
}

export { useGetNearbyPlaces };
