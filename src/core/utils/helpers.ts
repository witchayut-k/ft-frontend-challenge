
import appConfig from "@/configs/appConfig"
import { Settings } from "@/core/contexts/settingsContext"

export const getSettingsFromLocalStorage = (): Settings => {
    const storageKey = appConfig.storageKey
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(storageKey) || '{}')
    } else {
        return {}
    }
}

export const renderNumberWithCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}