import { useMemo } from 'react'
import { useLocalStorage } from 'react-use'

export const useObjectLocalStorage = <T>(key: string, fallback?: T | null): [T, (newVal: T) => void] => {

  const [valueStr, setValue] = useLocalStorage(key, '')

  const value = useMemo<T>(() => (valueStr ? JSON.parse(valueStr) : fallback), [valueStr])

  const updateValue = (newVal: T) => {
    setValue(JSON.stringify(newVal))
  }

  return [value, updateValue]
}
