
import { countryTimeZones } from "../data/timezones"

export const getLocalTime = (countryCode: string) => {
    const timezone = countryTimeZones[countryCode];

    if (!timezone) {
        return "Timezone not available for this country.";
    }

    return new Date().toLocaleString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
    });
}

export const getCurrentDate = (countryCode: string) => {
    return new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export const getTimeFromTimestamp = (timstamp: number) => {
    return new Date(timstamp * 1000).toLocaleString("en-US", {
        hour: "numeric",
    });
}
