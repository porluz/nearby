type GetNearbyPlacesProps = {
  keyword: string;
  coords: number[];
};

const SEARCH_RADIUS = 500;

function useGetNearbyPlaces() {
  function getNearbyPlaces({
    keyword,
    coords,
  }: GetNearbyPlacesProps): Promise<google.maps.places.PlaceResult[]> {
    const location = new google.maps.LatLng(coords[0], coords[1]);

    const map = new google.maps.Map(
      Object.assign(document.createElement("div"), {
        id: "map",
      }),
      {
        center: location,
      }
    );

    const request = {
      query: keyword,
      fields: ["name", "formatted_address", "rating"],
      radius: SEARCH_RADIUS,
      location: location,
    };

    const service = new google.maps.places.PlacesService(map);

    return new Promise((resolve, reject) => {
      service.textSearch(
        request,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            console.error(results);
            reject(results);
          }
        }
      );
    });
  }

  return { getNearbyPlaces };
}

export { useGetNearbyPlaces };
