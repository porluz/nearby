import { ThemeProvider } from "theme-ui";
import { Layout } from "./layout";
import { MapsServiceContextProvider } from "./shared/contexts/mapsServiceContext";
import { SearchContextProvider } from "./shared/contexts/searchContext";
import { theme, GlobalStyles } from "./shared/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MapsServiceContextProvider>
        <SearchContextProvider>
          <Layout />
        </SearchContextProvider>
      </MapsServiceContextProvider>
      
    </ThemeProvider>
  );
}
