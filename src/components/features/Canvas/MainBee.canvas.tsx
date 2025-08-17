/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Suspense,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type JSX,
  type FC,
} from "react";

import {
  Environment,
  ContactShadows,
  OrbitControls,
  useProgress,
  Html,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { DEVICE_TYPE, useDeviceType } from "@/hooks/useResponsible";
import { useResponsive3D } from "@/hooks/useResponsive3D";

import { Model } from "../Models/Bee.gltf";

type EnvPreset =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse"
  | undefined;

// Loading component with progress
function LoadingProgress(): JSX.Element {
  const { progress, errors, item } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-black/80 rounded-lg backdrop-blur-sm">
        <div className="text-white text-lg font-semibold mb-4">
          Loading 3D Model
        </div>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-gray-300 text-sm mt-2">
          {progress.toFixed(0)}% Complete
        </div>
        {errors.length > 0 && (
          <div className="text-red-400 text-sm mt-2">Error loading: {item}</div>
        )}
      </div>
    </Html>
  );
}

// Component to handle camera aspect ratio updates
function CameraController({ aspectRatio }: { aspectRatio: number }): null {
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
    }
  }, [aspectRatio, camera]);

  return null;
}

interface SceneProps {
  onLoadingComplete?: () => void;
}

export const MainScene: FC<SceneProps> = ({}): JSX.Element | null => {
  const config = useResponsive3D();
  const deviceType = useDeviceType();

  const [dpr, setDpr] = useState(1.5);
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
    aspectRatio: 16 / 9, // Default aspect ratio
  });

  // Calculate dimensions based only on width
  useEffect(() => {
    const updateDimensions = (): void => {
      if (containerRef.current !== null) {
        const width = window.innerWidth;
        const aspectRatio = 16 / 9;
        const height = width / aspectRatio;

        setCanvasDimensions({
          width,
          height,
          aspectRatio,
        });
      }
    };

    updateDimensions();

    // Only listen to resize events
    const handleResize = (): void => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (deviceType === DEVICE_TYPE.MOBILE) return null;

  // Extract shadow map size to avoid nested ternary
  let shadowMapSize: [number, number];
  if (config.quality === "high") {
    shadowMapSize = [2048, 2048];
  } else if (config.quality === "medium") {
    shadowMapSize = [1024, 1024];
  } else {
    shadowMapSize = [512, 512];
  }

  let configQuality: number;
  if (config.quality === "low") {
    configQuality = 256;
  } else if (config.quality === "medium") {
    configQuality = 512;
  } else {
    configQuality = 1024;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full overflow-hidden z-[10]"
      style={{
        width: "100vw",
        height: `${canvasDimensions.height}px`,
        // Center vertically if canvas is shorter than viewport
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    >
      <Canvas
        className="w-full h-full"
        dpr={dpr}
        shadows={config.shadows}
        camera={{
          position: config.cameraPosition,
          fov: config.fov,
          near: 0.5,
          far: 50,
          aspect: canvasDimensions.aspectRatio,
        }}
        gl={{
          antialias: config.antialias,
          alpha: true,
          powerPreference: config.powerPreference,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        // Force specific size
        style={{
          width: `${canvasDimensions.width}px`,
          height: `${canvasDimensions.height}px`,
          pointerEvents: "none",
        }}
      >
        {/* Camera controller to update aspect ratio */}
        <CameraController aspectRatio={canvasDimensions.aspectRatio} />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Performance monitor for dynamic quality adjustment */}
        {config.adaptivePerformance && (
          <PerformanceMonitor
            flipflops={3}
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
            onFallback={() => {
              console.warn("Performance issues detected, reducing quality");
            }}
          />
        )}

        <ambientLight
          intensity={
            config.ambientIntensity !== 0 ? config.ambientIntensity : 0.4
          }
        />

        <directionalLight
          castShadow={config.shadows}
          position={[10, 10, 5]}
          shadow-bias={-0.0005}
          shadow-camera-bottom={-10}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-mapSize={shadowMapSize}
          intensity={
            config.directionalIntensity !== 0
              ? config.directionalIntensity
              : 1.5
          }
        />

        <pointLight
          position={[-10, -10, -10]}
          color={
            config.pointLightColor === "" ? "#ffffff" : config.pointLightColor
          }
          intensity={
            config.pointLightIntensity === 0 ? 0.5 : config.pointLightIntensity
          }
        />

        {config.quality !== "low" && (
          <spotLight
            angle={0.5}
            castShadow={config.shadows}
            intensity={0.5}
            penumbra={1}
            position={[5, 5, 5]}
          />
        )}

        <Environment
          background={config.environmentBackground || false}
          blur={config.environmentBlur}
          preset={config.environmentPreset as EnvPreset}
          resolution={configQuality}
        />

        {config.fog && <fog args={["#202020", 5, 20]} attach="fog" />}

        <OrbitControls
          ref={controlsRef}
          makeDefault
          autoRotate={false}
          autoRotateSpeed={0.5}
          enabled={false}
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          maxDistance={8}
          maxPolarAngle={Math.PI - Math.PI / 6}
          minDistance={2}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={config.controlSpeed !== 0 ? config.controlSpeed : 0.5}
          target={[0, 0, 0]}
          zoomSpeed={0.8}
        />

        {/* <Center> */}
        <Suspense fallback={<LoadingProgress />}>
          <Model
          // scale={config.modelScale || config.scale || 1}
          />
        </Suspense>
        {/* </Center> */}

        {config.contactShadows !== false && (
          <ContactShadows
            blur={config.shadowBlur !== 0 ? config.shadowBlur : 1.5}
            color={config.shadowColor}
            far={4.5}
            opacity={config.shadows ? 0.4 : 0.2}
            position={[0, -1.4, 0]}
            resolution={config.quality === "high" ? 1024 : 512}
            scale={10}
          />
        )}

        <Preload all />
      </Canvas>
    </div>
  );
};
