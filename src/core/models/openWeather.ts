type OpenWeatherResponse = {
  current: OpenWeatherCurrent
  hourly: []
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

type OpenWeatherCurrent = {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: any[]
}