"use client";

import { useEffect, useState } from "react";

import { config } from "@/configs/config";
import { useParams } from "next/navigation";
import useCities from "@/core/hooks/useCities";
import { useSettings } from "@/core/hooks/useSettings";
import { getCurrentWeatherWithForcast } from "@/core/services/weatherService";
import { getCurrentDate, getTimeFromTimestamp } from "@/core/utils/dateHelpers";
import ContentWrapper from "@/layouts/components/ContentWrapper";
import ListItem from "@/layouts/components/ListItem";
import SmallHeader from "@/layouts/components/GroupHeader";
import Separator from "@/layouts/components/Separator";
import {
  getChanceOfRain,
  getMinMaxTemperatures,
  renderTemperature,
} from "@/core/utils/weatherHelpers";
import { renderNumberWithCommas } from "@/core/utils/helpers";

const CityDetailPage = () => {
  const params = useParams();
  const cityId = params.id;

  const { cities } = useCities();
  const { settings } = useSettings();

  const city = cities.find((city) => city.id === cityId);

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
    <ContentWrapper className="flex flex-col flex-1 py-5 px-5 relative">
      <h1 className="text-2xl font-bold">{city.name}</h1>
      <h2 className="font-medium mb-1 text-slate-600">
        {getCurrentDate(city.countryCode)}
      </h2>
      <span className="text-xs text-slate-600">
        MIN: {feelLike?.minTemp}°, MAX {feelLike.maxTemp}°
      </span>

      <div className="flex flex-col justify-center items-center flex-1 p-10">
        <img
          src={`${config.OPENWEATHER_ICON_URL}/${weather.current?.weather[0]?.icon}@2x.${config.OPENWEATHER_ICON_EXTENSION}`}
          alt="Weather Icon"
        />
        <span className="text-7xl font-semibold">
          {renderTemperature(weather.current?.temp)}
        </span>
        <small className="text-slate-600">
          {weather.current?.weather[0]?.main}
        </small>
      </div>

      <Separator />

      <SmallHeader>24 hours forcast</SmallHeader>

      <div className="flex overflow-x-auto overflow-y-hidden h-20 lg:h-24">
        {weather.hourly.map((hour: any, index: number) => (
          <div key={index} className="forcast-item">
            <span className="text-slate-500">
              {getTimeFromTimestamp(hour.dt)}
            </span>
            <img
              src={`${config.OPENWEATHER_ICON_URL}/${hour.weather[0].icon}.${config.OPENWEATHER_ICON_EXTENSION}`}
              alt="Weather Icon"
              style={{ maxWidth: "50px" }}
            />
            <small className="text-slate-500">{hour.temp.toFixed(0)}°</small>
          </div>
        ))}
      </div>

      <Separator />

      <SmallHeader>Current Details</SmallHeader>
      <ListItem>
        <label className="flex-1 ml-6 text-slate-500">Humidity:</label>
        <span className="flex-1 text-slate-500">
          {weather.current?.humidity}%
        </span>
      </ListItem>
      <ListItem>
        <label className="flex-1 ml-6 text-slate-500">Wind:</label>
        <span className="flex-1 text-slate-500">
          {weather.current?.wind_speed} km/h
        </span>
      </ListItem>
      <ListItem>
        <label className="flex-1 ml-6 text-slate-500">Pressure:</label>
        <span className="flex-1 text-slate-500">
          {renderNumberWithCommas(weather.current?.pressure)} mBar
        </span>
      </ListItem>
      <ListItem>
        <label className="flex-1 ml-6 text-slate-500">Chance of rain:</label>
        <span className="flex-1 text-slate-500">
          {getChanceOfRain(weather.hourly)}%
        </span>
      </ListItem>
    </ContentWrapper>
  );
};

export default CityDetailPage;
