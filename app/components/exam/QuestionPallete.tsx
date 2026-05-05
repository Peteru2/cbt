"use client"

import { useExamStore } from "../../store/examStore"

export default function QuestionPalette() {
  const answers = useExamStore((state) => state.answers)

  const currentQuestionIndex = useExamStore(
    (state) => state.currentQuestionIndex
  )
  const selectedQuestions = useExamStore(
  (state) => state.selectedQuestions
)

  const jumpToQuestion = useExamStore(
    (state) => state.jumpToQuestion
  )

  return (
    <div className="grid grid-cols-5 gap-3">
      {selectedQuestions.map((question, index) => {
        const answered = answers[question.id]

        const active =
          currentQuestionIndex === index

        return (
          <button
            key={question.id}
            onClick={() => jumpToQuestion(index)}
            className={`h-12 rounded-xl cursor-pointer font-semibold transition ${
              active
                ? "bg-blue-600 text-white"
                : answered
                ? "bg-green-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}