import { VisuallyHidden } from "@reach/visually-hidden";
import { Card, Heading } from "theme-ui";
import { SearchActions } from "./SearchActions";
import { Locations } from "./Locations";
import { SearchInput } from "./SearchInput";
import styled from "@emotion/styled";



function SearchForm() {
  return (
      <form>
        <VisuallyHidden>
          <Heading as="h2">Search Form</Heading>
        </VisuallyHidden>
        <Locations />
        <SearchInput />
        <SearchActions />
      </form>
  );
}

export { SearchForm };
