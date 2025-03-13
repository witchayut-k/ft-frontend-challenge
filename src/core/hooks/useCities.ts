import { useState, useEffect } from "react";
import appConfig from "@/configs/appConfig";

const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCities = localStorage.getItem(appConfig.cityStorageKey);
      if (storedCities) {
        setCities(JSON.parse(storedCities));
      } else {
        const defaultCities = appConfig.defaultCities || [];
        setCities(defaultCities);
      }
    }
  }, []);

  const addCity = (city: City) => {
    setCities((prev) => {

      if (prev.find((c) => c.id === city.id)) {
        return prev; // Return the existing list if the city is a duplicate
      }

      const updatedCities = [...prev, city];
      localStorage.setItem(appConfig.cityStorageKey, JSON.stringify(updatedCities));
      return updatedCities;
    });
  };

  const removeCity = (id: any) => {
    setCities((prev) => {
      const updatedCities = prev.filter((c) => c.id !== id);
      localStorage.setItem(appConfig.cityStorageKey, JSON.stringify(updatedCities));
      return updatedCities;
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCities = JSON.parse(localStorage.getItem(appConfig.cityStorageKey) || "[]");
      setCities(storedCities);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { cities, addCity, removeCity };
};

export default useCities;
