import { Question } from "../types/question"

export const shuffleQuestions = (
  questions: Question[],
  count: number
) => {
  const shuffled = [...questions].sort(
    () => Math.random() - 0.5
  )

  return shuffled.slice(0, count)
}