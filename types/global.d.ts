import "@emotion/react";
import "@types/googlemaps";
import type { ExactTheme } from "../src/shared/theme";

declare module "@emotion/react" {
  export interface Theme extends ExactTheme {}
}

declare module "googlemaps";

declare global {
  interface Window {
    google: typeof google;
  }
}

