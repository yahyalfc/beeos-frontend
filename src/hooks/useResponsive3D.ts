import { useState, useEffect } from "react";

enum POWER_PREFERENCE {
  HIGH_PERFORMANCE = "high-performance",
  LOW_POWER = "low-power",
  DEFAULT = "default",
}

interface Responsive3DConfig {
  // Quality settings
  quality: "low" | "medium" | "high";
  shadows: boolean;
  antialias: boolean;
  maxPixelRatio: number;

  // Lighting
  ambientIntensity: number;
  directionalIntensity: number;
  pointLightIntensity: number;
  pointLightColor: string;

  // Camera
  cameraPosition: [number, number, number];
  fov: number;

  // Model
  scale: number;
  modelScale?: number;
  modelPosition?: [number, number, number];

  // Controls
  controlSpeed: number;

  // Environment
  environmentPreset: string;
  environmentBackground: boolean;
  environmentBlur: number;

  // Effects
  fog: boolean;
  contactShadows: boolean;
  shadowBlur: number;
  shadowColor: string;

  // Performance
  powerPreference: POWER_PREFERENCE;
  adaptivePerformance: boolean;
}

export function useResponsive3D(): Responsive3DConfig {
  const [config, setConfig] = useState<Responsive3DConfig>({
    quality: "high",
    shadows: true,
    antialias: true,
    maxPixelRatio: 2,
    ambientIntensity: 0.4,
    directionalIntensity: 1.5,
    pointLightIntensity: 0.5,
    pointLightColor: "#ffffff",
    cameraPosition: [0, 0, 1],
    fov: 5,
    scale: 1,
    modelScale: 14,
    controlSpeed: 1,
    environmentPreset: "studio",
    environmentBackground: false,
    environmentBlur: 0,
    fog: false,
    contactShadows: true,
    shadowBlur: 1.5,
    shadowColor: "#000000",
    powerPreference: POWER_PREFERENCE.HIGH_PERFORMANCE,
    adaptivePerformance: true,
  });

  useEffect(() => {
    const updateConfig = (): void => {
      const width = window.innerWidth;
      const pixelRatio = window.devicePixelRatio;

      // Check device capabilities
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isLowEnd = pixelRatio > 2 || navigator.hardwareConcurrency < 4;
      const isSmallScreen = width < 768;

      // Determine quality based on device
      let quality: "low" | "medium" | "high" = "high";
      if (isMobile || isLowEnd) {
        quality = "low";
      } else if (isSmallScreen) {
        quality = "medium";
      }

      // Adjust scale based on screen size
      let scale = 1;
      if (width < 640) {
        scale = 0.7;
      } else if (width < 1024) {
        scale = 0.85;
      }

      // Camera position based on aspect ratio
      const cameraZ = 5;

      setConfig({
        ...config,
        quality,
        shadows: quality !== "low",
        antialias: quality !== "low",
        maxPixelRatio: quality === "low" ? 1 : 2,
        ambientIntensity: 0.4,
        directionalIntensity: quality === "low" ? 1 : 1.5,
        pointLightIntensity: quality === "low" ? 0.3 : 0.5,
        pointLightColor: "#ffffff",
        cameraPosition: [0, 0, cameraZ],
        fov: isSmallScreen ? 60 : 55,
        scale,
        controlSpeed: isMobile ? 0.5 : 1,
        environmentPreset: "studio",
        environmentBackground: false,
        environmentBlur: 0,
        fog: quality === "high",
        contactShadows: quality !== "low",
        shadowBlur: quality === "low" ? 1 : 1.5,
        shadowColor: "#000000",
        powerPreference:
          quality === "low"
            ? POWER_PREFERENCE.LOW_POWER
            : POWER_PREFERENCE.HIGH_PERFORMANCE,
        adaptivePerformance: true,
      });
    };

    updateConfig();
    window.addEventListener("resize", updateConfig);

    // Check for device orientation changes
    window.addEventListener("orientationchange", updateConfig);

    return () => {
      window.removeEventListener("resize", updateConfig);
      window.removeEventListener("orientationchange", updateConfig);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return config;
}

// Optional: Export individual quality presets
export const qualityPresets = {
  low: {
    shadows: false,
    antialias: false,
    maxPixelRatio: 1,
    directionalIntensity: 1,
    fog: false,
    contactShadows: false,
    powerPreference: "low-power" as const,
  },
  medium: {
    shadows: true,
    antialias: true,
    maxPixelRatio: 1.5,
    directionalIntensity: 1.2,
    fog: false,
    contactShadows: true,
    powerPreference: "default" as const,
  },
  high: {
    shadows: true,
    antialias: true,
    maxPixelRatio: 2,
    directionalIntensity: 1.5,
    fog: true,
    contactShadows: true,
    powerPreference: "high-performance" as const,
  },
};
