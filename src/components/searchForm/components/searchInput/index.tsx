import { useSearchInput } from "./useSearchInput";
import { Box, Text } from "theme-ui";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 100%;
  padding: ${(props) => `${props.theme.space.sm}px`};
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

function SearchInput() {
  const {
    data: { searchKeyword },
    actions: { handleChange },
  } = useSearchInput();

  return (
    <>
      <label htmlFor="search-places">
        <Text
          sx={{ fontSize: ["md", "lg"], fontWeight: "bold" }}
          p={2}
          color="primary"
        >
          Enter a search query
        </Text>
      </label>
      <Box p={2}>
        <StyledInput
          onChange={handleChange}
          value={searchKeyword}
          type="text"
          name="search"
          id="search-places"
        />
      </Box>
    </>
  );
}

export { SearchInput };
