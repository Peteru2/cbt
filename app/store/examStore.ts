"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions } from "../data/questions";
import { Question } from "../types/question"
import { shuffleQuestions } from "../utils/shuffleQuestions"

interface ExamStore {
  candidateId: string;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  examStarted: boolean;
  examSubmitted: boolean;
  examStartTime: number | null;
  duration: number;
  setCandidateId: (id: string) => void;
  startExam: () => void;
  selectAnswer: (questionId: number, option: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;

  submitExam: () => void;
  resetExam: () => void;
  selectedQuestions: Question[]
initializeQuestions: () => void
}

export const useExamStore = create<ExamStore>()(
  persist(
    (set) => ({
      candidateId: "",
      currentQuestionIndex: 0,
      answers: {},
       setCandidateId: (id) =>
        set({
          candidateId: id,
        }),
      examStarted: false,
      examSubmitted: false,
      examStartTime: null,
      duration: 30 * 20,
      selectedQuestions: [],
     
        initializeQuestions: () =>
  set({
    selectedQuestions: shuffleQuestions(
      questions,
      20
    ),
  }),
      startExam: () =>
        set({
          examStarted: true,
          examStartTime: Date.now(),
        }),
      selectAnswer: (questionId, option) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: option,
          },
        })),
      nextQuestion: () =>
  set((state) => ({
    currentQuestionIndex: Math.min(
      state.currentQuestionIndex + 1,
      state.selectedQuestions.length - 1
    ),
  })),
      prevQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),
      jumpToQuestion: (index) =>
        set({
          currentQuestionIndex: index,
        }),
      submitExam: () =>
        set({
          examSubmitted: true,
        }),
      resetExam: () =>
        set({
          candidateId: "",
          currentQuestionIndex: 0,
          answers: {},
          examStarted: false,
          examSubmitted: false,
          examStartTime: null,
        }),
    }),
    {
      name: "cbt-storage",
    },
  ),
);
