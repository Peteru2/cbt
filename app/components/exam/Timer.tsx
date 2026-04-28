"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useExamStore } from "../../store/examStore";
import { formatTime } from "../../utils/formatTime";

export default function Timer() {
  const router = useRouter();
  const duration = useExamStore((state) => state.duration);
  const examStartTime = useExamStore((state) => state.examStartTime);
  const submitExam = useExamStore((state) => state.submitExam);
  const [remaining, setRemaining] = useState(duration);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!examStartTime) return;
      const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
      const timeLeft = duration - elapsed;

      setRemaining(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        submitExam();
        router.push("/result");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, examStartTime, router, submitExam]);
  return (
    <div className="text-xl font-bold text-blue-400">
      {formatTime(Math.max(remaining, 0))}
    </div>
  );
}
