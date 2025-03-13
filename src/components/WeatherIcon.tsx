import Image from "next/image";

type Props = {
  icon: string;
  size?: number;
};

const WeatherIcon = (props: Props) => {
  const { icon, size } = props;
  const iconUrl = "https://openweathermap.org/img/wn";

  return (
    <Image
      src={`${iconUrl}/${icon}@4x.png`}
      alt="Weather icon"
      width={size ?? 50}
      height={size ?? 50}
      style={{ minWidth: size ?? 50, minHeight: size ?? 50 }}
    />
  );
};

export default WeatherIcon;
