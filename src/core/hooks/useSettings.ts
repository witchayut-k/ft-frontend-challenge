import { useContext } from 'react'
import { SettingsContext } from '@/core/contexts/settingsContext'

const useSettings = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider')
  }

  return context
}

export default useSettings