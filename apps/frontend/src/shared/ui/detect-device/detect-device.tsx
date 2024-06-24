import { createContext, useLayoutEffect, useState } from 'react'

import styles from './detect-device.module.css'

export interface Device {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const DetectDeviceContext = createContext<Device | undefined>(undefined)

export function DetectDeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useLayoutEffect(() => {
    const media = {
      mobile: globalThis.matchMedia(`(max-width: ${styles.mobile})`),
      tablet: globalThis.matchMedia(`(min-width: ${styles.mobile}) and (max-width: ${styles.tablet})`),
      desktop: globalThis.matchMedia(`(min-width: ${styles.tablet}) and (max-width: ${styles.desktop})`),
    }

    const updateDevicesState = () => {
      setDevices({
        isMobile: media.mobile.matches,
        isTablet: media.tablet.matches,
        isDesktop: media.desktop.matches,
      })
    }

    updateDevicesState()

    Object.values(media).forEach((device) => {
      device.addEventListener('change', updateDevicesState)
    })

    return () => {
      Object.values(media).forEach((device) => {
        device.removeEventListener('change', updateDevicesState)
      })
    }
  }, [])

  return <DetectDeviceContext.Provider value={devices}>{children}</DetectDeviceContext.Provider>
}
