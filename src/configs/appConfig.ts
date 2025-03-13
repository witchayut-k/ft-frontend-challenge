import { TemperatureUnit } from "@/core/types"

export type Config = {
  temperatureUnit: TemperatureUnit
  defaultCity: string
  storageKey: string
  cityStorageKey: string
  defaultCities?: City[]
}

const appConfig: Config = {
  temperatureUnit: 'metric',
  defaultCity: 'Bangkok',
  storageKey: 'my-weather-app-settings',
  cityStorageKey: 'my-weather-app-cities',
  defaultCities: [
    {
      "id": "dXJuOm1ieHBsYzpaTjA",
      "name": "Bangkok",
      "place": "Thailand",
      "countryCode": "TH",
      "latitude": 13.752494,
      "longitude": 100.493509
    }
  ]
}

export default appConfig
