import { SearchForm } from "./components/searchForm";
import styled from "@emotion/styled";
import { Box, Card, Heading } from "theme-ui";
import { Places } from "./components/places";
import { EmptyPropsWithChildren } from "./shared/types";

function Grid({ children }: EmptyPropsWithChildren) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      {children}
    </Box>
  );
}

function Container({ children }: EmptyPropsWithChildren) {
  return (
    <Box
      sx={{
        maxWidth: "container",
        mx: "auto",
        px: "md",
        py: "md",
      }}
    >
      {children}
    </Box>
  );
}

const StyledPlaces = styled(Places)`
  grid-column: 1 / 1;
`;

const StyledSearchCard = styled(Card)`
  grid-column: 1 / 1;
  ${(props) => props.theme.cards.none}
`;

function Layout() {
  return (
    <Container>
      <main>
        <header>
          <Heading
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
            color="primary"
            as="h1"
            py="md"
          >
            Nearby
          </Heading>
        </header>

        <Grid>
          <StyledSearchCard sx={{ mt: "md" }}>
            <SearchForm />
          </StyledSearchCard>
          <StyledPlaces />
        </Grid>
      </main>
    </Container>
  );
}

export { Layout };
