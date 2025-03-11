import { config } from "@/utils/config";

export async function getCitySuggestions(query: string) {
  if (!query) return [];

  const url = `${config.MAPBOX_SEARCH_API_URL}?q=${query}&types=${config.MAPBOX_SEARCH_TYPE}&session_token=${config.MAPBOX_SESSION_TOKEN}&access_token=${config.MAPBOX_API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch suggestions");

    const data = await res.json();
    return data.features || [];
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

export async function getTemperatureByLocation(lat: number, lng: number) {
  const url = `${config.OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${config.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch temperature");

    const data = await res.json();
    return data.main.temp;
  }
  catch (error) {
    console.error("Error fetching temperature:", error);
    return null;
  }
}
