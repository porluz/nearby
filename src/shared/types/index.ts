import { PropsWithChildren } from "react";

type LocationInput = {
  label: string;
  coords: number[];
};
type LocationInputList = LocationInput[];

export type { LocationInput, LocationInputList };

export type EmptyPropsWithChildren = PropsWithChildren<Record<never, never>>;
