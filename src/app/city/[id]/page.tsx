"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import useCities from "@/core/hooks/useCities";
import { useSettings } from "@/core/hooks/useSettings";
import { getCurrentWeatherWithForcast } from "@/core/services/weatherService";
import { getCurrentDate, getTimeFromTimestamp } from "@/core/utils/dateHelpers";
import ContentWrapper from "@/components/ContentWrapper";
import Separator from "@/components/Separator";
import {
  getChanceOfRain,
  getMinMaxTemperatures,
  renderTemperature,
} from "@/core/utils/weatherHelpers";
import { renderNumberWithCommas } from "@/core/utils/helpers";
import WeatherIcon from "@/components/WeatherIcon";
import Link from "next/link";
import { List, ListCheck, ListEnd, ListIcon, ListRestart } from "lucide-react";

const CityDetailPage = () => {
  const params = useParams();
  const cityId = params.id;

  const { cities } = useCities();
  const { settings } = useSettings();

  const city = cities.find((city) => city.id == cityId);

  const [weather, setWeather] = useState<OpenWeatherResponse>();
  const [feelLike, setFeelLike] = useState<any>({});

  useEffect(() => {
    if (city) {
      getCurrentWeatherWithForcast(
        city.latitude,
        city.longitude,
        settings.temperatureUnit!
      ).then((res) => {
        setWeather(res);
        const { minTemp, maxTemp } = getMinMaxTemperatures(res.hourly);
        setFeelLike({ minTemp, maxTemp });
      });
    }
  }, [city]);

  if (!city || !weather) {
    return null;
  }

  return (
    <ContentWrapper className="flex flex-col p-5">
      {/* city section */}
      <section>
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold">{city.name}</h1>
          <Link href={`/`}>
            <List
              size={32}
              className="text-slate-600 border rounded-full p-1 cursor-pointer -mr-1"
            />
          </Link>
        </div>
        <h2 className="font-medium mb-1 text-slate-600">
          {getCurrentDate(city.countryCode)}
        </h2>
        <span className="text-xs text-slate-600">
          MIN: {feelLike?.minTemp}°, MAX {feelLike.maxTemp}°
        </span>
      </section>

      {/* current temp section */}
      <section className="flex flex-col justify-center items-center ">
        <WeatherIcon icon={weather.current?.weather[0]?.icon} size={100} />
        <span className="text-7xl font-semibold mb-2">
          {renderTemperature(weather.current?.temp)}
        </span>
        <small className="text-slate-600">
          {weather.current?.weather[0]?.main}
        </small>
      </section>

      <Separator />

      {/* 24h forcast section */}
      <section>
        <h4 className={`text-xs font-medium uppercase mb-4 text-slate-600`}>
          24 hours forcast
        </h4>
        <div className="flex overflow-x-auto overflow-y-hidden">
          {weather.hourly.map((hour: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center text-sm mr-3 first:-ml-2 last:mr-0"
            >
              <small className="text-slate-500 text-nowrap leading-none">
                {getTimeFromTimestamp(hour.dt)}
              </small>
              <WeatherIcon icon={hour.weather[0].icon} />
              <small className="text-slate-500 leading-none mb-1">
                {hour.temp.toFixed(0)}°
              </small>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Detail section */}
      <section>
        <h4 className="text-xs font-medium uppercase mb-4 text-slate-600">
          Current Details
        </h4>
        <div className="text-xs mb-1 text-slate-600 flex justify-around items-start w-full">
          <label className="flex-1 ml-6 text-slate-500">Humidity:</label>
          <span className="flex-1 text-slate-500">
            {weather.current?.humidity}%
          </span>
        </div>
        <div className="text-xs mb-1 text-slate-600 flex justify-around items-start w-full">
          <label className="flex-1 ml-6 text-slate-500">Wind:</label>
          <span className="flex-1 text-slate-500">
            {weather.current?.wind_speed} km/h
          </span>
        </div>
        <div className="text-xs mb-1 text-slate-600 flex justify-around items-start w-full">
          <label className="flex-1 ml-6 text-slate-500">Pressure:</label>
          <span className="flex-1 text-slate-500">
            {renderNumberWithCommas(weather.current?.pressure)} mBar
          </span>
        </div>
        <div className="text-xs mb-1 text-slate-600 flex justify-around items-start w-full">
          <label className="flex-1 ml-6 text-slate-500">Chance of rain:</label>
          <span className="flex-1 text-slate-500">
            {getChanceOfRain(weather.hourly)}%
          </span>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default CityDetailPage;
