"use client";

import { type FC } from "react";

import { type Timer } from "@/hooks/mint/useMintCountdown";
import { PHASES } from "@/hooks/mint/useMinter";

import { MintPhaseBottomInterface } from "../Interfaces/VectorInterfaces/MintBottomPhaseInterface";
import { MintPhaseMiddleInterface } from "../Interfaces/VectorInterfaces/MintMiddlePhaseInterface";
import { MintPhaseTopInterface } from "../Interfaces/VectorInterfaces/MintTopPhaseInterface";
import { LockIcon } from "../UI/Icons/Lock.icon";
import { UnlockIcon } from "../UI/Icons/Unlock.icon";
import TimerCountdown from "../UI/Timer/Timer";

interface MinterPhasesCardsProps {
  onTimerEnded: () => void;
  timer: Timer;
  phase: PHASES | null;
}

export const MinterPhasesCards: FC<MinterPhasesCardsProps> = ({
  onTimerEnded,
  timer,
  phase,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <MinterPhases
        key="top"
        isActive={phase === PHASES.WHITELIST}
        timer={phase === PHASES.WHITELIST ? timer : null}
        title="Whitelist Phase"
        type="top"
        onTimerEnded={onTimerEnded}
      />
      {phase === PHASES.PUBLIC || phase === PHASES.WAITLIST ? (
        <MinterPhases
          isActive={phase === PHASES.WAITLIST}
          timer={phase === PHASES.WAITLIST ? timer : null}
          title="Waitlist Phase"
          type="middle"
          onTimerEnded={onTimerEnded}
        />
      ) : null}

      {phase === PHASES.PUBLIC ? (
        <MinterPhases
          inifinite
          isActive
          timer={null}
          title="Public"
          type="bottom"
          onTimerEnded={onTimerEnded}
        />
      ) : null}
    </div>
  );
};

export const EndedMinterPhasesCards: FC<MinterPhasesCardsProps> = ({
  onTimerEnded,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <MinterPhases
        isActive={false}
        timer={null}
        title="Guaranteed Phase"
        type="top"
        onTimerEnded={onTimerEnded}
      />

      <MinterPhases
        isActive={false}
        timer={null}
        title="Whitelist Phase 2"
        type="middle"
        onTimerEnded={onTimerEnded}
      />

      <MinterPhases
        isActive={false}
        timer={null}
        title="Public"
        type="bottom"
        onTimerEnded={onTimerEnded}
      />
    </div>
  );
};

interface MinterPhasesProps {
  title: string;
  type: "top" | "middle" | "bottom";
  timer: Timer | null;
  inifinite?: boolean;
  isActive: boolean;
  onTimerEnded: () => void;
}

export const MinterPhases: FC<MinterPhasesProps> = ({
  timer,
  type = "middle",
  title,
  inifinite,
  isActive = false,
  onTimerEnded,
}) => {
  return (
    <div
      className="relative w-full px-4 md:px-5 sm:px-5 h-[52px] flex justify-between items-center"
      style={{
        zIndex: type === "top" && isActive ? "z-[5]" : "",
      }}
    >
      {type === "top" ? (
        <MintPhaseTopInterface
          variant={isActive === true ? "accent" : "default"}
        />
      ) : null}
      {type === "middle" ? (
        <MintPhaseMiddleInterface
          variant={isActive === true ? "accent" : "default"}
        />
      ) : null}
      {type === "bottom" ? (
        <MintPhaseBottomInterface
          variant={isActive === true ? "accent" : "default"}
        />
      ) : null}

      <div className="inline-flex gap-2 bg-[#101414] items-center justify-start">
        <span className="shrink-0">
          {isActive ? <UnlockIcon /> : <LockIcon />}
        </span>
        <span
          className="shrink-0 text-md text-regent data-[active=true]:text-white duration-200 transition-all"
          data-active={isActive}
        >
          {title}
        </span>
      </div>
      <div className="inline-flex gap-3 items-center justify-end">
        <span
          className="shrink-0 hidden md:block sm:block text-md text-regent data-[active=true]:text-accent duration-200 transition-all"
          data-active={isActive}
        >
          {isActive ? "Ends in" : "Ended"}
        </span>
        {isActive ? (
          <TimerCountdown
            inifinite={inifinite ? true : false}
            initialHours={timer ? timer.hours : 0}
            initialMinutes={timer ? timer.minutes : 0}
            initialSeconds={timer ? timer.seconds : 0}
            onComplete={onTimerEnded}
          />
        ) : null}
      </div>
    </div>
  );
};
