"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

import { useExamStore } from "../store/examStore";

import Timer from "../components/exam/Timer";
import QuestionCard from "../components/exam/QuestionCard";
import QuestionPalette from "../components/exam/QuestionPallete";
import NavigationButtons from "../components/exam/NavigationButtons";

export default function ExamPage() {
  const router = useRouter();

  // =========================
  // PREFETCH
  // =========================
  useEffect(() => {
    router.prefetch("/result");
  }, [router]);

  // =========================
  // HYDRATION
  // =========================
  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // =========================
  // MODAL STATE
  // =========================
  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

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

  const answers = useExamStore(
    (state) => state.answers
  );

  const submitExam = useExamStore(
    (state) => state.submitExam
  );

  // =========================
  // CURRENT QUESTION
  // =========================
  const question =
    selectedQuestions[currentQuestionIndex];

  // =========================
  // UNANSWERED QUESTIONS
  // =========================
  const unansweredQuestions = useMemo(() => {
    return selectedQuestions.filter(
      (question) =>
        !answers[question.id]
    );
  }, [selectedQuestions, answers]);

  const unansweredCount =
    unansweredQuestions.length;

  const hasUnansweredQuestions =
    unansweredCount > 0;

  // =========================
  // HYDRATION LOADING
  // =========================
  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 rounded-full border-4 border-slate-700 border-t-green-500 animate-spin" />

          <div className="text-center">
            <h2 className="text-lg font-semibold">
              Loading Examination
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Preparing your session...
            </p>
          </div>
        </div>
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
  // FINAL SUBMIT
  // =========================
  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);

      submitExam();

      router.push("/result");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* =========================
          PAGE
      ========================= */}
      <main className="min-h-screen bg-slate-950 text-white p-4 lg:p-8 overflow-hidden">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-[-120px] h-[400px] w-[400px] bg-green-500/10 blur-3xl rounded-full" />

          <div className="absolute bottom-[-200px] right-[-120px] h-[400px] w-[400px] bg-blue-500/10 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
          {/* =========================
              MAIN CONTENT
          ========================= */}
          <div>
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  CBT Practice Test
                </h1>

                <p className="text-slate-400 mt-2">
                  Candidate ID:
                  <span className="text-white font-medium ml-2">
                    {candidateId}
                  </span>
                </p>
              </div>

              <Timer />
            </div>

            {/* QUESTION INFO */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-400 text-sm md:text-base">
                Question{" "}
                <span className="text-white font-semibold">
                  {currentQuestionIndex + 1}
                </span>{" "}
                of{" "}
                <span className="text-white font-semibold">
                  {selectedQuestions.length}
                </span>
              </p>

              <div className="h-2 w-40 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${
                      ((currentQuestionIndex +
                        1) /
                        selectedQuestions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* QUESTION CARD */}
            <QuestionCard question={question} />

            {/* NAVIGATION */}
            <div className="mt-8">
              <NavigationButtons />
            </div>
          </div>

          {/* =========================
              SIDEBAR
          ========================= */}
          <aside className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6 shadow-2xl shadow-black/20">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                Question Palette
              </h2>

              <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                {selectedQuestions.length} Questions
              </div>
            </div>

            {/* PALETTE */}
            <QuestionPalette />

            {/* STATS */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-800 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">
                  Unanswered
                </span>

                <span
                  className={`font-bold ${
                    unansweredCount > 0
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                >
                  {unansweredCount}
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={() =>
                setShowSubmitModal(true)
              }
              disabled={isSubmitting}
              className={`w-full h-14 mt-6 rounded-2xl font-semibold text-base transition-all duration-300 ${
                isSubmitting
                  ? "bg-green-400 cursor-not-allowed opacity-70"
                  : "bg-green-600 hover:bg-green-500 hover:scale-[1.02] active:scale-[0.99]"
              }`}
            >
              {isSubmitting
                ? "Submitting Examination..."
                : "Submit Examination"}
            </button>
          </aside>
        </div>
      </main>

      {/* =========================
          SUBMIT MODAL
      ========================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() =>
                setShowSubmitModal(false)
              }
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {/* ICON */}
            <div
              className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                hasUnansweredQuestions
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {hasUnansweredQuestions ? (
                <AlertTriangle size={32} />
              ) : (
                <CheckCircle2 size={32} />
              )}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-white/80 tracking-tight">
              {hasUnansweredQuestions
                ? "Submit Examination?"
                : "Ready To Submit"}
            </h2>

            {/* DESCRIPTION */}
            {hasUnansweredQuestions ? (
              <>
                <p className="text-slate-400 mt-3 leading-relaxed">
                  You still have{" "}
                  <span className="text-orange-400 font-semibold">
                    {unansweredCount}
                  </span>{" "}
                  unanswered{" "}
                  {unansweredCount === 1
                    ? "question"
                    : "questions"}
                  .
                </p>

                <p className="text-slate-500 text-sm mt-2">
                  Once submitted, you will not
                  be able to return to the
                  examination.
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-300 mt-3 leading-relaxed">
                  Excellent work. You have
                  answered all questions in this
                  examination.
                </p>

                <p className="text-slate-400 text-sm mt-2">
                  You can now proceed to submit
                  your examination securely.
                </p>
              </>
            )}

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className="h-12 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className={`h-12 rounded-xl font-semibold transition ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}