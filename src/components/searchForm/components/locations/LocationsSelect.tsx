import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { useLocationsSelect } from "./useLocationsSelect";
import styled from "@emotion/styled";
import { Box } from "theme-ui";
import "@reach/combobox/styles.css";

const StyledComboBoxInput = styled(ComboboxInput)`
  width: 100%;
  padding: ${(props) => `${props.theme.space.sm}px`};
  border: 1px solid #ccc;
  border-radius: ${(props) => `${props.theme.space.sm}px`};
  resize: vertical;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const StyledComboboxOption = styled(ComboboxOption)`
  font-size: ${(props) => props.theme.fontSizes.md};
  padding: ${(props) => `${props.theme.space.md}px`};
  border: 1px solid #ccc;
  [data-user-value] {
    color: ${(props) => props.theme.colors.primary};
  }
`;

function LocationsSelect() {
  const {
    data: { locations },
    actions: { handleSelect, handleChange },
  } = useLocationsSelect();

  return (
    <Box>
      <Combobox aria-label="Places" openOnFocus onSelect={handleSelect}>
        <StyledComboBoxInput onChange={handleChange} autocomplete />
        <ComboboxPopover>
          <ComboboxList>
            {locations.map((location, index) => (
              <StyledComboboxOption key={index} value={`${location.label}`} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Box>
  );
}

export { LocationsSelect };
