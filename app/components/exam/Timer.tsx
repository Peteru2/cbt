"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { Clock3 } from "lucide-react";

import { useExamStore } from "../../store/examStore";

import { formatTime } from "../../utils/formatTime";

export default function Timer() {
  const router = useRouter();

  const duration = useExamStore(
    (state) => state.duration
  );

  const examStartTime = useExamStore(
    (state) => state.examStartTime
  );

  const submitExam = useExamStore(
    (state) => state.submitExam
  );

  const [remaining, setRemaining] =
    useState(duration);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    if (!examStartTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - examStartTime) / 1000
      );

      const timeLeft = duration - elapsed;

      setRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);

        submitExam();

        router.replace("/result");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    duration,
    examStartTime,
    router,
    submitExam,
  ]);

  // =========================
  // COLOR STATE
  // =========================
  const timerColor = useMemo(() => {
    if (remaining <= 300) {
      return "text-red-500  bg-white";
    }

    if (remaining <= 600) {
      return "text-yellow-400  bg-black";
    }

    return "text-green-400 bg-black";
  }, [remaining]);

  return (
    <div
      className={`
        fixed
        bottom-5
        right-5
        z-50
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-2xl
        
        backdrop-blur-xl
        shadow-2xl
        transition-colors
        duration-500
        ${timerColor}
      `}
    >
      <Clock3 size={20} />

      <div className="flex flex-col">
        <span className="text-xs uppercase font-bold tracking-wider opacity-70">
          Time Left
        </span>

        <span className="text-xl font-bold tabular-nums">
          {formatTime(
            Math.max(remaining, 0)
          )}
        </span>
      </div>
    </div>
  );
}