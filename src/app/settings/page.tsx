"use client";

import { useState, useEffect } from "react";
import { useSettings } from "@/core/hooks/useSettings";
import { TemperatureUnit } from "@/core/types";
import ContentWrapper from "@/layouts/components/ContentWrapper";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUnitChange = (value: TemperatureUnit) => {
    if (settings.temperatureUnit !== value) {
      updateSettings({ temperatureUnit: value }, { updateLocalStorage: true });
    }
  };

  if (!mounted) return null;

  return (
    <ContentWrapper>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">
          Temperature Unit
        </label>
        <select
          value={settings.temperatureUnit}
          onChange={(e) => handleUnitChange(e.target.value as TemperatureUnit)}
          className="w-full p-2 rounded border focus:outline-none "
        >
          <option value="standard">Kelvin (K)</option>
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </div>
    </ContentWrapper>
  );
}
