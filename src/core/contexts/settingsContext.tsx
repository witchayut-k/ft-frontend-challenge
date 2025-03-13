'use client';

import type { ReactNode } from 'react';
import { createContext, useMemo, useState } from 'react';

import appConfig from '@/configs/appConfig';

import { useObjectLocalStorage } from '@/core/hooks/useObjectLocalStorage';
import { TemperatureUnit } from '../types';

export type Settings = {
    temperatureUnit?: TemperatureUnit;
    // darkMode?: boolean
};

type UpdateSettingsOptions = {
    updateLocalStorage?: boolean;
};

// SettingsContextProps type
type SettingsContextProps = {
    settings: Settings;
    updateSettings: (
        settings: Partial<Settings>,
        options?: UpdateSettingsOptions,
    ) => void;
    isSettingsChanged: boolean;
    resetSettings: () => void;
};

type Props = {
    children: ReactNode;
    settingsLocalStorage: Settings | null;
};

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null);

// Settings Provider
export const SettingsProvider = (props: Props) => {
    const initialSettings: Settings = {
        temperatureUnit: appConfig.temperatureUnit,
    };

    const updatedInitialSettings = {
        ...initialSettings,
    };

    // Local Storage
    const [settingsLocalStorage, updateSettingsLocalStorage] =
        useObjectLocalStorage<Settings>(
            appConfig.storageKey,
            JSON.stringify(props.settingsLocalStorage) !== '{}'
                ? props.settingsLocalStorage
                : updatedInitialSettings,
        );

    // State
    const [_settingsState, _updateSettingsState] = useState<Settings>(
        JSON.stringify(settingsLocalStorage) !== '{}'
            ? settingsLocalStorage
            : updatedInitialSettings,
    );

    const updateSettings = (
        settings: Partial<Settings>,
        options?: UpdateSettingsOptions,
    ) => {
        const { updateLocalStorage = true } = options || {};

        _updateSettingsState((prev) => {
            const newSettings = { ...prev, ...settings };

            // Update storage if needed
            if (updateLocalStorage) updateSettingsLocalStorage(newSettings);

            return newSettings;
        });
    };

    const resetSettings = () => {
        updateSettings(initialSettings);
    };

    const isSettingsChanged = useMemo(
        () =>
            JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_settingsState],
    );

    return (
        <SettingsContext.Provider
            value={{
                settings: _settingsState,
                updateSettings,
                isSettingsChanged,
                resetSettings,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
