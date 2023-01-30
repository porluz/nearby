import { PropsWithChildren } from "react";

type LocationInput = {
  label: string;
  coords: number[];
};
type LocationInputList = LocationInput[];

export type { LocationInput, LocationInputList };

export type MapsService = google.maps.places.PlacesService;

export type EmptyPropsWithChildren = PropsWithChildren<unknown>;
