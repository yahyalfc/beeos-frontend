import { useEffect, useRef, useCallback } from 'react'

import { useRouter } from 'next/navigation'

interface UseWindowReloadOnResizeOptions {
    debounceDelay?: number
    threshold?: number
    trackWidth?: boolean
    trackHeight?: boolean
    enabled?: boolean
    onBeforeReload?: () => void
    useHardReload?: boolean
}

interface WindowDimensions {
    width: number
    height: number
}

export const useWindowReloadOnResize = (
    options: UseWindowReloadOnResizeOptions = {}
): {
    isResizing: boolean
    currentDimensions: WindowDimensions
    forceReload: () => void
} => {
    const {
        debounceDelay = 500,
        threshold = 50,
        trackWidth = true,
        trackHeight = true,
        enabled = true,
        onBeforeReload,
        useHardReload = false,
    } = options

    const router = useRouter()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const initialDimensionsRef = useRef<WindowDimensions | null>(null)
    const isResizingRef = useRef(false)

    const getWindowDimensions = useCallback((): WindowDimensions => {
        if (typeof window === 'undefined') {
            return { width: 0, height: 0 }
        }

        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }, [])

    const shouldReload = useCallback(
        (current: WindowDimensions, initial: WindowDimensions): boolean => {
            const widthChanged = trackWidth && Math.abs(current.width - initial.width) >= threshold
            const heightChanged =
                trackHeight && Math.abs(current.height - initial.height) >= threshold

            return widthChanged || heightChanged
        },
        [trackWidth, trackHeight, threshold]
    )

    const reloadWindow = useCallback(() => {
        if (onBeforeReload) {
            onBeforeReload()
        }

        if (useHardReload) {
            window.location.reload()
        } else {
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            if (typeof window !== 'undefined' && (window as any).gsap) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                ;(window as any).gsap.killTweensOf('*')
            }
        }
    }, [router, onBeforeReload, useHardReload])

    const handleResize = useCallback(() => {
        if (!enabled || !initialDimensionsRef.current) return

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        isResizingRef.current = true

        timeoutRef.current = setTimeout(() => {
            const currentDimensions = getWindowDimensions()

            if (
                initialDimensionsRef.current &&
                shouldReload(currentDimensions, initialDimensionsRef.current)
            ) {
                reloadWindow()
                initialDimensionsRef.current = currentDimensions
            }

            isResizingRef.current = false
        }, debounceDelay)
    }, [enabled, getWindowDimensions, shouldReload, reloadWindow, debounceDelay])

    useEffect(() => {
        if (!enabled) return

        initialDimensionsRef.current = getWindowDimensions()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [enabled, handleResize, getWindowDimensions])

    return {
        isResizing: isResizingRef.current,
        currentDimensions: getWindowDimensions(),
        forceReload: reloadWindow,
    }
}
