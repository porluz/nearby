import { MapsService } from "../../../../../shared/types";

type GetNearbyPlacesProps = {
  keyword: string;
  coords: number[];
};

const SEARCH_RADIUS = 500;
const REQUEST_FIELDS = ["name", "formatted_address", "rating"];

function useGetNearbyPlaces(mapsService: MapsService | null) {
  function getNearbyPlaces({
    keyword,
    coords,
  }: GetNearbyPlacesProps): Promise<google.maps.places.PlaceResult[]> {
    const location = new google.maps.LatLng(coords[0], coords[1]);

    const request = {
      query: keyword,
      fields: REQUEST_FIELDS,
      radius: SEARCH_RADIUS,
      location: location,
    };

    return new Promise((resolve, reject) => {
      if (!mapsService) {
        console.error("Maps Service is not loaded");
        Promise.reject(null);
      }
      if (mapsService !== null) {
        mapsService.textSearch(
          request,
          (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              resolve(results);
            } else {
              console.error(results);
              reject(results);
            }
          }
        );
      }
    });
  }

  return { getNearbyPlaces };
}

export { useGetNearbyPlaces };
