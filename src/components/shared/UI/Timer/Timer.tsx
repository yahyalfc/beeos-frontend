// Timer.tsx
import React, { useEffect, useState } from "react";

interface TimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  inifinite?: boolean;
  onComplete?: () => void;
  isRunning?: boolean;
  isLoading?: boolean;
}

const TimerCountdown: React.FC<TimerProps> = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
  isRunning = true,
  inifinite = false,
  isLoading,
  onComplete,
}) => {
  const [hours, setHours] = useState<number>(initialHours);
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (
      !inifinite &&
      isRunning &&
      !isLoading &&
      (hours > 0 || minutes > 0 || seconds > 0)
    ) {
      interval = setInterval(() => {
        if (seconds > 0) {
          if (seconds === 1 && minutes === 0 && hours === 0) {
            if (onComplete) onComplete();
          }
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hours, minutes, seconds, isRunning, onComplete, inifinite, isLoading]);

  let displayedHours: string;
  let displayedMinutes: string;
  let displayedSeconds: string;

  if (isLoading) {
    displayedHours = "??";
    displayedMinutes = "??";
    displayedSeconds = "??";
  } else if (inifinite) {
    displayedHours = "∞";
    displayedMinutes = "∞";
    displayedSeconds = "∞";
  } else {
    displayedHours = hours.toString().padStart(2, "0");
    displayedMinutes = minutes.toString().padStart(2, "0");
    displayedSeconds = seconds.toString().padStart(2, "0");
  }

  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex justify-center items-center bg-[#181B1F] rounded-[4px] h-9 w-9 text-white font-medium">
        {displayedHours}
      </span>
      <span className="inline-flex justify-center items-center bg-[#181B1F] rounded-[4px] h-9 w-9 text-white font-medium">
        {displayedMinutes}
      </span>

      <span className="inline-flex justify-center items-center bg-[#181B1F] rounded-[4px] h-9 w-9 text-white font-medium">
        {displayedSeconds}
      </span>
    </span>
  );
};

export default TimerCountdown;
