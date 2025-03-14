"use client";

import Image from "next/image";

type WeatherIconProps = {
  icon: string;
  size?: number;
};

const WeatherIcon = ({ icon, size = 50 }: WeatherIconProps) => {
  if (!icon) return null;
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather Icon"
      width={size}
      height={size}
      style={{ minWidth: size, minHeight: size }}
    />
  );
};

export default WeatherIcon;
