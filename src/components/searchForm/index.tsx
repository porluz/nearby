import { VisuallyHidden } from "@reach/visually-hidden";
import { Heading } from "theme-ui";
import { SearchButtonContainer } from "./components/searchButtonContainer";
import { Locations } from "./components/locations";
import { SearchInput } from "./components/searchInput";

function SearchForm() {
  return (
    <form>
      <VisuallyHidden>
        <Heading as="h2">Search Form</Heading>
      </VisuallyHidden>
      <Locations />
      <SearchInput />
      <SearchButtonContainer />
    </form>
  );
}

export { SearchForm };
