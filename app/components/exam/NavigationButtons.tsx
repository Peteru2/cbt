"use client"

import { questions } from "../../data/questions"
import { useExamStore } from "../../store/examStore"

export default function NavigationButtons() {
const currentQuestionIndex = useExamStore((state) => state.currentQuestionIndex)
const nextQuestion = useExamStore((state) => state.nextQuestion)
const prevQuestion = useExamStore((state) => state.prevQuestion)


return (
    
<div className="flex items-center justify-between mt-8">
        <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="h-12 px-6 rounded-xl bg-slate-800 cursor-pointer  disabled:opacity-50 disabled:cursor-default"
        >
            Previous
        </button>
        <button
                onClick={nextQuestion}
                disabled={
                currentQuestionIndex === questions.length - 1
                }
                className="h-12 px-6 rounded-xl bg-blue-600 cursor-pointer disabled:cursor-default disabled:opacity-50"
        >
        Next
        </button>
</div>
)
}