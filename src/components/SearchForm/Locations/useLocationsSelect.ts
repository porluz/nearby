import { useCallback, useState } from "react";
import { useSearchContext } from "../shared/contexts/searchContext";

const locations = [
  { label: "Home", coords: [40.8712, -73.919] },
  { label: "Snowmass, CO", coords: [39.213, -106.9378] },
  { label: "Malibu, CA", coords: [34.0259, -118.7798] },
  { label: "Catskill, NY", coords: [42.2146, -73.9595] },
  { label: "Grand Teton National Park, WY", coords: [43.7904, -110.6818] },
  { label: "Columbia River Gorge, OR", coords: [45.7253, -121.73] },
];

// function useLocationMatch({ term, locations }: LocationMatchProps) {
//   const throttledTerm = useThrottle(term, 100);
//   return useMemo(
//     () =>
//       term.trim() === ""
//         ? null
//         : matchSorter(locations, term, {
//             keys: [(item) => `${item.label}`]
//           }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [throttledTerm]
//   );
// }

function useLocationsSelect() {
  const {
    data: { currentLocation },
    actions: { setCurrentLocation },
  } = useSearchContext();

  const [, setTerm] = useState("");
  // const results = useLocationMatch({ term, locations });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(event.target.value);
      if (currentLocation) {
        setCurrentLocation(null);
      }
    },
    [currentLocation, setCurrentLocation]
  );

  const handleSelect = useCallback(
    (value: string) => {
      const selectedLocation = locations.find((location) => location.label === value);
      if (selectedLocation && currentLocation?.label !== selectedLocation.label) {
        setCurrentLocation(selectedLocation);
      }
    },
    [currentLocation, setCurrentLocation]
  );

  return {
    data: {
      locations,
    },
    actions: {
      handleSelect,
      handleChange,
    },
  };
}

export { useLocationsSelect };
