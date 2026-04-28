"use client"
import { useRouter } from "next/navigation"
import { questions } from "../data/questions"
import { useExamStore } from "../store/examStore"
import Timer from "../components/exam/Timer"
import QuestionCard from "../components/exam/QuestionCard"
import QuestionPalette from "../components/exam/QuestionPallete"
import NavigationButtons from "../components/exam/NavigationButtons"

export default function ExamPage() {
        const router = useRouter()
        const currentQuestionIndex = useExamStore(
        (state) => state.currentQuestionIndex
        )
        const candidateId = useExamStore(
        (state) => state.candidateId
        )
        const submitExam = useExamStore(
        (state) => state.submitExam
        )
        const question = questions[currentQuestionIndex]
        const handleSubmit = () => {
        submitExam()
        router.push("/result")
}
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
                Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <QuestionCard question={question} />
                <NavigationButtons />
                </div>
                <aside className="bg-slate-900 border border-slate-800 rounded-3xl p-6
                h-fit sticky top-6">
                <h2 className="text-xl font-bold mb-6">
                Question Palette
                </h2>
                <QuestionPalette />
                <button
                onClick={handleSubmit}
                className="w-full h-14 rounded-xl cursor-pointer bg-red-600 hover:bg-red-500
                transition mt-8 font-semibold"
                >
                Submit Exam
                </button>
                </aside>
                </div>
</main>
)
}