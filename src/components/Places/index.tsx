import { usePlaces } from "./usePlaces";
import { Heading, Card, Box, Link } from "theme-ui";
import styled from "@emotion/styled";

const StyledPlacesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

type NearbyPlacesProps = {
  nearbyPlaces: google.maps.places.PlaceResult[] | null;
  listPlacesRef: React.MutableRefObject<HTMLUListElement | null>;
};

function NearbyPlaces({ nearbyPlaces, listPlacesRef }: NearbyPlacesProps) {
  return (
    <>
      <StyledPlacesList as="ul" aria-labelledby="places-heading" ref={listPlacesRef} tabIndex={-1}>
        {nearbyPlaces &&
          nearbyPlaces.map((place, index) => {
            return (
              <li key={index}>
                <Card my="md">
                  <Heading as="h3">
                    <Link href={place.url} target="_blank" rel="noopener noreferrer">
                      {place.name}
                    </Link>
                  </Heading>
                  <div>Address: {place.formatted_address}</div>
                  <div>Rating: {place.rating || "N/A"}</div>
                </Card>
              </li>
            );
          })}
      </StyledPlacesList>
    </>
  );
}

function Places() {
  const {
    data: { listPlacesRef, nearbyPlaces },
  } = usePlaces();

  return (
    <>
      <Box sx={{ display: nearbyPlaces ? "block" : "none" }}>
        <>
          <Heading
            color="primary"
            sx={{
              pl: "sm",
            }}
            as="h2"
            id="places-heading"
          >
            Places
          </Heading>
          <NearbyPlaces nearbyPlaces={nearbyPlaces} listPlacesRef={listPlacesRef} />
        </>
      </Box>
    </>
  );
}

export { Places };
