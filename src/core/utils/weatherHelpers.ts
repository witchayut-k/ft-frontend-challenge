export const getMinMaxTemperatures = (hourly: any[]) => {
    const allTemps = hourly.map((hour) => hour.temp);

    const minTemp = Math.min(...allTemps).toFixed(0);
    const maxTemp = Math.max(...allTemps).toFixed(0);

    return { minTemp, maxTemp };
}

export const renderTemperature = (temp: any) => {
    if (!temp) return "";
    return `${temp.toFixed(0)}°`;
}

export const getChanceOfRain = (hourly: any[]) => {
    const totalPop = hourly.reduce((sum, hour) => sum + hour.pop, 0);
    const result = totalPop / hourly.length * 100;
    return result.toFixed(2);
}
