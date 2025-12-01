import { useState, useEffect } from "react";

import { PHASES } from "./useMinter";

export interface Timer { hours: number; minutes: number; seconds: number }

export type PropStamp = bigint | null | undefined;

export const useMintCountdown = (
  gtdTimestamp: PropStamp,
  publicTimestamp: PropStamp
) => {
  const [phase, setPhase] = useState<PHASES | null>(null);
  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (gtdTimestamp && publicTimestamp) {
      const gtdTime = gtdTimestamp;
      const publicTime = publicTimestamp;
      const currentTime = BigInt(Math.floor(Date.now() / 1000));

      if (gtdTime > currentTime) {
        const hoursBigInt = (gtdTime - currentTime) / BigInt(3600);
        const minutesBigInt = ((gtdTime - currentTime) / BigInt(60)) % BigInt(60);
        const secondsBigInt = (gtdTime - currentTime) % BigInt(60);

        // Convert back to number for state
        const hours = Math.abs(Number(hoursBigInt));
        const minutes = Math.abs(Number(minutesBigInt));
        const seconds = Math.abs(Number(secondsBigInt));

        setTimer({ hours, minutes, seconds });
        setPhase(PHASES.PRE_PHASE);
      } else if (
        gtdTime < currentTime &&
        publicTime > currentTime
      ) {
        const hoursBigInt = (publicTime - currentTime) / BigInt(3600);
        const minutesBigInt = ((publicTime - currentTime) / BigInt(60)) % BigInt(60);
        const secondsBigInt = (publicTime - currentTime) % BigInt(60);

        // Convert back to number for state
        const hours = Number(hoursBigInt);
        const minutes = Number(minutesBigInt);
        const seconds = Number(secondsBigInt);

        setTimer({ hours, minutes, seconds });
        setPhase(PHASES.WHITELIST);
      }  else if (publicTime < currentTime) {
        setPhase(PHASES.PUBLIC);
      }
    }
  }, [gtdTimestamp, publicTimestamp]);

  return {
    phase,
    timer,
    setPhase,
    setTimer,
  };
};
