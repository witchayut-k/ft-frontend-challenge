export const getMinMaxTemperatures = (hourly: any[]) => {
    const allTemps = hourly.map((hour) => hour.temp);

    const minTemp = Math.round(Math.min(...allTemps));
    const maxTemp = Math.round(Math.max(...allTemps));

    return { minTemp, maxTemp };
}

export const renderTemperature = (temp: number | undefined): string => {
    if (temp === undefined) return "";
    return `${Math.round(temp)}°`;
};

export const getChanceOfRain = (hourly: any[]) => {
    const totalPop = hourly.reduce((sum, hour) => sum + hour.pop, 0);
    const result = totalPop / hourly.length * 100;
    return result.toFixed(2);
}
