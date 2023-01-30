import { Box, Flex } from "theme-ui";
import styled from "@emotion/styled";
import { useSearchButtonContainer } from "./hooks";
import { ReactComponent as SearchIcon } from "./search.svg";

const StyledButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: ${(props) => `${props.theme.space.sm}px`};
  border: 1px solid #ccc;
  &:disabled {
    background-color: #ccc;
  }
  ${(props) => `
    color: ${props.theme.colors.background};
    background-color: ${props.theme.colors.primary};
    padding: ${props.theme.space.sm};
    &:hover:enabled,
    &:focus:enabled {
      background-color: ${props.theme.colors.background};
      color: ${props.theme.colors.primary};
      border-color: ${props.theme.colors.primary};
    }
    font-size: ${props.theme.fontSizes.lg};
  `};

  /* style the svg */
  &:hover:enabled g,
  &:active:enabled g,
  &:focus:enabled g {
    stroke: ${(props) => props.theme.colors.primary};
  }
  &:active:enabled g {
    stroke-width: 2.5px;
  }

  ${props => `${props.theme.mediaQueries.small} {
      margin-left: auto;
      width: 200px;
    }
  `}
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 1.25rem;
  height: 1.25rem;
  border: 0;
  outline: none;
  > g {
    stroke: ${(props) => props.theme.colors.background};
    stroke-width: 1.5px;
  }
  > g:focus:enabled,
  g:hover:enabled {
    stroke: #299ecc;
    stroke-width: 1.5px;
  }
  ${props => `${props.theme.mediaQueries.small} {
      display: none;
    }
  `}

`;

const ButtonBox = styled(Box)`
  margin-left: 0px;
  width: 100%;
  @media (min-width: 768px) {
    margin-left: auto;
    width: 200px;
  }
`;

const ButtonText = styled.span`
  display: none;
  @media (min-width: 768px) {
    display: inline;
  }
`;

const SearchActions = () => {
  const {
    data: { enabledSearchButton, searching },
    actions: { handleClick },
  } = useSearchButtonContainer();

  return (
    <Flex>
      <ButtonBox mt={"lg"}>
        <StyledButton
          disabled={!enabledSearchButton || searching}
          type="submit"
          onClick={handleClick}
        >
          <ButtonText>Search</ButtonText>
          <StyledSearchIcon />
        </StyledButton>
      </ButtonBox>
    </Flex>
  );
};

export { SearchActions };
