import { useEffect, useState } from "react";
import { MapsService } from "../../../types";

const GOOGLE_MAPS_API_SCRIPT_ID = "google-maps";
const GOOGLE_MAPS_API_MAP_ELEMENT_ID = "map";
const GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/js";
const GOOGLE_MAPS_API_CALLBACK_FN_NAME = "initMap";
const GOOGLE_MAPS_API_LIBRARIES = "places";

function useLoadMapsServiceAsync() {
  const [mapsService, setMapsService] = useState<MapsService | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMapsService = async () => {
      try {
        setLoading(true);
        const mapsService = await createMapsService();
        setMapsService(mapsService);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadMapsService();
  }, []);

  return {
    mapsService,
    loading,
    loaded: mapsService !== null && !loading,
  };
}

async function createMapsService(): Promise<MapsService> {
  let mapsScript = document.getElementById(
    GOOGLE_MAPS_API_SCRIPT_ID
  ) as HTMLScriptElement;
  if (mapsScript) {
    return Promise.reject(
      "A script with the same google map script already exists. The service may already have been loaded."
    );
  }
  if (document.getElementById(GOOGLE_MAPS_API_MAP_ELEMENT_ID) === null) {
    return Promise.reject("Missing an element with the maps id");
  }

  try {
    await load();
    const map = new google.maps.Map(
      Object.assign(document.createElement("div"), {
        id: GOOGLE_MAPS_API_MAP_ELEMENT_ID,
      })
    );

    const service = new google.maps.places.PlacesService(map);
    return Promise.resolve(service);
  } catch (error) {
    return Promise.reject("Unable to load the google maps api service!");
  }
}

function load(): Promise<void> {
  let mapsScript = document.createElement("script");
  mapsScript.src = getSource();
  mapsScript.id = GOOGLE_MAPS_API_SCRIPT_ID;
  document.body.appendChild(mapsScript);
  return new Promise((resolve, reject) => {
    mapsScript.onload = () => {
      resolve();
    };
    mapsScript.onerror = () => {
      reject();
    };
  });
}

function getSource() {
  const key =
    process.env.REACT_APP_GOOGLE_API_KEY ?? "MISSING_GOOGLE_MAPS_API_KEY";
  const searchParams = {
    key,
    libraries: GOOGLE_MAPS_API_LIBRARIES,
    callback: GOOGLE_MAPS_API_CALLBACK_FN_NAME,
  };
  const urlSearchParams = new URLSearchParams(searchParams).toString();
  return `${GOOGLE_MAPS_API_URL}?${urlSearchParams}`;
}

export { useLoadMapsServiceAsync };
