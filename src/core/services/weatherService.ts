import { config } from "@/configs/config";
import { TemperatureUnit } from "../types";

export async function getCitySuggestions(query: string) {
  if (!query) return [];

  const url = `${config.MAPBOX_SEARCH_API_URL}?q=${query}&types=${config.MAPBOX_SEARCH_TYPE}&session_token=${config.MAPBOX_SESSION_TOKEN}&access_token=${config.MAPBOX_API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch suggestions");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

export async function getCurrentWeather(lat: number, lng: number, unit: TemperatureUnit) {
  const url = `${config.OPENWEATHER_LOCATION_API_URL}?lat=${lat}&lon=${lng}&appid=${config.OPENWEATHER_API_KEY}&units=${unit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather data");

    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function getCurrentWeatherWithForcast(lat: number, lng: number, unit: TemperatureUnit) {
  const url = `${config.OPENWEATHER_ONECALL_API_URL}?lat=${lat}&lon=${lng}&appid=${config.OPENWEATHER_API_KEY}&units=${unit}&exclude=minutely,daily`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather data");

    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
