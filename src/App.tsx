import { ThemeProvider } from "theme-ui";
import { Layout } from "./layout";
import { SearchContextProvider } from "./shared/contexts/searchContext";
import { theme, GlobalStyles } from "./shared/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SearchContextProvider>
        <Layout />
      </SearchContextProvider>
    </ThemeProvider>
  );
}
