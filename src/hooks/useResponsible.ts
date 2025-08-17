import * as React from "react"

const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 1200
} as const

// Device types
export type DeviceType = DEVICE_TYPE.MOBILE | DEVICE_TYPE.TABLET | DEVICE_TYPE.DESKTOP | undefined
export enum DEVICE_TYPE {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = React.useState<DeviceType>(DEVICE_TYPE.DESKTOP)

  React.useEffect(() => {
    const getDeviceType = (): DeviceType => {
      const width = window.innerWidth
      
      if (width < BREAKPOINTS.MOBILE) {
        return DEVICE_TYPE.MOBILE
      } else if (width < BREAKPOINTS.DESKTOP) {
        return DEVICE_TYPE.TABLET
      } else {
        return DEVICE_TYPE.DESKTOP
      }
    }

    // Set initial device type
    setDeviceType(getDeviceType())

    // Create media query listeners for each breakpoint
    const mqlMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`)
    const mqlTablet = window.matchMedia(`(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.DESKTOP - 1}px)`)
    
    const handleChange = () => {
      setDeviceType(getDeviceType())
    }

    // Add listeners
    mqlMobile.addEventListener("change", handleChange)
    mqlTablet.addEventListener("change", handleChange)

    // Cleanup
    return () => {
      mqlMobile.removeEventListener("change", handleChange)
      mqlTablet.removeEventListener("change", handleChange)
    }
  }, [])

  return deviceType
}

// Individual boolean hooks for convenience
export function useIsMobile(): boolean {
  const deviceType = useDeviceType()
  return deviceType === DEVICE_TYPE.MOBILE
}

export function useIsTablet(): boolean {
  const deviceType = useDeviceType()
  return deviceType === DEVICE_TYPE.TABLET
}

export function useIsDesktop(): boolean {
  const deviceType = useDeviceType()
  return deviceType === DEVICE_TYPE.DESKTOP
}

// Hook that returns all device states
export function useDeviceDetection() {
  const deviceType = useDeviceType()
  
  return {
    deviceType,
    isMobile: deviceType === DEVICE_TYPE.MOBILE,
    isTablet: deviceType === DEVICE_TYPE.TABLET,
    isDesktop: deviceType === DEVICE_TYPE.DESKTOP,
    isTabletOrMobile: deviceType === DEVICE_TYPE.MOBILE || deviceType === DEVICE_TYPE.TABLET,
    isTabletOrDesktop: deviceType === DEVICE_TYPE.TABLET || deviceType === DEVICE_TYPE.DESKTOP
  }
}

// Hook for responsive values based on device type
export function useResponsive<T>(values: {
  mobile?: T
  tablet?: T
  desktop?: T
  default: T
}): T {
  const deviceType = useDeviceType()
  
  switch (deviceType) {
    case DEVICE_TYPE.MOBILE:
      return values.mobile ?? values.default
    case DEVICE_TYPE.TABLET:
      return values.tablet ?? values.default
    case DEVICE_TYPE.DESKTOP:
      return values.desktop ?? values.default
    default:
      return values.default
  }
}