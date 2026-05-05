"use client";
import { useRouter } from "next/navigation";
import { useExamStore } from "../store/examStore";

export default function InstructionsPage() {
  const router = useRouter();
  const startExam = useExamStore((state) => state.startExam);
  const initializeQuestions = useExamStore(
  (state) => state.initializeQuestions
)
 const handleBegin = () => {
  initializeQuestions()

  startExam()

  router.push("/exam")
}
  return (
    <main
      className="min-h-screen bg-slate-950 text-white flex items-center
justify-center px-4"
    >
      <div
        className="max-w-2xl w-full bg-slate-900 rounded-3xl p-8 border
border-slate-800"
      >
        <h1 className="text-3xl font-bold mb-6">Examination Instructions</h1>

        <ul className="space-y-4 text-slate-300">
          <li>• Read every question carefully.</li>
          <li>• Click Next and Previous to navigate.</li>
          <li>• Your progress is automatically saved.</li>
          <li>• The test will auto-submit when time expires.</li>
          <li>• Do not refresh unnecessarily.</li>
        </ul>

        <button
          onClick={handleBegin}
          className="mt-8 h-14 px-8 cursor-pointer  rounded-xl bg-blue-600 hover:bg-blue-500
transition font-semibold"
        >
          Begin Test
        </button>
      </div>
    </main>
  );
}
