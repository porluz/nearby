import "@emotion/react";
import "@types/googlemaps";
import type { ExactTheme } from "../src/shared/theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ExactTheme {}
}
