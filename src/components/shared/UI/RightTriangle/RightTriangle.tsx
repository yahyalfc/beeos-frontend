"use client";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface RightTriangleProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  corner?: CornerPosition;
  strokeColor?: string;
  strokeWidth?: string | number;
  isFilled?: string; // Color hex for fill
  className?: string;
  style?: React.CSSProperties;
}

// Interface for hypotenuse points
interface HypotenusePoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const RightTriangle: React.FC<RightTriangleProps> = ({
  width = "12vw",
  height = "9vw",
  corner = "top-left",
  strokeColor = "#1E40AF",
  strokeWidth = "0.15vw",
  isFilled,
  className = "",
  style = {},
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200); // Default fallback for SSR

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Convert vw values to numbers for viewBox calculation
  const getNumericValue = (vwValue: string | number): number => {
    if (typeof vwValue === "string" && vwValue.includes("vw")) {
      // Use current viewport width if available, otherwise fallback
      const currentViewportWidth = isClient ? viewportWidth : 1200;
      return (
        parseFloat(vwValue.replace("vw", "")) * (currentViewportWidth / 100)
      );
    }
    return typeof vwValue === "number"
      ? vwValue
      : parseFloat(vwValue.toString()) || 200;
  };

  const numericWidth: number = getNumericValue(width);
  const numericHeight: number = getNumericValue(height);

  // Calculate hypotenuse line based on corner position
  const getHypotenusePoints = (): HypotenusePoints => {
    switch (corner) {
      case "top-left":
        return { x1: numericWidth, y1: 0, x2: 0, y2: numericHeight };
      case "top-right":
        return { x1: 0, y1: 0, x2: numericWidth, y2: numericHeight };
      case "bottom-left":
        return { x1: numericWidth, y1: numericHeight, x2: 0, y2: 0 };
      case "bottom-right":
        return { x1: 0, y1: numericHeight, x2: numericWidth, y2: 0 };
      default:
        return { x1: numericWidth, y1: 0, x2: 0, y2: numericHeight };
    }
  };

  // Calculate triangle polygon points based on corner position
  const getTrianglePoints = (): string => {
    switch (corner) {
      case "top-left":
        return `0,0 ${numericWidth},0 0,${numericHeight}`;
      case "top-right":
        return `0,0 ${numericWidth},0 ${numericWidth},${numericHeight}`;
      case "bottom-left":
        return `0,0 0,${numericHeight} ${numericWidth},${numericHeight}`;
      case "bottom-right":
        return `${numericWidth},0 ${numericWidth},${numericHeight} 0,${numericHeight}`;
      default:
        return `0,0 ${numericWidth},0 0,${numericHeight}`;
    }
  };

  const { x1, y1, x2, y2 }: HypotenusePoints = getHypotenusePoints();

  return (
    <div
      className={cn("absolute top-0 left-0 inline-block", className)}
      style={style}
      {...props}
    >
      <svg
        height={height}
        style={{ maxWidth: "100%", height: "auto" }}
        viewBox={`0 0 ${numericWidth} ${numericHeight}`}
        width={width}
      >
        {/* Filled polygon if isFilled is provided */}
        {isFilled && (
          <polygon
            className="transition-all duration-300"
            fill={isFilled}
            points={getTrianglePoints()}
          />
        )}

        {/* Hypotenuse line - always rendered */}
        <line
          className="transition-all duration-300 hover:stroke-opacity-80"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
        />
      </svg>
    </div>
  );
};
