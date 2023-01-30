import { useMapsServiceContext } from "../../../../shared/contexts/mapsServiceContext";

type GetNearbyPlacesProps = {
  keyword: string;
  coords: number[];
};

const SEARCH_RADIUS = 500;
const REQUEST_FIELDS = ["name", "formatted_address", "rating"];

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
      query: keyword,
      fields: REQUEST_FIELDS,
      radius: SEARCH_RADIUS,
      location: location,
    };

    if (mapsService === null) {
      return Promise.reject("Maps Service is not loaded");
    }

    return new Promise((resolve, reject) => {
      mapsService.textSearch(
        request,
        (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(results);
          }
        }
      );
    });
  }

  return { getNearbyPlacesAsync };
}

export { useGetNearbyPlaces };
