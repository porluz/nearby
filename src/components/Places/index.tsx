import { usePlaces } from "./usePlaces";
import { Heading, Card, Box, Link } from "theme-ui";
import styled from "@emotion/styled";
import { NewComponent } from "../NewComponent/NewComponent";

const StyledPlacesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledRatingText = styled.span`
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.primary};
`;

type NearbyPlacesProps = {
  nearbyPlaces: google.maps.places.PlaceResult[] | null;
  listPlacesRef: React.MutableRefObject<HTMLUListElement | null>;
};

function NearbyPlaces({ nearbyPlaces, listPlacesRef }: NearbyPlacesProps) {
  return (
    <>
      <StyledPlacesList as="ul" aria-labelledby="places-heading" ref={listPlacesRef} tabIndex={-1}>
        {nearbyPlaces && nearbyPlaces.length === 0 && (
          <Card my="md">
            <li key={1}>No results for that search query in the selected location</li>
          </Card>
        )}
        {nearbyPlaces &&
          nearbyPlaces.length > 0 &&
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
                  <div>
                    <span>Rating: </span>
                    {place.rating ? <StyledRatingText>{place.rating}</StyledRatingText> : "N/A"}
                  </div>
                </Card>
              </li>
            );
          })}
      </StyledPlacesList>
      <NewComponent />
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
