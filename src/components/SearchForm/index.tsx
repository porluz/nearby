import { VisuallyHidden } from "@reach/visually-hidden";
import { Heading } from "theme-ui";
import { SearchActions } from "./SearchActions";
import { Locations } from "./Locations";
import { SearchInput } from "./SearchInput";
import { SearchContextProvider } from "./shared/contexts/searchContext";

function SearchForm() {
  return (
    <SearchContextProvider>
      <form>
        <VisuallyHidden>
          <Heading as="h2">Search Form</Heading>
        </VisuallyHidden>
        <Locations />
        <SearchInput />
        <SearchActions />
      </form>
    </SearchContextProvider>
  );
}

export { SearchForm };
