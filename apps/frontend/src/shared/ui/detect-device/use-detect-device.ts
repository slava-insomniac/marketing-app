import { useContext } from 'react'

import { DetectDeviceContext } from './detect-device'

export function useDetectDevice() {
  const context = useContext(DetectDeviceContext)

  if (context === undefined) {
    throw new Error('useDetectDevice must be used within a DetectDeviceProvider')
  }

  return context
}
