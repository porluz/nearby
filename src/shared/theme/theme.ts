const breakpoints = ["40em", "52em", "64em"];

export const theme = {
  fonts: {
    body: "Roboto, monospace",
    heading: "Roboto, monospace",
    monospace: "Menlo, monospace",
  },
  cards: {
    primary: {
      padding: 8,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    none: {
      padding: 4,
      boxShadow: "none",
    },
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
  },
  space: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },
  fontSizes: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1.125em",
    lg: "1.5rem",
    xl: "2.0rem",
  },
  sizes: {
    container: 768,
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
};

export type ExactTheme = typeof theme;
