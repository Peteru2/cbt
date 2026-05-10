"use client";

import { memo } from "react";

import { motion } from "framer-motion";

import { Question } from "../../types/question";

import { useExamStore } from "../../store/examStore";

interface Props {
  question: Question;
}

function QuestionCard({
  question,
}: Props) {
  const selectedAnswer =
    useExamStore(
      (state) =>
        state.answers[
          question.id
        ]
    );

  const selectAnswer =
    useExamStore(
      (state) =>
        state.selectAnswer
    );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8"
    >
      <h2 className="text-lg md:text-xl font-semibold leading-relaxed mb-8 text-white">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map(
          (option) => {
            const selected =
              selectedAnswer ===
              option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  selectAnswer(
                    question.id,
                    option
                  )
                }
                className={`w-full text-left p-5 rounded-2xl border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  selected
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {option}
              </button>
            );
          }
        )}
      </div>
    </motion.div>
  );
}

export default memo(
  QuestionCard
);