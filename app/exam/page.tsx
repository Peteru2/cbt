"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle, X } from "lucide-react";

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

  // =========================
  // HYDRATION LOADER
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
          MAIN PAGE
      ========================= */}
      <main className="min-h-screen bg-slate-950 text-white p-4 lg:p-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
          {/* MAIN CONTENT */}
          <div>
            {/* HEADER */}
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

            {/* QUESTION COUNT */}
            <div className="mb-4 text-slate-400">
              Question{" "}
              {currentQuestionIndex + 1} of{" "}
              {selectedQuestions.length}
            </div>

            {/* QUESTION */}
            <QuestionCard question={question} />

            {/* NAVIGATION */}
            <NavigationButtons />
          </div>

          {/* SIDEBAR */}
          <aside className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-6">
              Question Palette
            </h2>

            <QuestionPalette />

            {/* UNANSWERED INFO */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-800 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">
                  Unanswered
                </span>

                <span className="font-bold text-orange-400">
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
              className={`w-full h-14 px-8 mt-4 rounded-xl font-semibold transition ${
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

      {/* =========================
          SUBMIT WARNING MODAL
      ========================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 animate-in fade-in zoom-in-95 duration-200">
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
            <div className="h-16 w-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6">
              <AlertTriangle size={32} />
            </div>

            {/* TITLE */}
            <h2 className="text-2xl text-red-100 font-bold">
              Submit Examination?
            </h2>

            {/* DESCRIPTION */}
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

            <p className="text-slate-400 font-bold text-sm mt-2">
              Once submitted, you will not be
              able to return to the examination.
            </p>

            {/* CTA */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className="h-12 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition font-medium"
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