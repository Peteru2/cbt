"use client"


import { useExamStore } from "../store/examStore"
import { calculateScore } from "../utils/calculateStore"
import { useRouter } from "next/navigation"

export default function ResultPage() {
  const answers = useExamStore(
    (state) => state.answers
  )
const router = useRouter()

  const selectedQuestions = useExamStore(
    (state) => state.selectedQuestions
  )

   const resetExam = useExamStore(
    (state) => state.resetExam
    
  )
  const handleReset = () =>{
        resetExam();
        router.push("/")
  } 

 

  const score = calculateScore(
    selectedQuestions,
    answers
  )

  const percentage = Math.round(
    (score / selectedQuestions.length) * 100
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Examination Result
        </h1>

        <div className="text-7xl font-black text-blue-500 mb-4">
          {percentage}%
        </div>

        <p className="text-xl text-slate-300 mb-2">
          Score: {score} / {selectedQuestions.length}
        </p>

                        <button
                        onClick={handleReset}
                        className="mt-8 h-14 px-8 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-500
                        transition font-semibold"
                        >
                        Finish
                        </button>
      </div>
    </main>
  )
}