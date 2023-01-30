import { ThemeProvider } from "theme-ui";
import { Layout } from "./Layout";
import { MapsServiceContextProvider } from "./shared/contexts/mapsServiceContext";
import { theme, GlobalStyles } from "./shared/theme";
import { PlacesContextProvider } from "./shared/contexts/placesContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MapsServiceContextProvider>
        <PlacesContextProvider>
          <Layout />
        </PlacesContextProvider>
      </MapsServiceContextProvider>
    </ThemeProvider>
  );
}
