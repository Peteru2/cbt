"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useExamStore } from "../store/examStore";

import Timer from "../components/exam/Timer";
import QuestionCard from "../components/exam/QuestionCard";
import QuestionPalette from "../components/exam/QuestionPallete";
import NavigationButtons from "../components/exam/NavigationButtons";

export default function ExamPage() {
  const router = useRouter();

  // =========================
  // HYDRATION GUARD
  // =========================
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // =========================
  // STORE
  // =========================
  const currentQuestionIndex = useExamStore(
    (state) => state.currentQuestionIndex
  );

  const selectedQuestions = useExamStore(
    (state) => state.selectedQuestions
  );

  const candidateId = useExamStore(
    (state) => state.candidateId
  );

  const submitExam = useExamStore(
    (state) => state.submitExam
  );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // =========================
  // WAIT FOR HYDRATION
  // =========================
  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading examination...
      </main>
    );
  }

  // =========================
  // SAFETY CHECK
  // =========================
  if (!selectedQuestions.length) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Preparing examination...
      </main>
    );
  }

  const question =
    selectedQuestions[currentQuestionIndex];

  // =========================
  // EXTRA SAFETY
  // =========================
  if (!question) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading question...
      </main>
    );
  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      submitExam();
      router.push("/result");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                CBT Practice Test
              </h1>

              <p className="text-slate-400 mt-1">
                Candidate: {candidateId}
              </p>
            </div>

            <Timer />
          </div>

          <div className="mb-4 text-slate-400">
            Question {currentQuestionIndex + 1} of{" "}
            {selectedQuestions.length}
          </div>

          <QuestionCard question={question} />

          <NavigationButtons />
        </div>

        <aside className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-6">
            Question Palette
          </h2>

          <QuestionPalette />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`h-14 px-8 mt-4 rounded-xl font-semibold transition ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed pointer-events-none opacity-70"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Exam"}
          </button>
        </aside>
      </div>
    </main>
  );
}