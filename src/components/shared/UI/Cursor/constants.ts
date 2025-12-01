export interface CursorConfig {
    innerSize?: number
    outerSize?: number
    innerColor?: string
    outerColor?: string
    outerAlpha?: number
    innerScale?: number
    outerScale?: number
    trailingSpeed?: number
    speed?: number
    clickScale?: {
        inner: number
        outer: number
    }
    hoverScale?: {
        inner: number
        outer: number
    }
    mixBlendMode?: boolean
    innerClass?: string
    outerClass?: string
}
