import { Text, Box } from "theme-ui";
import { LocationsSelect } from "./LocationsSelect";

function Locations() {
  return (
    <>
      <Text
        sx={{ fontSize: ["md", "lg"], fontWeight: "bold" }}
        p={2}
        color="primary"
      >
        Select a location
      </Text>
      <Box p={2}>
        <LocationsSelect />
      </Box>
    </>
  );
}

export { Locations };
