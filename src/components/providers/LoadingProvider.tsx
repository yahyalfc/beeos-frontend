"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { useProgress } from "@react-three/drei";

interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const DEFAULT_DELAY = 2000;
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress, active, loaded, total } = useProgress();

  useEffect(() => {
    if (progress === 100 && loaded === total && !active) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, DEFAULT_DELAY);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [progress, loaded, total, active]);

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}