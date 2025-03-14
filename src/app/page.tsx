"use client";

import { useState, useEffect } from "react";
import useCities from "@/core/hooks/useCities";
import useSettings from "@/core/hooks/useSettings";
import { getCurrentWeather } from "@/core/services/weatherService";
import { getLocalTime } from "@/core/utils/dateHelpers";
import { renderTemperature } from "@/core/utils/weatherHelpers";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import WeatherIcon from "@/components/WeatherIcon";

export default function HomePage() {
  const { cities, removeCity } = useCities();
  const { settings } = useSettings();

  const [weathers, setWeathers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cities.length > 0) {
      fetchWeathers();
    }
  }, [cities]);

  const fetchWeathers = async () => {
    try {
      const weatherPromises = cities.map((city: City) =>
        getCurrentWeather(
          city.latitude,
          city.longitude,
          settings.temperatureUnit!
        )
      );
      const responses = await Promise.all(weatherPromises);
      const results = responses.map((response) => response);
      setWeathers(results);
      setError(null); 
    } catch (error) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <>
      {error && <div className="text-xs text-red-600 mb-2 mx-1">{error}</div>}

      <ul>
        {cities.map((city, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 bg-white border border-gray-100 shadow-lg rounded-lg mb-4 relative`}
          >
            <Link key={index} className="flex w-full" href={`/city/${city.id}`}>
              <div className={`flex-1`}>
                <h3 className="text-xl font-bold">{city.name}</h3>
                <p className="text-sm text-slate-500">
                  {getLocalTime(city.countryCode)}
                </p>
              </div>
              <div className="flex items-center pt-2">
                <WeatherIcon icon={weathers[index]?.weather[0].icon} />
                <span className="text-xl text-slate-700">
                  {renderTemperature(weathers[index]?.main.temp)}
                </span>
              </div>
            </Link>

            {/* Dot Menu */}
            <Popover className="absolute top-2 right-1 ">
              <PopoverButton
                className="text-slate-600 outline-none "
                data-testid="popover-button"
              >
                <MoreVertical size={20} />
              </PopoverButton>

              <PopoverPanel className="absolute right-1 top-1 w-32 bg-white shadow-lg rounded-lg border p-2">
                <button
                  className="flex items-center w-full text-left text-sm p-1 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCity(city.id);
                  }}
                >
                  <Trash size={16} />
                  <span className="ml-2">Remove</span>
                </button>
              </PopoverPanel>
            </Popover>
          </li>
        ))}
      </ul>
    </>
  );
}
