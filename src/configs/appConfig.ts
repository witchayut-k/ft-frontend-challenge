import { TemperatureUnit } from "@/core/types"

export type Config = {
  temperatureUnit: TemperatureUnit
  defaultCity: string
  storageKey: string
  cityStorageKey: string
}

const appConfig: Config = {
  temperatureUnit: 'metric',
  defaultCity: 'Bangkok',
  storageKey: 'my-weather-app-settings',
  cityStorageKey: 'my-weather-app-cities',
}

export default appConfig
