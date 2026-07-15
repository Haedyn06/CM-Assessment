"use client";

import { useRef, useState } from "react";

type FillPhase = "idle" | "in" | "out";

export function useFillHover() {
  const [phase, setPhase] = useState<FillPhase>("idle");
  const leaveTimer = useRef<number | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const startFill = () => {
    clearLeaveTimer();
    setPhase("in");
  };

  const startEmpty = () => {
    clearLeaveTimer();
    setPhase("out");
    leaveTimer.current = window.setTimeout(() => {
      setPhase("idle");
      leaveTimer.current = null;
    }, 420);
  };

  return {
    fillClass:
      phase === "in" ? "isFillIn" : phase === "out" ? "isFillOut" : "",
    fillHandlers: {
      onMouseEnter: startFill,
      onMouseLeave: startEmpty,
      onFocus: startFill,
      onBlur: startEmpty,
    },
  };
}
